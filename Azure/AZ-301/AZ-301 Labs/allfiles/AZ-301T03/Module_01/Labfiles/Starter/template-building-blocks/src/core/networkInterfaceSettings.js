'use strict';

var _ = require('lodash');
var pipSettings = require('./publicIpAddressSettings');
var resources = require('./resources');
let v = require('./validation');

const NETWORKINTERFACE_SETTINGS_DEFAULTS = {
    isPrimary: true,
    isPublic: true,
    privateIPAllocationMethod: 'Dynamic',
    privateIPAddressVersion: 'IPv4',
    publicIPAllocationMethod: 'Static',
    startingIPAddress: '',
    enableIPForwarding: false,
    domainNameLabelPrefix: '',
    dnsServers: [],
    applicationGatewayBackendPoolNames: [],
    backendPoolNames: [],
    inboundNatRulesNames: [],
    inboundNatPoolNames: [],
    enableAcceleratedNetworking: false
};

function merge({ settings, buildingBlockSettings, defaultSettings }) {
    // If settings has more than 1 nic, than change isPrimary to false in defaults
    let defaults = _.cloneDeep(NETWORKINTERFACE_SETTINGS_DEFAULTS);
    if ((_.isArray(settings)) && settings.length > 1) {
        defaults.isPrimary = false;
    }
    defaults = (defaultSettings) ? [defaults, defaultSettings] : defaults;

    // For backwards compatibility, we will set default public ip address settings if isPublic is true,
    // but we will try to rely on publicIpAddress only from now on.

    let merged = resources.setupResources(settings, buildingBlockSettings, (parentKey) => {
        return ((parentKey === null) || (parentKey === 'publicIpAddress'));
    });

    let mergedSettings = v.merge(merged, defaults);

    mergedSettings = _.map(mergedSettings, (nic) => {
        // If publicIpAddress is set, ignore everything else and use that.
        // Otherwise, go through the old path.

        // If needed, we need to build up a publicIpAddress from the information we have here so it can be merged and validated.
        if (nic.publicIpAddress) {
            nic.publicIpAddress = pipSettings.merge({settings: nic.publicIpAddress});
        } else if (nic.isPublic === true) {
            let publicIpAddress = {
                resourceGroupName: nic.resourceGroupName,
                subscriptionId: nic.subscriptionId,
                location: nic.location
            };
            if (nic.publicIPAllocationMethod) {
                publicIpAddress.publicIPAllocationMethod = nic.publicIPAllocationMethod;
            }

            if (nic.publicIPAddressVersion) {
                publicIpAddress.publicIPAddressVersion = nic.publicIPAddressVersion;
            }
            nic.publicIpAddress = pipSettings.merge({ settings: publicIpAddress });
        }

        return nic;
    });

    return mergedSettings;
}

let validIPAllocationMethods = ['Static', 'Dynamic'];

let isValidIPAllocationMethod = (ipAllocationMethod) => {
    return v.utilities.isStringInArray(ipAllocationMethod, validIPAllocationMethods);
};

let networkInterfaceValidations = {
    enableIPForwarding: v.validationUtilities.isBoolean,
    subnetName: v.validationUtilities.isNotNullOrWhitespace,
    privateIPAllocationMethod: (value, parent) => {
        let result = {
            result: true
        };

        if (!isValidIPAllocationMethod(value)) {
            result = {
                result: false,
                message: `Valid values are ${validIPAllocationMethods.join(',')}`
            };
        } else if ((value === 'Static') && (!v.utilities.networking.isValidIpAddress(parent.startingIPAddress))) {
            result = {
                result: false,
                message: 'If privateIPAllocationMethod is Static, startingIPAddress must be a valid IP address'
            };
        }

        return result;
    },
    publicIPAllocationMethod: (value, parent) => {
        let result = {
            result: isValidIPAllocationMethod(value),
            message: `Valid values are ${validIPAllocationMethods.join(',')}`
        };

        return result;
    },
    isPrimary: v.validationUtilities.isBoolean,
    isPublic: v.validationUtilities.isBoolean,
    dnsServers: (value) => {
        if (_.isNil(value)) {
            return {
                result: false,
                message: 'Value cannot be null or undefined'
            };
        } else if (value.length === 0) {
            return {
                result: true
            };
        } else {
            return {
                validations: v.validationUtilities.isValidIpAddress
            };
        }
    },
    publicIpAddress: (value) => {
        if (_.isNil(value)) {
            return {
                result: true
            };
        } else {
            let pipValidations = _.cloneDeep(pipSettings.validations);
            delete pipValidations.name;
            return {
                validations: pipValidations
            };
        }
    },
    enableAcceleratedNetworking: v.validationUtilities.isBoolean
};

