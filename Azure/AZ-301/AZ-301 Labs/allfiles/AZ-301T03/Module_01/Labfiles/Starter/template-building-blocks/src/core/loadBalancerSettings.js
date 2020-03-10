'use strict';

let _ = require('lodash');
let v = require('./validation');
let resources = require('./resources');
let publicIpAddressSettings = require('./publicIpAddressSettings');

const LOADBALANCER_SETTINGS_DEFAULTS = {
    frontendIPConfigurations: [
        {
            name: 'default-feConfig',
            loadBalancerType: 'Public',
            zones: []
        }
    ],
    loadBalancingRules: [
        {
            loadDistribution: 'Default'
        }
    ],
    probes: [
        {
            intervalInSeconds: 15,
            numberOfProbes: 2
        }
    ],
    backendPools: [{
        nics: []
    }],
    inboundNatRules: [{
        enableFloatingIP: false
    }],
    inboundNatPools: [],
    sku: 'Standard'
};

function merge({ settings, buildingBlockSettings, defaultSettings }) {

    let defaults = (defaultSettings) ? [LOADBALANCER_SETTINGS_DEFAULTS, defaultSettings] : LOADBALANCER_SETTINGS_DEFAULTS;
    // We are going to support adding nics into a backend pool on load balancer creation.  This will slow
    // down the template, since we have to update the nics individually.
    settings = _.map(settings, (setting) => {
        if (_.isArray(setting.backendPools)) {
            setting.backendPools = _.map(setting.backendPools, (config) => {
                if (config.nics) {
                    config.nics = _.map(config.nics, (nic) => {
                        if (_.isString(nic)) {
                            // If the nic is a string, we need to reshape, and the setupResources will
                            // default the subscription, resource group, and location
                            return {
                                name: nic
                            };
                        }

                        return nic;
                    });
                }
                return config;
            });
        }

        return setting;
    });

    let mergedSettings = resources.setupResources(settings, buildingBlockSettings, (parentKey) => {
        return ((parentKey === null) || (parentKey === 'virtualNetwork') || (parentKey === 'nics'));
    });

    mergedSettings = v.merge(mergedSettings, defaults, defaultsCustomizer);

    mergedSettings = _.map(mergedSettings, (setting) => {
        setting.frontendIPConfigurations = _.map(setting.frontendIPConfigurations, (config) => {
            if (config.loadBalancerType === 'Public') {
                config.publicIpAddress = {
                    name: `${setting.name}-${config.name}-pip`,
                    publicIPAllocationMethod: 'Static',
                    domainNameLabel: config.domainNameLabel,
                    publicIPAddressVersion: config.publicIPAddressVersion,
                    resourceGroupName: setting.resourceGroupName,
                    subscriptionId: setting.subscriptionId,
                    location: setting.location,
                    sku: setting.sku,
                    zones: config.zones
                };
            }
            return config;
        });

        return setting;
    });

    
    return mergedSettings;
}

function defaultsCustomizer(objValue, srcValue, key) {
    if (key === 'frontendIPConfigurations') {
        if (_.isNil(srcValue) || srcValue.length === 0) {
            return objValue;
        } else {
            delete objValue[0].name;
        }
    }
}

let validLoadBalancerTypes = ['Public', 'Internal'];
let validProtocols = ['Tcp', 'Udp'];
let validProbeProtocols = ['Http', 'Tcp'];
let validLoadDistributions = ['Default', 'SourceIP', 'SourceIPProtocol'];
let validSkus = ['Basic', 'Standard'];

let isValidLoadBalancerType = (loadBalancerType) => {
    return v.utilities.isStringInArray(loadBalancerType, validLoadBalancerTypes);
};

let isValidProtocol = (protocol) => {
    return v.utilities.isStringInArray(protocol, validProtocols);
};

let isValidProbeProtocol = (probeProtocol) => {
    return v.utilities.isStringInArray(probeProtocol, validProbeProtocols);
};

let isValidLoadDistribution = (loadDistribution) => {
    return v.utilities.isStringInArray(loadDistribution, validLoadDistributions);
};

let isValidSku = (sku) => {
    return v.utilities.isStringInArray(sku, validSkus);
};

let frontendIPConfigurationValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    loadBalancerType: (value) => {
        return {
            result: isValidLoadBalancerType(value),
            message: `Valid values are ${validLoadBalancerTypes.join(' ,')}`
        };
    },
    internalLoadBalancerSettings: (value, parent) => {
        if (parent.loadBalancerType === 'Public') {
            if (!_.isNil(value)) {
                return {
                    result: false,
                    message: 'If loadBalancerType is Public, internalLoadBalancerSettings cannot be specified'
                };
            } else {
                return { result: true };
            }
        }
        let internalLoadBalancerSettingsValidations = {
            privateIPAddress: (value) => {
                return {
                    result: v.utilities.networking.isValidIpAddress(value),
                    message: 'Value must be a valid IP address'
                };
            },
            subnetName: v.validationUtilities.isNotNullOrWhitespace,
        };
        return {
            validations: internalLoadBalancerSettingsValidations
        };
    },
    publicIpAddress: (value, parent) => {
        // We need to validate that the publicIPAllocationMethod is Dynamic for ApplicationGateways
        if ((parent.loadBalancerType === 'Public') && (_.isNil(value) || value.publicIPAllocationMethod !== 'Static')) {
            return {
                result: false,
                message: 'If loadBalancerType is Public, publicIpAddress must be specified and the publicIPAllocationMethod must be Static'
            };
        } else if ((parent.loadBalancerType === 'Internal') && (!_.isNil(value))) {
            return {
                result: false,
                message: 'If loadBalancerType is Internal, publicIpAddress cannot be specified'
            };
        }

        return {
            result: true
        };
    }
};

let probeValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    protocol: (value) => {
        return {
            result: isValidProbeProtocol(value),
            message: `Valid values are ${validProbeProtocols.join(',')}`
        };
    },
    port: (value) => {
        return {
            result: _.inRange(_.toSafeInteger(value), 1, 65536),
            message: 'Valid values are from 1 to 65535'
        };
    },
    intervalInSeconds: (value) => {
        return {
            // TODO - Not sure what the upper limit is, so I chose five minutes at random.
            result: _.inRange(_.toSafeInteger(value), 5, 300),
            message: 'Valid values are from 5 to 300'
        };
    },
    requestPath: (value, parent) => {
        let result = {
            result: true
        };

        if ((parent.protocol === 'Http') && (v.utilities.isNullOrWhitespace(value))) {
            result = {
                result: false,
                message: 'If protocol is Http, requestPath cannot be null, undefined, or only whitespace'
            };
        } else if ((parent.protocol === 'Tcp') && (!_.isNil(value))) {
            result = {
                result: false,
                message: 'If protocol is Tcp, requestPath cannot be provided'
            };
        }

        return result;
    },
    numberOfProbes: (value) => {
        return {
            // TODO: get the range for # of probes property
            result: _.inRange(_.toSafeInteger(value), 1, 20),
            message: 'Valid values are from 1 to 65535'
        };
    }
};

let loadBalancerValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    frontendIPConfigurations: () => {
        return {
            validations: frontendIPConfigurationValidations
        };
    },
    loadBalancingRules: (value, parent) => {
        let baseSettings = parent;
        let loadBalancingRuleValidations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            frontendIPConfigurationName: (value, parent) => {
                let result = {
                    result: false,
                    message: `Invalid frontendIPConfigurationName. loadBalancingRule: ${parent.name}, frontendIPConfigurationName: ${value}`
                };
                let matched = _.filter(baseSettings.frontendIPConfigurations, (o) => { return (o.name === value); });

                return ((matched.length > 0) ? { result: true } : result);
            },
            backendPoolName: (value, parent) => {
                let result = {
                    result: false,
                    message: `Invalid backendPoolName. loadBalancingRule: ${parent.name}, backendPoolName: ${value}`
                };
                let matched = _.filter(baseSettings.backendPools, (o) => { return (o.name === value); });

                return ((matched.length > 0) ? { result: true } : result);
            },
            frontendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65535),
                    message: 'Valid values are from 1 to 65534'
                };
            },
            backendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65536),
                    message: 'Valid values are from 1 to 65535'
                };
            },
            protocol: (value) => {
                return {
                    result: isValidProtocol(value),
                    message: `Valid values are ${validProtocols.join(',')}`
                };
            },
            enableFloatingIP: v.validationUtilities.isBoolean,
            idleTimeoutInMinutes: (value, parent) => {
                let result = {
                    result: true
                };

                if ((parent.protocol === 'Tcp') && (!_.isNil(value) && !_.inRange(value, 4, 31))) {
                    result = {
                        result: false,
                        message: 'Valid values are from 4 to 30'
                    };
                } else if ((parent.protocol === 'Udp') && (!_.isNil(value))) {
                    result = {
                        result: false,
                        message: 'If protocol is Udp, idleTimeoutInMinutes cannot be specified'
                    };
                }

                return result;
            },
            probeName: (value, parent) => {
                let result = {
                    result: false,
                    message: `Invalid probeName. loadBalancingRule: ${parent.name}, probeName: ${value}`
                };
                let matched = _.filter(baseSettings.probes, (o) => { return (o.name === value); });

                return ((matched.length > 0) ? { result: true } : result);
            },
            loadDistribution: (value) => {
                let result = {
                    result: true
                };

                // loadDistribution is not required.
                if (!_.isUndefined(value)) {
                    result = {
                        result: isValidLoadDistribution(value),
                        message: `Valid values are ${validLoadDistributions.join(',')}`
                    };
                }

                return result;
            }
        };
        return {
            validations: loadBalancingRuleValidations
        };
    },
    probes: () => {
        return {
            validations: probeValidations
        };
    },
    backendPools: () => {
        // TODO - Add nic resource id validation.
        let backendPoolsValidations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
        };
        return {
            validations: backendPoolsValidations
        };
    },
    inboundNatRules: (value, parent) => {
        let baseSettings = parent;
        let inboundNatRuleValidations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            protocol: (value) => {
                return {
                    result: isValidProtocol(value),
                    message: `Valid values are ${validProtocols.join(',')}`
                };
            },
            frontendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65535),
                    message: 'Valid values are from 1 to 65534'
                };
            },
            backendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65536),
                    message: 'Valid values are from 1 to 65535'
                };
            },
            idleTimeoutInMinutes: (value, parent) => {
                let result = {
                    result: true
                };

                if ((parent.protocol === 'Tcp') && (!_.isNil(value) && !_.inRange(value, 4, 31))) {
                    result = {
                        result: false,
                        message: 'Valid values are from 4 to 30'
                    };
                } else if ((parent.protocol === 'Udp') && (!_.isNil(value))) {
                    result = {
                        result: false,
                        message: 'If protocol is Udp, idleTimeoutInMinutes cannot be specified'
                    };
                }

                return result;
            },
            enableFloatingIP: v.validationUtilities.isBoolean,
            frontendIPConfigurationName: (value, parent) => {
                let result = {
                    result: false,
                    message: `Invalid frontendIPConfigurationName. inboundNatRule: ${parent.name}, frontendIPConfigurationName: ${value}`
                };
                let matched = _.filter(baseSettings.frontendIPConfigurations, (o) => { return (o.name === value); });

                return ((matched.length > 0) ? { result: true } : result);
            }
        };
        return {
            validations: inboundNatRuleValidations
        };
    },
    inboundNatPools: (value, parent) => {
        let baseSettings = parent;
        let inboundNatPoolValidations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            protocol: (value) => {
                return {
                    result: isValidProtocol(value),
                    message: `Valid values are ${validProtocols.join(',')}`
                };
            },
            startingFrontendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65535),
                    message: 'Valid values are from 1 to 65534'
                };
            },
            frontendPortRangeEnd: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65535),
                    message: 'Valid values are from 1 to 65534'
                };
            },
            backendPort: (value) => {
                return {
                    result: _.inRange(_.toSafeInteger(value), 1, 65536),
                    message: 'Valid values are from 1 to 65535'
                };
            },
            frontendIPConfigurationName: (value, parent) => {
                let result = {
                    result: false,
                    message: `Invalid frontendIPConfigurationName. inboundNatPool: ${parent.name}, frontendIPConfigurationName: ${value}`
                };
                let matched = _.filter(baseSettings.frontendIPConfigurations, (o) => { return (o.name === value); });

                return ((matched.length > 0) ? { result: true } : result);
            }
        };
        return {
            validations: inboundNatPoolValidations
        };
    },
    sku: (value) => {
        return {
            result: isValidSku(value),
            message: `Valid values are ${validSkus.join(',')}`
        };
    }
};

