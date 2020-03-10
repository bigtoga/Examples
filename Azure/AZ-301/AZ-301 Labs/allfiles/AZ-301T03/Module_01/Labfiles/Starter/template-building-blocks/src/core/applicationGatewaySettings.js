'use strict';

let _ = require('lodash');
let v = require('./validation');
let resources = require('./resources');
let publicIpAddressSettings = require('./publicIpAddressSettings');
const os = require('os');

const APPLICATIONGATEWAY_SETTINGS_DEFAULTS = {
    gatewayIPConfigurations: [],
    sslCertificates: [],
    authenticationCertificates: [],
    frontendIPConfigurations: [
        {
            name: 'default-feConfig',
            applicationGatewayType: 'Public'
        }
    ],
    frontendPorts: [],
    backendAddressPools: [
        {
            backendAddresses: [],
            backendIPConfigurations: []
        }
    ],
    backendHttpSettingsCollection: [
        {
            cookieBasedAffinity: 'Disabled',
            pickHostNameFromBackendAddress: false,
            probeEnabled: true,
            requestTimeout: 30,
            authenticationCertificateNames: []
        }
    ],
    httpListeners: [
        {
            requireServerNameIndication: false
        }
    ],
    urlPathMaps: [],
    requestRoutingRules: [],
    probes: [
        {
            interval: 30,
            timeout: 30,
            unhealthyThreshold: 3,
            pickHostNameFromBackendHttpSettings: false,
            minServers: 0
        }
    ],
    redirectConfigurations: [],
    webApplicationFirewallConfiguration: {
        enabled: true,
        firewallMode: 'Prevention',
        ruleSetType: 'OWASP',
        ruleSetVersion: '3.0',
        disabledRuleGroups: []
    },
    zones: []
};

const STANDARD_SKU_DEFAULTS = {
    sku: {
        size: 'Small',
        capacity: 2
    }
};

const STANDARD_V2_SKU_DEFAULTS = {
    sku: {
        tier: 'Standard_v2'
    },
    autoscaleConfiguration: {
        minCapacity: 2
    }
};

function merge({ settings, buildingBlockSettings, defaultSettings }) {
    let defaults = (defaultSettings) ? [APPLICATIONGATEWAY_SETTINGS_DEFAULTS, defaultSettings] : APPLICATIONGATEWAY_SETTINGS_DEFAULTS;

    let mergedSettings = resources.setupResources(settings, buildingBlockSettings, (parentKey) => {
        return ((parentKey === null) || (parentKey === 'virtualNetwork'));
    });
    mergedSettings = v.merge(mergedSettings, defaults, defaultsCustomizer);

    mergedSettings = _.map(mergedSettings, (setting) => {
        // We need to do a little work up front here because of how AGW changed between Standard and Standard_v2.
        // If there is no SKU specified by the user, we default to v2.
        // If there is a SKU specified, and it is the older SKUs, we use the older defaults.
        const skuTier = _.get(setting, 'sku.tier');
        const skuDefaults = ((skuTier === 'Standard') || (skuTier === 'WAF')) ? STANDARD_SKU_DEFAULTS : STANDARD_V2_SKU_DEFAULTS;
        setting = _.merge({}, skuDefaults, setting);
        setting.frontendIPConfigurations = _.map(setting.frontendIPConfigurations, (config) => {
            if (config.applicationGatewayType === 'Public') {
                let publicIpAddress = {
                    name: `${setting.name}-${config.name}-pip`,
                    domainNameLabel: config.domainNameLabel,
                    publicIPAddressVersion: config.publicIPAddressVersion,
                    resourceGroupName: setting.resourceGroupName,
                    subscriptionId: setting.subscriptionId,
                    location: setting.location
                };

                if ((setting.sku.tier === 'Standard') || (setting.sku.tier === 'WAF')) {
                    publicIpAddress.publicIPAllocationMethod = 'Dynamic';
                    publicIpAddress.sku = 'Basic';
                } else {
                    publicIpAddress.publicIPAllocationMethod = 'Static';
                    publicIpAddress.sku = 'Standard';
                    publicIpAddress.zones = setting.zones;
                }

                config.publicIpAddress = publicIpAddress;
            }

            return config;
        });

        return setting;
    });

    return mergedSettings;
}

function defaultsCustomizer(objValue, srcValue, key) {
    if (key === 'frontendIPConfigurations') {
        if (_.isUndefined(srcValue) || !_.isArray(srcValue) || srcValue.length === 0) {
            return objValue;
        } else {
            delete objValue[0].name;
        }
    }
}

let validStandardSkuSizes = ['Small', 'Medium', 'Large'];
let validWAFSkuSizes = ['Medium', 'Large'];
let validSkuTiers = ['Standard', 'WAF', 'Standard_v2', 'WAF_v2'];
let validRedirectTypes = ['Permanent', 'Found', 'SeeOther', 'Temporary'];
let validAppGatewayTypes = ['Public', 'Internal'];
let validProtocols = ['Http', 'Https'];
let validFirewallModes = ['Detection', 'Prevention'];
let validApplicationGatewaySslCipherSuites = [
    'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384',
    'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256',
    'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA',
    'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
    'TLS_DHE_RSA_WITH_AES_256_GCM_SHA384',
    'TLS_DHE_RSA_WITH_AES_128_GCM_SHA256',
    'TLS_DHE_RSA_WITH_AES_256_CBC_SHA',
    'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
    'TLS_RSA_WITH_AES_256_GCM_SHA384',
    'TLS_RSA_WITH_AES_128_GCM_SHA256',
    'TLS_RSA_WITH_AES_256_CBC_SHA256',
    'TLS_RSA_WITH_AES_128_CBC_SHA256',
    'TLS_RSA_WITH_AES_256_CBC_SHA',
    'TLS_RSA_WITH_AES_128_CBC_SHA',
    'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
    'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
    'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384',
    'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256',
    'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
    'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
    'TLS_DHE_DSS_WITH_AES_256_CBC_SHA256',
    'TLS_DHE_DSS_WITH_AES_128_CBC_SHA256',
    'TLS_DHE_DSS_WITH_AES_256_CBC_SHA',
    'TLS_DHE_DSS_WITH_AES_128_CBC_SHA',
    'TLS_RSA_WITH_3DES_EDE_CBC_SHA'
];
let validSslProtocols = ['TLSv1_0', 'TLSv1_1', 'TLSv1_2'];
let validSslPolicyTypes = ['Predefined', 'Custom'];
let validApplicationGatewayRequestRoutingRuleTypes = ['Basic', 'PathBasedRouting'];
let validCookieBasedAffinityValues = ['Enabled', 'Disabled'];
let validRuleSetTypes = ['OWASP'];
let validSslPolicyNames = ['AppGwSslPolicy20150501', 'AppGwSslPolicy20170401', 'AppGwSslPolicy20170401S'];