function intToIP(int) {
    var part1 = int & 255;
    var part2 = ((int >> 8) & 255);
    var part3 = ((int >> 16) & 255);
    var part4 = ((int >> 24) & 255);

    return part4 + '.' + part3 + '.' + part2 + '.' + part1;
}

function ipToInt(ip) {
    var ipl = 0;
    ip.split('.').forEach(function (octet) {
        ipl <<= 8;
        ipl += parseInt(octet);
    });
    return (ipl >>> 0);
}

function transformPublicIpAddresses(parent, vmIndex, nicIndex) {
    let settings = parent.publicIpAddress;

    settings.name = `${parent.name}-pip`;

    if (!v.utilities.isNullOrWhitespace(parent.domainNameLabelPrefix)) {
        settings.domainNameLabel = `${parent.domainNameLabelPrefix}${vmIndex + 1}${nicIndex + 1}`;
    }
    return pipSettings.transform(settings);
}

function transform(settings, parent, vmIndex) {
    return _.transform(settings, (result, nic, index) => {
        nic.name = parent.name.concat('-nic', (index + 1));

        if ((parent.zones) && (nic.publicIpAddress)) {
            nic.zones = parent.zones;
        }

        let instance = {
            resourceGroupName: nic.resourceGroupName,
            subscriptionId: nic.subscriptionId,
            location: nic.location,
            name: nic.name,
            properties: {
                ipConfigurations: [
                    {
                        name: 'ipconfig1',
                        properties: {
                            privateIPAllocationMethod: nic.privateIPAllocationMethod,
                            privateIPAddressVersion: nic.privateIPAddressVersion,
                            subnet: {
                                id: resources.resourceId(parent.virtualNetwork.subscriptionId, parent.virtualNetwork.resourceGroupName, 'Microsoft.Network/virtualNetworks/subnets', parent.virtualNetwork.name, nic.subnetName)
                            }
                        }
                    }
                ],
                enableIPForwarding: nic.enableIPForwarding,
                dnsSettings: {
                    dnsServers: nic.dnsServers,
                    appliedDnsServers: nic.dnsServers
                },
                primary: nic.isPrimary,
                enableAcceleratedNetworking: nic.enableAcceleratedNetworking
            }
        };

        if (!_.isNil(nic.applicationGatewayBackendPoolNames)) {
            nic.applicationGatewayBackendPoolNames.forEach((pool, index) => {
                if (index === 0) {
                    instance.properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools = [];
                }
                if (_.isObject(pool) && !v.utilities.isNullOrWhitespace(pool.applicationGatewayName)) {
                    instance.properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.push({
                        id: resources.resourceId(pool.subscriptionId || nic.subscriptionId,
                            pool.resourceGroupName || nic.resourceGroupName,
                            'Microsoft.Network/applicationGateways/backendAddressPools',
                            pool.applicationGatewayName,
                            pool.name)
                    });
                } else {
                    instance.properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.push({
                        id: resources.resourceId(parent.applicationGatewaySettings.subscriptionId,
                            parent.applicationGatewaySettings.resourceGroupName,
                            'Microsoft.Network/applicationGateways/backendAddressPools',
                            parent.applicationGatewaySettings.name,
                            _.isObject(pool) ? pool.name : pool)
                    });
                }
            });
        }

        if (!_.isNil(nic.backendPoolNames)) {
            nic.backendPoolNames.forEach((pool, index) => {
                if (index === 0) {
                    instance.properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools = [];
                }
                if (_.isObject(pool) && !v.utilities.isNullOrWhitespace(pool.loadBalancerName)) {
                    instance.properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.push({
                        id: resources.resourceId(pool.subscriptionId || nic.subscriptionId,
                            pool.resourceGroupName || nic.resourceGroupName,
                            'Microsoft.Network/loadBalancers/backendAddressPools',
                            pool.loadBalancerName,
                            pool.name)
                    });
                } else {
                    instance.properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.push({
                        id: resources.resourceId(parent.loadBalancerSettings.subscriptionId,
                            parent.loadBalancerSettings.resourceGroupName,
                            'Microsoft.Network/loadBalancers/backendAddressPools',
                            parent.loadBalancerSettings.name,
                            _.isObject(pool) ? pool.name : pool)
                    });
                }
            });
        }

        if (!_.isNil(nic.inboundNatRulesNames)) {
            nic.inboundNatRulesNames.forEach((natRuleName, index) => {
                if (index === 0) {
                    instance.properties.ipConfigurations[0].properties.loadBalancerInboundNatRules = [];
                }
                let ruleName = _.isObject(natRuleName) ? natRuleName.name : natRuleName;
                instance.properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.push({
                    id: resources.resourceId(parent.loadBalancerSettings.subscriptionId,
                        parent.loadBalancerSettings.resourceGroupName,
                        'Microsoft.Network/loadBalancers/inboundNatRules',
                        parent.loadBalancerSettings.name,
                        `${ruleName}-${vmIndex}`)
                });
            });
        }

        if (!_.isNil(nic.inboundNatPoolNames)) {
            nic.inboundNatPoolNames.forEach((natPoolName, index) => {
                if (index === 0) {
                    instance.loadBalancerInboundNatPools = [];
                }
                if (_.isObject(natPoolName) && !v.utilities.isNullOrWhitespace(natPoolName.loadBalancerName)) {
                    instance.loadBalancerInboundNatPools.push({
                        id: resources.resourceId(natPoolName.subscriptionId || nic.subscriptionId,
                            natPoolName.resourceGroupName || nic.resourceGroupName,
                            'Microsoft.Network/loadBalancers/inboundNatPools',
                            natPoolName.loadBalancerName,
                            natPoolName.name)
                    });
                } else {
                    instance.loadBalancerInboundNatPools.push({
                        id: resources.resourceId(parent.loadBalancerSettings.subscriptionId,
                            parent.loadBalancerSettings.resourceGroupName,
                            'Microsoft.Network/loadBalancers/inboundNatPools',
                            parent.loadBalancerSettings.name,
                            _.isObject(natPoolName) ? natPoolName.name : natPoolName)
                    });
                }
            });
        }

        if (nic.publicIpAddress) {
            let pip = transformPublicIpAddresses(nic, vmIndex, index);
            result.pips = _.concat(result.pips, pip.publicIpAddresses);

            instance.properties.ipConfigurations[0].properties.publicIPAddress = {
                id: resources.resourceId(nic.subscriptionId, nic.resourceGroupName, 'Microsoft.Network/publicIPAddresses', pip.publicIpAddresses.name)
            };
        }

        if (_.toLower(nic.privateIPAllocationMethod) === 'static') {
            let updatedIp = intToIP(ipToInt(nic.startingIPAddress) + vmIndex);
            instance.properties.ipConfigurations[0].properties.privateIPAddress = updatedIp;
        }
        result.nics.push(instance);
        return result;
    }, {
        pips: [],
        nics: []
    });
}

exports.transform = transform;
exports.merge = merge;
exports.validations = networkInterfaceValidations;