let processProperties = {
    frontendIPConfigurations: (value, key, parent, properties) => {
        let feIpConfigs = [];
        value.forEach((config) => {
            if (config.loadBalancerType === 'Internal') {
                feIpConfigs.push({
                    name: config.name,
                    properties: {
                        privateIPAllocationMethod: 'Static',
                        privateIPAddress: config.internalLoadBalancerSettings.privateIPAddress,
                        subnet: {
                            id: resources.resourceId(parent.virtualNetwork.subscriptionId, parent.virtualNetwork.resourceGroupName, 'Microsoft.Network/virtualNetworks/subnets', parent.virtualNetwork.name, config.internalLoadBalancerSettings.subnetName),
                        }
                    },
                    zones: config.zones
                });
            } else if (config.loadBalancerType === 'Public') {
                feIpConfigs.push({
                    name: config.name,
                    properties: {
                        privateIPAllocationMethod: 'Dynamic',
                        publicIPAddress: {
                            id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/publicIPAddresses', config.publicIpAddress.name)
                        }
                    }
                });
            }
        });
        properties['frontendIPConfigurations'] = feIpConfigs;
    },
    loadBalancingRules: (value, key, parent, properties) => {
        let lbRules = [];
        value.forEach((rule) => {
            let lbRule = {
                name: rule.name,
                properties: {
                    frontendIPConfiguration: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/loadBalancers/frontendIPConfigurations', parent.name, rule.frontendIPConfigurationName)
                    },
                    backendAddressPool: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/loadBalancers/backendAddressPools', parent.name, rule.backendPoolName)
                    },
                    frontendPort: rule.frontendPort,
                    backendPort: rule.backendPort,
                    protocol: rule.protocol,
                    enableFloatingIP: rule.enableFloatingIP,
                    loadDistribution: rule.loadDistribution,
                    probe: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/loadBalancers/probes', parent.name, rule.probeName)
                    },
                }
            };
            if (!_.isNil(rule.idleTimeoutInMinutes)) {
                lbRule.properties.idleTimeoutInMinutes = rule.idleTimeoutInMinutes;
            }
            lbRules.push(lbRule);
        });
        properties['loadBalancingRules'] = lbRules;
    },
    probes: (value, key, parent, properties) => {
        let probes = [];
        value.forEach((probe) => {
            probes.push({
                name: probe.name,
                properties: {
                    port: probe.port,
                    protocol: probe.protocol,
                    requestPath: probe.requestPath,
                    intervalInSeconds: probe.intervalInSeconds,
                    numberOfProbes: probe.numberOfProbes
                }
            });
        });
        properties['probes'] = probes;
    },
    backendPools: (value, key, parent, properties) => {
        properties['backendAddressPools'] = _.map(value, (pool) => { return { name: pool.name }; });
        properties['ipConfigurations'] = _.flatMap(value, (pool) => {
            return _.map(pool.nics, (nic) => {
                return {
                    // This will be a bit funny, since it's a nested resource
                    subscriptionId: nic.subscriptionId,
                    resourceGroupName: nic.resourceGroupName,
                    location: nic.location,
                    name: `${nic.name}`,
                    id: resources.resourceId(
                        nic.subscriptionId,
                        nic.resourceGroupName,
                        'Microsoft.Network/networkInterfaces',
                        nic.name),
                    ipConfigurationId: resources.resourceId(
                        nic.subscriptionId,
                        nic.resourceGroupName,
                        'Microsoft.Network/networkInterfaces/ipConfigurations',
                        nic.name,
                        'ipconfig1'),
                    properties: {
                        loadBalancerBackendAddressPools: [
                            {
                                id: resources.resourceId(
                                    parent.subscriptionId,
                                    parent.resourceGroupName,
                                    'Microsoft.Network/loadBalancers/backendAddressPools',
                                    parent.name,
                                    pool.name
                                )
                            }
                        ]
                    }
                };
            });
        });
    },
    inboundNatRules: (value, key, parent, properties) => {
        let natRules = [];
        value.forEach((rule) => {
            let natRule = {
                name: rule.name,
                properties: {
                    frontendIPConfiguration: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/loadBalancers/frontendIPConfigurations', parent.name, rule.frontendIPConfigurationName)
                    },
                    protocol: rule.protocol,
                    enableFloatingIP: rule.enableFloatingIP,
                    frontendPort: rule.frontendPort,
                    backendPort: rule.backendPort
                }
            };
            if (!_.isNil(rule.idleTimeoutInMinutes)) {
                natRule.properties.idleTimeoutInMinutes = rule.idleTimeoutInMinutes;
            }
            natRules.push(natRule);
        });
        properties['inboundNatRules'] = natRules;
    },
    inboundNatPools: (value, key, parent, properties) => {
        let natPools = [];
        value.forEach((pool) => {
            natPools.push({
                name: pool.name,
                properties: {
                    frontendIPConfiguration: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/loadBalancers/frontendIPConfigurations', parent.name, pool.frontendIPConfigurationName)
                    },
                    protocol: pool.protocol,
                    frontendPortRangeStart: pool.startingFrontendPort,
                    // TODO: infer frontendPortRangeEnd from vmCount
                    frontendPortRangeEnd: pool.frontendPortRangeEnd,
                    backendPort: pool.backendPort
                }
            });
        });
        properties['inboundNatPools'] = natPools;
    }
};