let isNilOrInRange = (value, from, to) => {
    return {
        result: _.isUndefined(value) || _.inRange(_.toSafeInteger(value), from, to),
        message: `Valid values are from ${from} to ${to}`
    };
};

let isValidStandardSkuSize = (size) => {
    return v.utilities.isStringInArray(size, validStandardSkuSizes);
};

let isValidWAFSkuSize = (size) => {
    return v.utilities.isStringInArray(size, validWAFSkuSizes);
};

let isValidSkuTier = (skuTier) => {
    return v.utilities.isStringInArray(skuTier, validSkuTiers);
};

let isValidRedirectType = (redirectType) => {
    return v.utilities.isStringInArray(redirectType, validRedirectTypes);
};

let isValidAppGatewayType = (appGatewayType) => {
    return v.utilities.isStringInArray(appGatewayType, validAppGatewayTypes);
};

let isValidProtocol = (protocol) => {
    return v.utilities.isStringInArray(protocol, validProtocols);
};

let isValidFirewallMode = (firewallMode) => {
    return v.utilities.isStringInArray(firewallMode, validFirewallModes);
};

let isValidSslCipherSuite = (sslCipherSuite) => {
    return v.utilities.isStringInArray(sslCipherSuite, validApplicationGatewaySslCipherSuites);
};

let isValidSslProtocol = (sslProtocol) => {
    return v.utilities.isStringInArray(sslProtocol, validSslProtocols);
};

let isValidSslPolicyType = (sslPolicyType) => {
    return v.utilities.isStringInArray(sslPolicyType, validSslPolicyTypes);
};

let isValidRequestRoutingRuleType = (requestRoutingRuleType) => {
    return v.utilities.isStringInArray(requestRoutingRuleType, validApplicationGatewayRequestRoutingRuleTypes);
};

let isValidCookieBasedAffinityValue = (cookieBasedAffinityValue) => {
    return v.utilities.isStringInArray(cookieBasedAffinityValue, validCookieBasedAffinityValues);
};

let isValidRuleSetType = (ruleSetType) => {
    return v.utilities.isStringInArray(ruleSetType, validRuleSetTypes);
};

let isValidSslPolicyName = (policyName) => {
    return v.utilities.isStringInArray(policyName, validSslPolicyNames);
};


let frontendIPConfigurationValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    applicationGatewayType: (value) => {
        return {
            result: isValidAppGatewayType(value),
            message: `Valid values are ${validAppGatewayTypes.join(',')}`
        };
    },
    internalApplicationGatewaySettings: (value, parent) => {
        if (parent.applicationGatewayType === 'Public') {
            if (!_.isUndefined(value)) {
                return {
                    result: false,
                    message: 'If applicationGatewayType is Public, internalApplicationGatewaySettings cannot be specified'
                };
            } else {
                return { result: true };
            }
        }
        let internalApplicationGatewaySettingsValidations = {
            subnetName: v.validationUtilities.isNotNullOrWhitespace,
        };
        return {
            validations: internalApplicationGatewaySettingsValidations
        };
    },
    publicIpAddress: (value, parent, root) => {
        if (parent.applicationGatewayType === 'Public') {
            if ((root.sku.tier === 'Standard') || (root.sku.tier === 'WAF')) {
                if ((_.isNil(value) || value.publicIPAllocationMethod !== 'Dynamic')) {
                    return {
                        result: false,
                        message: 'If applicationGatewayType is Public, publicIpAddress must be specified and the publicIPAllocationMethod must be Dynamic'
                    };
                }
            } else {
                // We may not need to do this because the PublicIpAddress validations will handle it
                // but it doesn't hurt.
                if ((_.isNil(value) || value.publicIPAllocationMethod !== 'Static')) {
                    return {
                        result: false,
                        message: 'If applicationGatewayType is Public, publicIpAddress must be specified and the publicIPAllocationMethod must be Standard'
                    };
                }
            }
        } else if ((parent.applicationGatewayType === 'Internal') && (!_.isNil(value))) {
            return {
                result: false,
                message: 'If applicationGatewayType is Internal, publicIpAddress cannot be specified'
            };
        }

        return {
            result: true
        };
    }
};

let autoscaleConfigurationValidations = {
    minCapacity: (value) => {
        return {
            result: _.isInteger(value) && (value > 0),
            message: 'minCapacity must be an integer'
        };
    },
    maxCapacity: (value) => {
        // We don't have to have a maxCapacity
        return {
            result: (_.isInteger(value) && (value > 0)) || _.isNil(value),
            message: 'maxCapacity must be an integer'
        };
    }
}
let skuValidations = {
    capacity: (value, parent, root) => {
        let result = {
            result: _.isInteger(value) && (value > 0),
            message: 'Capacity must be an integer'
        };

        // Either capacity or autoscaleConfiguration should be set, but not both
        if (((parent.tier === 'Standard_v2') || (parent.tier === 'WAF_v2')) &&
            (root.autoscaleConfiguration)) {
            result = {
                result: _.isUndefined(value),
                message: `Either capacity or autoscaleConfiguration must be specified for tier ${root.sku.tier}, but not both`
            };
        }

        return result;
    },
    size: (value, parent) => {
        let result = {
            result: false,
            message: 'Unable to validate size due to invalid tier value'
        };

        if (parent.tier === 'Standard') {
            result = {
                result: isValidStandardSkuSize(value),
                message: `Valid values are ${validStandardSkuSizes.join(',')}`
            };
        } else if (parent.tier === 'WAF') {
            result = {
                result: isValidWAFSkuSize(value),
                message: `Valid values are ${validWAFSkuSizes.join(',')}`
            };
        } else if ((parent.tier === 'Standard_v2') || (parent.tier === 'WAF_v2')) {
            result = {
                result: _.isUndefined(value),
                message: `size cannot be specified for tier ${parent.tier}`
            };
        }

        return result;
    },
    tier: (value) => {
        return {
            result: isValidSkuTier(value),
            message: `Valid values are ${validSkuTiers.join(',')}`
        };
    }
};

