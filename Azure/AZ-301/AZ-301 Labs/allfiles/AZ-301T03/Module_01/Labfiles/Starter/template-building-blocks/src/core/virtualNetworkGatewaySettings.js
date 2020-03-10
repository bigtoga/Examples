'use strict';

let _ = require('lodash');
let v = require('./validation');
let r = require('./resources');
let publicIpAddress = require('./publicIpAddressSettings');

const VIRTUALNETWORKGATEWAY_SETTINGS_DEFAULTS = {
    gatewayType: 'Vpn',
    vpnType: 'RouteBased',
    sku: 'VpnGw1',
    enableBgp: false
};

let validGatewayTypes = ['Vpn', 'ExpressRoute'];
let validVpnTypes = ['PolicyBased', 'RouteBased'];
let validVpnSkus = ['Basic', 'VpnGw1', 'VpnGw2', 'VpnGw3'];
let validExpressRouteSkus = ['Standard', 'HighPerformance','UltraPerformance'];

let isValidGatewayType = (gatewayType) => {
    return v.utilities.isStringInArray(gatewayType, validGatewayTypes);
};

let isValidVpnType = (vpnType) => {
    return v.utilities.isStringInArray(vpnType, validVpnTypes);
};

let isValidVpnSku = (sku) => {
    return v.utilities.isStringInArray(sku, validVpnSkus);
};

let isValidExpressRouteSku = (sku) => {
    return v.utilities.isStringInArray(sku, validExpressRouteSkus);
};

let bgpSettingsValidations = {
    asn: (value) => {
        return _.isNil(value) ? {
            result: true
        } : {
            result: _.isFinite(value),
            message: 'Value must be an integer'
        };
    },
    bgpPeeringAddress: (value) => {
        return _.isNil(value) ? {
            result: true
        } : {
            result: !v.utilities.isNullOrWhitespace(value),
            message: 'Value cannot be null, empty, or only whitespace'
        };
    },
    peerWeight: (value) => {
        return _.isNil(value) ? {
            result: true
        } : {
            result: _.isFinite(value),
            message: 'Value must be an integer'
        };
    }
};

let virtualNetworkGatewaySettingsValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    subscriptionId: v.validationUtilities.isGuid,
    resourceGroupName: v.validationUtilities.isNotNullOrWhitespace,
    gatewayType: (value) => {
        return {
            result: isValidGatewayType(value),
            message: `Valid values are ${validGatewayTypes.join(',')}`
        };
    },
    vpnType: (value) => {
        return {
            result: isValidVpnType(value),
            message: `Valid values are ${validVpnTypes.join(',')}`
        };
    },
    enableBgp: v.validationUtilities.isBoolean,
    sku: (value, parent) => {
        if (parent.gatewayType === 'Vpn') {
            return {
                result: isValidVpnSku(value),
                message: `Valid values for Vpn type are ${validVpnSkus.join(',')}`
            };
        }
        return {
            result: isValidExpressRouteSku(value),
            message: `Valid values for ExpressRoute type are ${validExpressRouteSkus.join(',')}`
        };
    },
    bgpSettings: (value) => {
        return _.isNil(value) ? {
            result: true
        } : {
            validations: bgpSettingsValidations
        };
    },
    virtualNetwork: (value, parent) => {
        if (_.isNil(value)) {
            return {
                result: false,
                message: 'Virtual Network cannot be undefined or null'
            };
        } else if ((value.subscriptionId !== parent.subscriptionId) ||
            (value.resourceGroupName !== parent.resourceGroupName) ||
            (value.location !== parent.location)) {
            return {
                result: false,
                message: 'Virtual Network Gateways must be created in the same subscription, resource group, and location as the associated Virtual Network'
            };
        } else {
            return {
                validations: r.resourceReferenceValidations
            };
        }
    },
    isPublic: (value, parent) => {
        // If this isn't a boolean, then just return the error.  Otherwise, if this is an ExpressRoute gateway, isPublic must be true.
        let result = v.validationUtilities.isBoolean(value);
        if (result.result) {
            // We have a valid boolean, so we can use the value.
            if ((parent.gatewayType === 'ExpressRoute') && (!value)) {
                result = {
                    result: false,
                    message: 'Value must be true for an ExpressRoute Virtual Network Gateway'
                };
            }
        }

        return result;
    },
    publicIpAddress: (value) => {
        return _.isNil(value) ? {
            result: true
        } : {
            validations: publicIpAddress.validations
        };
    }
};