function transform(param) {
    let accumulator = {};

    let lbProperties = _.transform(param, (properties, value, key, obj) => {
        if (typeof processProperties[key] === 'function') {
            processProperties[key](value, key, obj, properties);
        }
        return properties;
    }, {});

    accumulator['loadBalancers'] = [{
        name: param.name,
        resourceGroupName: param.resourceGroupName,
        subscriptionId: param.subscriptionId,
        location: param.location,
        properties: lbProperties,
        sku: {
            name: param.sku
        }
    }];

    return accumulator;
}

let validate = (settings) => {
    let errors = v.validate({
        settings: settings,
        validations: loadBalancerValidations
    });

    return errors;
};

function process ({ settings, buildingBlockSettings, defaultSettings }) {
    settings = _.castArray(settings);

    let buildingBlockErrors = v.validate({
        settings: buildingBlockSettings,
        validations: {
            subscriptionId: v.validationUtilities.isGuid,
            resourceGroupName: v.validationUtilities.isNotNullOrWhitespace,
        }
    });

    if (buildingBlockErrors.length > 0) {
        throw new v.ValidationError('LoadBalancer', buildingBlockErrors);
    }

    let results = merge({
        settings: settings,
        buildingBlockSettings: buildingBlockSettings,
        defaultSettings: defaultSettings
    });

    let errors = validate(results);

    if (errors.length > 0) {
        throw new v.ValidationError('LoadBalancer', errors);
    }

    let pips = _.flatMap(results, (setting) => {
        return _.map(_.filter(setting.frontendIPConfigurations, (config) => { return !_.isNil(config.publicIpAddress); }), (config) => {
            return config.publicIpAddress;
        });
    });

    if (pips.length > 0) {
        pips = publicIpAddressSettings.process({
            settings: pips,
            buildingBlockSettings: buildingBlockSettings
        });

        // Just so we have a our default
        pips = pips.parameters.publicIpAddresses;
    }

    results = _.transform(results, (result, setting) => {
        let transformed = transform(setting);
        result.ipConfigurations = result.ipConfigurations.concat(_.flatMap(transformed.loadBalancers, (loadBalancer) => {
            const ipConfigs = loadBalancer.properties.ipConfigurations;
            delete loadBalancer.properties.ipConfigurations;
            return ipConfigs;
        }));
        result.loadBalancers = result.loadBalancers.concat(transformed.loadBalancers);
    }, {
        loadBalancers: [],
        ipConfigurations: []
    });

    results.publicIpAddresses = pips;

    let resourceGroups = resources.extractResourceGroups(
        results.loadBalancers,
        results.publicIpAddresses
    );
    return {
        resourceGroups: resourceGroups,
        parameters: results
    };
}

exports.process = process;
exports.merge = merge;
exports.validations = loadBalancerValidations;
exports.transform = transform;