let frontendPortsValidations = {
    port: v.validationUtilities.isValidPortRange
};

let protocolValidation = (protocol) => {
    return {
        result: isValidProtocol(protocol),
        message: `Valid values are ${validProtocols.join(',')}`
    };
};

let cookieBasedAffinityValidation = (value) => {
    return {
        result: isValidCookieBasedAffinityValue(value),
        message: `Valid values are ${validCookieBasedAffinityValues.join(',')}`
    };
};

let requestRoutingRuleTypeValidation = (value) => {
    return {
        result: isValidRequestRoutingRuleType(value),
        message: `Valid values are ${validApplicationGatewayRequestRoutingRuleTypes.join(',')}`
    };
};

let disabledRuleGroupsValidations = (value) => {
    if (_.isUndefined(value) || (_.isArray(value) && value.length === 0)) {
        return { result: true };
    }
    let errorMessage = '';
    value.forEach((ruleGroup, index) => {
        let result = v.validationUtilities.isNotNullOrWhitespace(ruleGroup.ruleGroupName);
        if (result.result === false) {
            errorMessage += `disabledRuleGroups[${index}].ruleGroupName ` + result.message + `.${os.EOL}`;
        }
    });
    return {
        result: errorMessage === '',
        message: errorMessage
    };
};

let backendIPConfigurationsValidations = (value, parent) => {
    if (_.isUndefined(value)) {
        return { result: true };
    }

    //TODO: ApplicationGatewayBackendAddressPoolAlreadyHasBackendAddresses: nic cannot reference Backend Address Pool because the pool contains
    // BackendAddresses. A pool can contain only one of these three: IPs in BackendAddresses array, IPConfigurations of standalone Network Interfaces,
    // IPConfigurations of VM Scale Set Network Interfaces. Also, two VM Scale Sets cannot use the same Backend Address Pool.\\\
        // TODO: Mixing IP/FQDN and virtual machine types is not allowed.
        // can have nic but not both
    if ((value.length > 0) && (parent.backendAddresses.length > 0)) {
        return {
            result: false,
            message: 'Either backendAddresses or backendIPConfigurations can be specified, but not both'
        };
    }

    let validations = {
        id: v.validationUtilities.isNotNullOrWhitespace
    };

    return { validations: validations };
};

let backendAddressesValidations = (value, parent) => {
    if (_.isUndefined(value)) {
        return { result: true };
    }

    //TODO: ApplicationGatewayBackendAddressPoolAlreadyHasBackendAddresses: nic cannot reference Backend Address Pool because the pool contains
    // BackendAddresses. A pool can contain only one of these three: IPs in BackendAddresses array, IPConfigurations of standalone Network Interfaces,
    // IPConfigurations of VM Scale Set Network Interfaces. Also, two VM Scale Sets cannot use the same Backend Address Pool.\\\
        // TODO: Mixing IP/FQDN and virtual machine types is not allowed.
        // can have nic but not both
    if ((value.length > 0) && (parent.backendIPConfigurations.length > 0)) {
        return {
            result: false,
            message: 'Either backendAddresses or backendIPConfigurations can be specified, but not both'
        };
    }

    let validations = {
        fqdn: (value, parent) => {
            if ((!_.isUndefined(value) && !_.isUndefined(parent.ipAddress)) ||
                (_.isUndefined(value) && _.isUndefined(parent.ipAddress))) {
                return {
                    result: false,
                    message: 'Either ipAddress or fqdn must be specified'
                };
            }
            if (_.isUndefined(value)) {
                return { result: true };
            }
            return { validations: v.validationUtilities.isNotNullOrWhitespace };
        },
        ipAddress: (value, parent) => {
            if ((!_.isUndefined(value) && !_.isUndefined(parent.fqdn)) ||
                (_.isUndefined(value) && _.isUndefined(parent.fqdn))) {
                return {
                    result: false,
                    message: 'Either ipAddress or fqdn must be specified'
                };
            }
            if (_.isUndefined(value)) {
                return { result: true };
            }
            return { validations: v.validationUtilities.isValidIpAddress };
        }
    };
    return { validations: validations };
};