function transform(settings) {
    let result = {
        name: settings.name,
        id: r.resourceId(settings.subscriptionId, settings.resourceGroupName, 'Microsoft.Network/virtualNetworkGateway', settings.name),
        resourceGroupName: settings.resourceGroupName,
        subscriptionId: settings.subscriptionId,
        location: settings.location,
        properties: {
            ipConfigurations: [
                {
                    name: `${settings.name}-ipconfig`,
                    properties: {
                        privateIPAllocationMethod: 'Dynamic',
                        subnet: {
                            id: r.resourceId(settings.virtualNetwork.subscriptionId, settings.virtualNetwork.resourceGroupName,
                                'Microsoft.Network/virtualNetworks/subnets', settings.virtualNetwork.name, 'GatewaySubnet')
                        }
                    }
                }
            ],
            gatewayType: settings.gatewayType,
            vpnType: settings.vpnType,
            enableBgp: settings.enableBgp,
            sku: {
                name: settings.sku,
                tier: settings.sku
            }
        }
    };

    if (settings.publicIpAddress) {
        result.properties.ipConfigurations[0].properties.publicIPAddress = {
            id: r.resourceId(settings.publicIpAddress.subscriptionId, settings.publicIpAddress.resourceGroupName,
                'Microsoft.Network/publicIPAddresses', settings.publicIpAddress.name)
        };
    }

    if (settings.bgpSettings) {
        result.properties.bgpSettings = settings.bgpSettings;
    }

    return result;
}

let normalizeProperties = ({ setting }) => {
    if (setting.isPublic) {
        let publicIpAddress = {
            name: `${setting.name}-pip`,
            sku: 'Basic',
            publicIPAllocationMethod: 'Dynamic'
        };

        if (!_.isNil(setting.publicIPAddressVersion)) {
            publicIpAddress.publicIPAddressVersion = setting.publicIPAddressVersion;
        }

        if (!_.isNil(setting.domainNameLabel)) {
            publicIpAddress.domainNameLabel = setting.domainNameLabel;
        }

        setting.publicIpAddress = publicIpAddress;
    }

    return setting;
};

let merge = ({ settings, buildingBlockSettings, defaultSettings }) => {
    let defaults = (defaultSettings) ? [VIRTUALNETWORKGATEWAY_SETTINGS_DEFAULTS, defaultSettings] : VIRTUALNETWORKGATEWAY_SETTINGS_DEFAULTS;

    // If needed, we need to build up a publicIpAddress from the information we have here so it can be merged and validated.
    let merged = _.isArray(settings) ? _.map(settings, (setting) => {
        return normalizeProperties({
            setting: setting,
            buildingBlockSettings
        });
    }) : normalizeProperties({
        setting: settings,
        buildingBlockSettings: buildingBlockSettings
    });

    merged = r.setupResources(merged, buildingBlockSettings, (parentKey) => {
        return ((parentKey === null) || (v.utilities.isStringInArray(parentKey, ['virtualNetwork', 'publicIpAddress'])));
    });

    merged = v.merge(merged, defaults, (objValue, srcValue, key) => {
        if ((key === 'publicIpAddress') && (srcValue)) {
            let results = publicIpAddress.merge({
                settings: srcValue
            });

            return results;
        }
    });

    return merged;
};

function process({ settings, buildingBlockSettings, defaultSettings }) {
    settings = _.castArray(settings);

    let buildingBlockErrors = v.validate({
        settings: buildingBlockSettings,
        validations: {
            subscriptionId: v.validationUtilities.isGuid,
            resourceGroupName: v.validationUtilities.isNotNullOrWhitespace,
        }
    });

    if (buildingBlockErrors.length > 0) {
        throw new Error(JSON.stringify(buildingBlockErrors));
    }

    let results = merge({
        settings: settings,
        buildingBlockSettings: buildingBlockSettings,
        defaultSettings: defaultSettings
    });

    let errors = v.validate({
        settings: results,
        validations: virtualNetworkGatewaySettingsValidations
    });

    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }

    results = _.transform(results, (result, setting) => {
        if (setting.publicIpAddress) {
            let pip = publicIpAddress.transform(setting.publicIpAddress);
            result.publicIpAddresses.push(pip.publicIpAddresses);
        }

        setting = transform(setting);
        result.virtualNetworkGateways.push(setting);
    }, {
        virtualNetworkGateways: [],
        publicIpAddresses: []
    });

    // We need to reshape the results a bit since there could be both an ExpressRoute and Vpn gateway for the same virtual network
    // If this is the case, the ExpressRoute gateway MUST be created first, so we'll put it at the front of the array.
    results.virtualNetworkGateways = _.values(_.transform(results.virtualNetworkGateways, (result, setting) => {
        if (_.isUndefined(result[setting.properties.ipConfigurations[0].properties.subnet.id])) {
            result[setting.properties.ipConfigurations[0].properties.subnet.id] = [];
        }

        let proto = (setting.properties.gatewayType === 'ExpressRoute') ? Array.prototype.unshift : Array.prototype.push;
        proto.call(result[setting.properties.ipConfigurations[0].properties.subnet.id], setting);
    }, {}));

    // Get needed resource groups information.
    let resourceGroups = r.extractResourceGroups(results.virtualNetworkGateways, results.publicIpAddresses);
    return {
        resourceGroups: resourceGroups,
        parameters: results
    };
}

exports.process = process;