let applicationGatewayValidations = {
    //TODO: ApplicationGatewaySubnetCannotBeUsedByOtherResources\\\
    name: v.validationUtilities.isNotNullOrWhitespace,
    sku: () => {
        return { validations: skuValidations };
    },
    autoscaleConfiguration: (value, parent) => {
        let result = { validations: autoscaleConfigurationValidations };

        // Either capacity or autoscaleConfiguration should be set, but not both
        if ((parent.sku.tier === 'Standard_v2') || (parent.sku.tier === 'WAF_v2')) {
            if (((parent.sku.capacity) && (value)) || ((!parent.sku.capacity) && (!value))) {
                result = {
                    result: false,
                    message: `Either capacity or autoscaleConfiguration must be specified for tier ${parent.sku.tier}, but not both`
                };
            }
        } else {
            result = {
                result: _.isNil(value),
                message: `autoscaleConfiguration cannot be set for tier ${parent.sku.tier}`
            };
        }

        return result;
    },
    gatewayIPConfigurations: () => {
        return {
            validations: {
                subnetName: v.validationUtilities.isNotNullOrWhitespace
            }
        };
    },
    sslCertificates: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let validations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            data: v.validationUtilities.isNotNullOrWhitespace,
            password: v.validationUtilities.isNotNullOrWhitespace,
        };
        return { validations: validations };
    },
    authenticationCertificates: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let validations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            data: v.validationUtilities.isNotNullOrWhitespace
        };
        return { validations: validations };
    },
    frontendIPConfigurations: (value) => {
        let publicConfigs = _.filter(value, c => { return c.applicationGatewayType === 'Public'; });
        let internalConfigs = _.filter(value, c => { return c.applicationGatewayType === 'Internal'; });
        if (value.length > 2 || publicConfigs.length > 1 || internalConfigs.length > 1) {
            return {
                result: false,
                message: 'There can be only 2 frontendIPConfigurations, 1 private and 1 public'
            };
        }
        return {
            validations: frontendIPConfigurationValidations
        };
    },
    frontendPorts: () => {
        return {
            validations: frontendPortsValidations
        };
    },
    backendAddressPools: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let backendAddressPoolsValidations = {
            backendAddresses: backendAddressesValidations,
            backendIPConfigurations: backendIPConfigurationsValidations
        };

        return {
            validations: backendAddressPoolsValidations
        };
    },
    backendHttpSettingsCollection: (value, parent) => {
        let baseSettings = parent;
        let backendHttpSettingsCollectionValidations = {
            port: v.validationUtilities.isValidPortRange,
            protocol: protocolValidation,
            cookieBasedAffinity: cookieBasedAffinityValidation,
            pickHostNameFromBackendAddress: v.validationUtilities.isBoolean,
            probeEnabled: v.validationUtilities.isBoolean,
            authenticationCertificateNames: (value, parent) => {
                if (value.length === 0) {
                    return {
                        result: true
                    };
                }

                return {
                    validations: (value) => {
                        if (parent.protocol === 'Http') {
                            if (_.isUndefined(value)) {
                                return {
                                    result: true
                                };
                            } else {
                                return {
                                    result: false,
                                    message: 'authenticationCertificateName cannot be specified for Http protocol'
                                };
                            }
                        }

                        let result = {
                            result: false,
                            message: `Invalid authenticationCertificateName ${value} in httpListeners`
                        };
                        let matched = _.filter(baseSettings.authenticationCertificates, (o) => { return (o.name === value); });
                        return (matched.length === 0) ? result : { result: true };
                    }
                };
            }
        };
        return {
            validations: backendHttpSettingsCollectionValidations
        };
    },
    httpListeners: (value, parent) => {
        if (_.isUndefined(value) || (_.isArray(value) && value.length === 0)) {
            return { result: true };
        }

        let baseSettings = parent;
        let httpListenersValidations = {
            frontendIPConfigurationName: (value) => {
                let result = {
                    result: false,
                    message: `Invalid frontendIPConfigurationName ${value} in httpListeners`
                };
                let matched = _.filter(baseSettings.frontendIPConfigurations, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            frontendPortName: (value) => {
                let result = {
                    result: false,
                    message: `Invalid frontendPortName ${value} in httpListeners`
                };
                let matched = _.filter(baseSettings.frontendPorts, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            protocol: protocolValidation,
            requireServerNameIndication: v.validationUtilities.isBoolean,
            sslCertificateName: (value, parent) => {
                if (parent.protocol === 'Http') {
                    if (_.isUndefined(value)) {
                        return {
                            result: true
                        };
                    } else {
                        return {
                            result: false,
                            message: 'sslCertificateName cannot be specified for Http protocol'
                        };
                    }
                } else if (parent.protocol === 'Https') {
                    if (_.isUndefined(value)) {
                        return {
                            result: false,
                            message: 'sslCertificateName must be specified for Https protocol'
                        };
                    }

                    let result = {
                        result: false,
                        message: `Invalid sslCertificateName ${value} in httpListeners`
                    };
                    let matched = _.filter(baseSettings.sslCertificates, (o) => { return (o.name === value); });
                    return (matched.length === 0) ? result : { result: true };
                }

                // This means an invalid protocol was specified, so it is an invalid configuration.
                // Once the user fixes the protocol, then this check matters.
                return {
                    result: true
                };
            }
        };
        return {
            validations: httpListenersValidations
        };
    },
    urlPathMaps: (value, parent) => {
        if (_.isUndefined(value) || (_.isArray(value) && value.length === 0)) {
            return { result: true };
        }

        let baseSettings = parent;
        let urlPathMapsValidations = {
            defaultBackendAddressPoolName: (value, parent) => {
                if (parent.defaultRedirectConfigurationName) {
                    if (_.isUndefined(value)) {
                        return {
                            result: true
                        };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified if defaultRedirectConfigurationName is defined'
                        };
                    }
                }
                let result = {
                    result: false,
                    message: `Invalid defaultBackendAddressPoolName ${value} in urlPathMaps`
                };
                let matched = _.filter(baseSettings.backendAddressPools, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            defaultBackendHttpSettingsName: (value, parent) => {
                if (parent.defaultRedirectConfigurationName) {
                    if (_.isUndefined(value)) {
                        return {
                            result: true
                        };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified if defaultRedirectConfigurationName is defined'
                        };
                    }
                }
                let result = {
                    result: false,
                    message: `Invalid defaultBackendHttpSettingsName ${value} in urlPathMaps`
                };
                let matched = _.filter(baseSettings.backendHttpSettingsCollection, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            defaultRedirectConfigurationName: (value, parent) => {
                if ((parent.defaultBackendAddressPoolName) || (parent.defaultBackendHttpSettingsName)) {
                    if (_.isUndefined(value)) {
                        return {
                            result: true
                        };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified if defaultBackendAddressPoolName or defaultBackendHttpSettingsName is defined'
                        };
                    }
                }
                let result = {
                    result: false,
                    message: `Invalid defaultRedirectConfigurationName ${value} in urlPathMaps`
                };
                let matched = _.filter(baseSettings.redirectConfigurations, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            pathRules: (value) => {
                if (_.isUndefined(value) || (_.isArray(value) && value.length === 0)) {
                    return {
                        result: false,
                        message: 'pathRules must be specified'
                    };
                }
                let errorMessage = '';
                value.forEach((pathRule, index) => {
                    if (_.isUndefined(pathRule.paths) || pathRule.paths.length === 0) {
                        errorMessage += `At least one path must be specified pathRules[${index}].paths.${os.EOL}`;
                    }
                });
                if (errorMessage) {
                    return {
                        result: false,
                        message: errorMessage
                    };
                }
                let pathRulesValidations = {
                    backendAddressPoolName: (value, parent) => {
                        if (parent.redirectConfigurationName) {
                            if (_.isUndefined(value)) {
                                return {
                                    result: true
                                };
                            } else {
                                return {
                                    result: false,
                                    message: 'Value cannot be specified if redirectConfigurationName is defined'
                                };
                            }
                        }

                        let result = {
                            result: false,
                            message: `Invalid backendAddressPoolName ${value} in urlPathMaps`
                        };
                        let matched = _.filter(baseSettings.backendAddressPools, (o) => { return (o.name === value); });
                        return (matched.length === 0) ? result : { result: true };
                    },
                    backendHttpSettingsName: (value, parent) => {
                        if (parent.redirectConfigurationName) {
                            if (_.isUndefined(value)) {
                                return {
                                    result: true
                                };
                            } else {
                                return {
                                    result: false,
                                    message: 'Value cannot be specified if redirectConfigurationName is defined'
                                };
                            }
                        }

                        let result = {
                            result: false,
                            message: `Invalid backendHttpSettingsName ${value} in urlPathMaps`
                        };
                        let matched = _.filter(baseSettings.backendHttpSettingsCollection, (o) => { return (o.name === value); });
                        return (matched.length === 0) ? result : { result: true };
                    },
                    redirectConfigurationName: (value, parent) => {
                        if ((parent.backendAddressPoolName) || (parent.backendHttpSettingsName)) {
                            if (_.isUndefined(value)) {
                                return {
                                    result: true
                                };
                            } else {
                                return {
                                    result: false,
                                    message: 'Value cannot be specified if backendAddressPoolName or backendHttpSettingsName is defined'
                                };
                            }
                        }
                        let result = {
                            result: false,
                            message: `Invalid redirectConfigurationName ${value} in urlPathMaps`
                        };
                        let matched = _.filter(baseSettings.redirectConfigurations, (o) => { return (o.name === value); });
                        return (matched.length === 0) ? result : { result: true };
                    }
                };
                return { validations: pathRulesValidations };
            }
        };
        return {
            validations: urlPathMapsValidations
        };
    },
    requestRoutingRules: (value, parent) => {
        if (_.isUndefined(value) || (_.isArray(value) && value.length === 0)) {
            return { result: true };
        }

        let baseSettings = parent;
        let requestRoutingRulesValidations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            backendAddressPoolName: (value, parent) => {
                if (parent.ruleType === 'PathBasedRouting') {
                    if (_.isUndefined(value)) {
                        return { result: true };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified for ruleType === PathBasedRouting'
                        };
                    }
                } else if ((parent.ruleType === 'Basic') && (parent.redirectConfigurationName)) {
                    if (_.isUndefined(value)) {
                        return { result: true };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified if redirectConfigurationName is specified'
                        };
                    }
                }
                let result = {
                    result: false,
                    message: `Invalid backendAddressPoolName ${value} in requestRoutingRules`
                };
                let matched = _.filter(baseSettings.backendAddressPools, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            backendHttpSettingsName: (value, parent) => {
                if (parent.ruleType === 'PathBasedRouting') {
                    if (_.isUndefined(value)) {
                        return { result: true };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified for ruleType === PathBasedRouting'
                        };
                    }
                } else if ((parent.ruleType === 'Basic') && (parent.redirectConfigurationName)) {
                    if (_.isUndefined(value)) {
                        return { result: true };
                    } else {
                        return {
                            result: false,
                            message: 'Value cannot be specified if redirectConfigurationName is specified'
                        };
                    }
                }
                let result = {
                    result: false,
                    message: `Invalid backendHttpSettingsName ${value} in requestRoutingRules`
                };
                let matched = _.filter(baseSettings.backendHttpSettingsCollection, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            httpListenerName: (value) => {
                let result = {
                    result: false,
                    message: `Invalid httpListenerName ${value} in requestRoutingRules`
                };
                let matched = _.filter(baseSettings.httpListeners, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            ruleType: (value) => {
                if (value === 'PathBasedRouting' && (_.isUndefined(baseSettings.urlPathMaps) || baseSettings.urlPathMaps.length === 0)) {
                    return {
                        result: false,
                        message: 'At least one urlPathMaps must be specified when ruleType is PathBasedRouting'
                    };
                }

                return { validations: requestRoutingRuleTypeValidation };
            },
            urlPathMapName: (value, parent) => {
                if (_.isUndefined(value) && parent.ruleType !== 'PathBasedRouting') {
                    return { result: true };
                }
                let result = {
                    result: false,
                    message: `Invalid urlPathMapName ${value} in requestRoutingRules`
                };
                let matched = _.filter(baseSettings.urlPathMaps, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
            redirectConfigurationName: (value) => {
                if (_.isUndefined(value)) {
                    return { result: true };
                }
                let result = {
                    result: false,
                    message: `Invalid redirectConfigurationName ${value} in requestRoutingRules`
                };
                let matched = _.filter(baseSettings.redirectConfigurations, (o) => { return (o.name === value); });
                return (matched.length === 0) ? result : { result: true };
            },
        };
        return {
            validations: requestRoutingRulesValidations
        };
    },
    probes: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let probesValidation = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            protocol: protocolValidation,
            pickHostNameFromBackendHttpSettings: v.validationUtilities.isBoolean,
            interval: (value) => isNilOrInRange(value, 1, 86401),
            timeout: (value) => isNilOrInRange(value, 1, 86401),
            unhealthyThreshold: (value) => isNilOrInRange(value, 1, 21),
            path: (value) => {
                return {
                    result: _.isUndefined(value) || value.indexOf('/') === 0,
                    message: 'Path must start with "/"'
                };
            },
            match: (value) => {
                if (_.isUndefined(value) || _.isUndefined(value.statusCodes)) {
                    return { result: true };
                }

                let validations = {
                    statusCodes: (values) => {
                        let errorMessage = '';
                        values.forEach((value, index) => {
                            if (!/[0-9]{3}/.test(value) && !/[0-9]{3}-[0-9]{3}/.test(value)) {
                                errorMessage += `match.statusCodes[${index}] must be a valid HTTP status code or a range of them.${os.EOL}`;
                            }
                        });
                        return {
                            result: errorMessage === '',
                            message: errorMessage
                        };
                    }
                };
                return { validations: validations };
            },
            minServers: (value) => {
                if (_.isUndefined(value)) {
                    return { result: true };
                }
                return {
                    result: _.isFinite(value) && _.toSafeInteger(value) >= 0,
                    message: 'minServers must be an integer equal or greater than 0'
                };
            }
        };
        return { validations: probesValidation };
    },
    redirectConfigurations: () => {
        let validations = {
            name: v.validationUtilities.isNotNullOrWhitespace,
            redirectType: (value) => {
                return {
                    result: isValidRedirectType(value),
                    message: `Valid values are ${validRedirectTypes.join(',')}`
                };
            },
            targetUrl: (value, parent) => {
                if ((!_.isUndefined(value)) && (!_.isUndefined(parent.targetListenerName))) {
                    return {
                        result: false,
                        message: 'Value cannot be specified if targetListenerName is specified'
                    };
                }

                if ((_.isUndefined(value)) && (_.isUndefined(parent.targetListenerName))) {
                    return {
                        result: false,
                        message: 'Either targetUrl or targetListenerName must be specified, but not both'
                    };
                }

                if ((_.isUndefined(value)) && (!_.isUndefined(parent.targetListenerName))) {
                    return {
                        result: true
                    };
                }

                if (!_.isUndefined(parent.includePath)) {
                    return {
                        result: false,
                        message: 'Value cannot be specified if includePath is specified'
                    };
                }

                return v.validationUtilities.isNotNullOrWhitespace(value);
            },
            targetListenerName: (value, parent) => {
                if ((!_.isUndefined(value)) && (!_.isUndefined(parent.targetUrl))) {
                    return {
                        result: false,
                        message: 'Value cannot be specified if targetUrl is specified'
                    };
                }

                if ((_.isUndefined(value)) && (_.isUndefined(parent.targetUrl))) {
                    return {
                        result: false,
                        message: 'Either targetListenerName or targetUrl must be specified, but not both'
                    };
                }

                if ((_.isUndefined(value)) && (!_.isUndefined(parent.targetUrl))) {
                    return {
                        result: true
                    };
                }

                return v.validationUtilities.isNotNullOrWhitespace(value);
            },
            includePath: (value, parent) => {
                if (_.isUndefined(value)) {
                    return {
                        result: true
                    };
                }

                if (!_.isUndefined(parent.targetUrl)) {
                    return {
                        result: false,
                        message: 'Value cannot be specified if targetUrl is specified'
                    };
                }

                return v.validationUtilities.isBoolean(value);
            },
            includeQueryString: (value) => {
                if (_.isUndefined(value)) {
                    return {
                        result: true
                    };
                } else {
                    return v.validationUtilities.isBoolean(value);
                }
            }
        };

        return {
            validations: validations
        };
    },
    webApplicationFirewallConfiguration: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let webApplicationFirewallConfigurationValidations = {
            enabled: v.validationUtilities.isBoolean,
            firewallMode: (value) => {
                return {
                    result: isValidFirewallMode(value),
                    message: `Valid values are ${validFirewallModes.join(',')}`
                };
            },
            ruleSetType: (value) => {
                return {
                    result: isValidRuleSetType(value),
                    message: `Valid values for ruleSetType are ${validRuleSetTypes.join(',')}`
                };
            },
            ruleSetVersion: v.validationUtilities.isNotNullOrWhitespace,
            disabledRuleGroups: disabledRuleGroupsValidations
        };
        return { validations: webApplicationFirewallConfigurationValidations };
    },
    sslPolicy: (value) => {
        if (_.isUndefined(value)) {
            return { result: true };
        }

        let sslPolicyValidations = {
            policyType: (value) => {
                return {
                    result: isValidSslPolicyType(value),
                    message: `Valid values for policyType are ${validSslPolicyTypes.join(',')}`
                };
            },
            policyName: (value, parent) => {
                if (_.isUndefined(value)) {
                    return {
                        result: parent.policyType !== 'Predefined',
                        message: 'policyName must be specified when policyType is Predefined'
                    };
                }
                if (parent.policyType === 'Custom') {
                    return {
                        result: false,
                        message: 'policyName cannot be specified when policyType is Custom'
                    };
                }
                return {
                    result: isValidSslPolicyName(value),
                    message: `Valid values for policyName are ${validSslPolicyNames.join(',')}`
                };
            },
            cipherSuites: (value, parent) => {
                if (_.isUndefined(value)) {
                    return {
                        result: parent.policyType !== 'Custom',
                        message: 'cipherSuites must be specified when policyType is Custom'
                    };
                }
                if (parent.policyType === 'Predefined') {
                    return {
                        result: false,
                        message: 'cipherSuites cannot be specified when policyType is Predefined'
                    };
                }

                let errorMessage = '';
                value.forEach((suite, index) => {
                    if (!isValidSslCipherSuite(suite)) {
                        errorMessage += `Valid values for sslPolicy.cipherSuites[${index}] are ${validApplicationGatewaySslCipherSuites.join(',')}.${os.EOL}`;
                    }
                });

                return {
                    result: errorMessage === '',
                    message: errorMessage
                };
            },
            minProtocolVersion:  (value, parent) => {
                if (_.isUndefined(value)) {
                    return {
                        result: parent.policyType !== 'Custom',
                        message: 'minProtocolVersion must be specified when policyType is Custom'
                    };
                }
                if (parent.policyType === 'Predefined') {
                    return {
                        result: false,
                        message: 'minProtocolVersion cannot be specified when policyType is Predefined'
                    };
                }

                return {
                    result: isValidSslProtocol(value),
                    message: `Valid values for minProtocolVersion are ${validSslProtocols.join(',')}`
                };
            }
        };
        return { validations: sslPolicyValidations };
    }
};

let processProperties = {
    sku: (value, key, parent, properties) => {
        if ((value.tier === 'Standard') || (value.tier === 'WAF')) {
            properties['sku'] = {
                name: `${value.tier}_${value.size}`,
                tier: value.tier,
                capacity: value.capacity
            };
        } else {
            // We are using v2
            properties['sku'] = {
                name: value.tier,
                tier: value.tier
            };
        }
    },
    autoscaleConfiguration: (value, key, parent, properties) => {
        properties['autoscaleConfiguration'] = {
            minCapacity: value.minCapacity,
            maxCapacity: value.maxCapacity
        };
    },
    gatewayIPConfigurations: (value, key, parent, properties) => {
        let gwConfigs = _.map(value, (gwConfig) => {
            return {
                name: gwConfig.name,
                properties: {
                    subnet: {
                        id: resources.resourceId(parent.virtualNetwork.subscriptionId, parent.virtualNetwork.resourceGroupName, 'Microsoft.Network/virtualNetworks/subnets', parent.virtualNetwork.name, gwConfig.subnetName),
                    }
                }
            };
        });
        properties['gatewayIPConfigurations'] = gwConfigs;
    },
    sslCertificates: (value, key, parent, properties) => {
        properties['sslCertificates'] = _.map(value, (certificate) => {
            return {
                name: certificate.name,
                properties: {
                    data: certificate.data,
                    password: certificate.password
                }
            };
        });
    },
    authenticationCertificates: (value, key, parent, properties) => {
        properties['authenticationCertificates'] = _.map(value, (certificate) => {
            return {
                name: certificate.name,
                properties: {
                    data: certificate.data
                }
            };
        });
    },
    frontendIPConfigurations: (value, key, parent, properties) => {
        let feIpConfigs = _.map(value, (config) => {
            if (config.applicationGatewayType === 'Internal') {
                return {
                    name: config.name,
                    properties: {
                        privateIPAllocationMethod: 'Dynamic',
                        subnet: {
                            id: resources.resourceId(parent.virtualNetwork.subscriptionId, parent.virtualNetwork.resourceGroupName, 'Microsoft.Network/virtualNetworks/subnets', parent.virtualNetwork.name, config.internalApplicationGatewaySettings.subnetName),
                        }
                    }
                };
            } else if (config.applicationGatewayType === 'Public') {
                return {
                    name: config.name,
                    properties: {
                        privateIPAllocationMethod: 'Dynamic',
                        publicIPAddress: {
                            id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/publicIPAddresses', config.publicIpAddress.name)
                        }
                    }
                };
            }
        });
        properties['frontendIPConfigurations'] = feIpConfigs;
    },
    frontendPorts: (value, key, parent, properties) => {
        let ports = _.map(value, (port) => {
            return {
                name: port.name,
                properties: {
                    port: port.port
                }
            };
        });
        properties['frontendPorts'] = ports;
    },
    backendAddressPools: (value, key, parent, properties) => {
        let pools = _.map(value, (pool) => {
            let addressPool = {
                name: pool.name,
                properties: {}
            };

            if (!_.isUndefined(pool.backendAddresses) && pool.backendAddresses.length > 0) {
                addressPool.properties.backendAddresses = pool.backendAddresses;
            } else if (!_.isUndefined(pool.backendIPConfigurations) && pool.backendIPConfigurations.length > 0) {
                // TODO: should get the machines dynamically from parent/nameprefix
                addressPool.properties.backendIPConfigurations = pool.backendIPConfigurations;
            }
            return addressPool;
        });
        properties['backendAddressPools'] = pools;
    },
    backendHttpSettingsCollection: (value, key, parent, properties) => {
        let httpSettings = _.map(value, (httpSetting) => {
            let setting = {
                name: httpSetting.name,
                properties: {
                    port: httpSetting.port,
                    protocol: httpSetting.protocol,
                    cookieBasedAffinity: httpSetting.cookieBasedAffinity,
                    pickHostNameFromBackendAddress: httpSetting.pickHostNameFromBackendAddress,
                    probeEnabled: httpSetting.probeEnabled,
                    requestTimeout: httpSetting.requestTimeout,
                    authenticationCertificates: _.map(httpSetting.authenticationCertificateNames, (authenticationCertificateName) => {
                        return {
                            id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/authenticationCertificates', parent.name, authenticationCertificateName)
                        };
                    })
                }
            };
            if (!_.isUndefined(httpSetting.probeName)) {
                setting.properties.probe = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/probes', parent.name, httpSetting.probeName)
                };
            }

            return setting;
        });
        properties['backendHttpSettingsCollection'] = httpSettings;
    },
    httpListeners: (value, key, parent, properties) => {
        let listeners = _.map(value, (listener) => {
            let result = {
                name: listener.name,
                properties: {
                    requireServerNameIndication: listener.requireServerNameIndication,
                    protocol: listener.protocol,
                    frontendIPConfiguration: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/frontendIPConfigurations', parent.name, listener.frontendIPConfigurationName)
                    },
                    frontendPort: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/frontendPorts', parent.name, listener.frontendPortName)
                    }
                }
            };

            if (listener.hostName) {
                result.properties.hostName = listener.hostName;
            }

            if (listener.sslCertificateName) {
                result.properties.sslCertificate = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/sslCertificates', parent.name, listener.sslCertificateName)
                };
            }

            return result;
        });
        properties['httpListeners'] = listeners;
    },
    urlPathMaps: (value, key, parent, properties) => {
        properties['urlPathMaps'] = _.map(value, (map) => {
            let rules = _.map(map.pathRules, (rule) => {
                let result = {
                    name: rule.name,
                    properties: {
                        paths: rule.paths
                    }
                };

                if (rule.redirectConfigurationName) {
                    result.properties.redirectConfiguration = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/redirectConfigurations', parent.name, rule.redirectConfigurationName)
                    };
                } else {
                    result.properties.backendAddressPool = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendAddressPools', parent.name, rule.backendAddressPoolName)
                    };
                    result.properties.backendHttpSettings = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendHttpSettingsCollection', parent.name, rule.backendHttpSettingsName)
                    };
                }

                return result;
            });

            let result = {
                name: map.name,
                properties: {
                    pathRules: rules
                }
            };

            if (map.defaultRedirectConfigurationName) {
                result.properties.defaultRedirectConfiguration = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/redirectConfigurations', parent.name, map.defaultRedirectConfigurationName)
                };
            } else {
                result.properties.defaultBackendAddressPool = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendAddressPools', parent.name, map.defaultBackendAddressPoolName)
                };
                result.properties.defaultBackendHttpSettings = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendHttpSettingsCollection', parent.name, map.defaultBackendHttpSettingsName)
                };
            }

            return result;
        });
    },
    requestRoutingRules: (value, key, parent, properties) => {
        properties['requestRoutingRules'] = _.map(value, (rule) => {
            let routingRule = {
                name: rule.name,
                properties: {
                    ruleType: rule.ruleType,
                    httpListener: {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/httpListeners', parent.name, rule.httpListenerName)
                    }
                }
            };

            if (rule.ruleType === 'Basic') {
                if (rule.redirectConfigurationName) {
                    routingRule.properties.redirectConfiguration = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/redirectConfigurations', parent.name, rule.redirectConfigurationName)
                    };
                } else {
                    routingRule.properties.backendAddressPool = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendAddressPools', parent.name, rule.backendAddressPoolName)
                    };
                    routingRule.properties.backendHttpSettings = {
                        id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/backendHttpSettingsCollection', parent.name, rule.backendHttpSettingsName)
                    };
                }
            } else {
                routingRule.properties.urlPathMap = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/urlPathMaps', parent.name, rule.urlPathMapName)
                };
            }

            return routingRule;
        });
    },
    probes: (value, key, parent, properties) => {
        properties['probes'] = _.map(value, (probe) => {
            return {
                name: probe.name,
                properties: {
                    protocol: probe.protocol,
                    host: probe.host,
                    path: probe.path,
                    interval: probe.interval,
                    timeout: probe.timeout,
                    unhealthyThreshold: probe.unhealthyThreshold,
                    pickHostNameFromBackendHttpSettings: probe.pickHostNameFromBackendHttpSettings,
                    minServers: probe.minServers,
                    match: probe.match
                }
            };
        });
    },
    webApplicationFirewallConfiguration: (value, key, parent, properties) => {
        properties['webApplicationFirewallConfiguration'] = value;
    },
    sslPolicy: (value, key, parent, properties) => {
        properties['sslPolicy'] = value;
    },
    redirectConfigurations: (value, key, parent, properties) => {
        properties['redirectConfigurations'] = _.map(value, (redirect) => {
            let result = {
                name: redirect.name,
                properties: {
                    redirectType: redirect.redirectType
                }
            };

            if (redirect.targetUrl) {
                result.properties.targetUrl = redirect.targetUrl;
            } else if (redirect.targetListenerName) {
                result.properties.targetListener = {
                    id: resources.resourceId(parent.subscriptionId, parent.resourceGroupName, 'Microsoft.Network/applicationGateways/httpListeners', parent.name, redirect.targetListenerName)
                };
                // includePath can only be used with targetListener
                if (!_.isUndefined(redirect.includePath)) {
                    result.properties.includePath = redirect.includePath;
                }
            }

            if (!_.isUndefined(redirect.includeQueryString)) {
                result.properties.includeQueryString = redirect.includeQueryString;
            }
            return result;
        });
    }
};

function transform(param) {
    let accumulator = {};

    let gatewayProperties = _.transform(param, (properties, value, key, obj) => {
        if (typeof processProperties[key] === 'function') {
            processProperties[key](value, key, obj, properties);
        }
        return properties;
    }, {});

    accumulator['applicationGateway'] = [{
        name: param.name,
        resourceGroupName: param.resourceGroupName,
        subscriptionId: param.subscriptionId,
        location: param.location,
        tags: param.tags,
        properties: gatewayProperties,
        zones: param.zones
    }];

    return accumulator;
}

let validate = (settings) => {
    let errors = v.validate({
        settings: settings,
        validations: applicationGatewayValidations
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
        throw new v.ValidationError('ApplicationGateway', buildingBlockErrors);
    }

    let results = merge({
        settings: settings,
        buildingBlockSettings: buildingBlockSettings,
        defaultSettings: defaultSettings
    });

    let errors = validate(results);

    if (errors.length > 0) {
        throw new v.ValidationError('ApplicationGateway', errors);
    }

    let pips = _.flatMap(results, (setting) => {
        return _.map(_.filter(setting.frontendIPConfigurations, (config) => { return !_.isNil(config.publicIpAddress); }), (config) => {
            return config.publicIpAddress;
        });
    });

    pips = publicIpAddressSettings.process({
        settings: pips,
        buildingBlockSettings: buildingBlockSettings
    });

    results = _.transform(results, (result, setting) => {
        let transformed = transform(setting);
        result.applicationGateways = result.applicationGateways.concat(transformed.applicationGateway);
    }, {
        applicationGateways: []
    });

    results.publicIpAddresses = pips.parameters.publicIpAddresses;

    let resourceGroups = resources.extractResourceGroups(
        results.applicationGateways,
        results.publicIpAddresses
    );
    return {
        resourceGroups: resourceGroups,
        parameters: results
    };
}

exports.process = process;
exports.merge = merge;
exports.validations = applicationGatewayValidations;
exports.transform = transform;
