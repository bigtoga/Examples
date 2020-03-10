describe('applicationGatewaySettings:', () => {
    let rewire = require('rewire');
    let applicationGatewaySettings = rewire('../src/core/applicationGatewaySettings.js');
    let v = require('../src/core/validation.js');
    let _ = require('lodash');

    let buildingBlockSettings = {
        subscriptionId: '00000000-0000-1000-8000-000000000000',
        resourceGroupName: 'test-vnet-rg',
        location: 'westus'
    };

    let fixBlockSettingsAfterMerge = (merged) => {
        //TO DO: would be set by VM or scaleSet, must be fixed if appGateway makes it to a stand alone (root) object
        merged.frontendIPConfigurations[0].publicIpAddress.subscriptionId = '00000000-0000-1000-8000-000000000000';
        merged.frontendIPConfigurations[0].publicIpAddress.resourceGroupName = 'test-vnet-rg';
        merged.frontendIPConfigurations[0].publicIpAddress.location = 'westus';
    };

    let testSettings = {
        name: 'test-agw',
        sku: {
            tier: 'Standard',
            size: 'Small',
            capacity: 2
        },
        frontendIPConfigurations: [
            {
                name: 'appGatewayFrontendIP',
                applicationGatewayType: 'Public'
            }
        ],
        httpListeners: [
            {
                name: 'appGatewayHttpListener',
                frontendIPConfigurationName: 'appGatewayFrontendIP',
                frontendPortName: 'appGatewayFrontendPort',
                protocol: 'Http',
                requireServerNameIndication: false
            }
        ],
        backendHttpSettingsCollection: [
            {
                name: 'appGatewayBackendHttpSettings',
                port: 80,
                protocol: 'Https',
                cookieBasedAffinity: 'Disabled',
                pickHostNameFromBackendAddress: false,
                probeEnabled: true,
                requestTimeout: 30,
                probeName: 'p1'
            }
        ],
        backendAddressPools: [
            {
                name: 'appGatewayBackendPool',
                backendAddresses: [
                    {
                        fqdn: 'www.contoso.com'
                    }
                ]
            }
        ],
        urlPathMaps: [
            {
                name: 'pb-rule1',
                defaultBackendAddressPoolName: 'appGatewayBackendPool',
                defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                pathRules: [
                    {
                        name: 'p2',
                        paths: ['/path'],
                        backendAddressPoolName: 'appGatewayBackendPool',
                        backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                    }
                ]
            }
        ],
        requestRoutingRules: [
            {
                name: 'rule1',
                ruleType: 'Basic',
                httpListenerName: 'appGatewayHttpListener',
                backendAddressPoolName: 'appGatewayBackendPool',
                backendHttpSettingsName: 'appGatewayBackendHttpSettings'
            }
        ],
        frontendPorts: [
            {
                name: 'appGatewayFrontendPort',
                port: 80
            }
        ]
    };

    describe('valid validations:', () => {
        it('validate valid defaults are applied.', () => {
            let merged = applicationGatewaySettings.merge({
                settings: [{
                    name: 'test-agw'
                }],
                buildingBlockSettings: buildingBlockSettings
            });

            //fixBlockSettingsAfterMerge(merged);


            let result = v.validate({
                settings: merged,
                validations: applicationGatewaySettings.validations
            });
            expect(result.length).toEqual(0);
        });

        it('sku validations', () => {
            let skuValidations = applicationGatewaySettings.__get__('skuValidations');
            let testSettings = {
                sku: {
                    tier: 'Standard',
                    size: 'Small',
                    capacity: 2
                }
            };
            let result = v.validate({
                settings: testSettings.sku,
                validations: skuValidations
            });
            expect(result.length).toEqual(0);
        });
    });
    describe('validations', () => {
        let skuValidations = applicationGatewaySettings.__get__('skuValidations');

        let mergeAndValidate = (settings, buildingBlockSettings) => {
            let merged = applicationGatewaySettings.merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings
            });
            //TODO: would be set by VM or scaleSet, must be fixed if appGateway makes it to a stand alone (root) object
            //fixBlockSettingsAfterMerge(merged);
            return v.validate({
                settings: merged,
                validations: applicationGatewaySettings.validations
            });
        };
        let settings;
        beforeEach(() => {
            settings = _.cloneDeep(testSettings);
        });

        it('sku tier validation', () => {
            settings.sku.tier = 'invalid';
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[1].name).toEqual('[0].sku.tier');
        });

        it('sku Standard valid size', () => {
            settings.sku.tier = 'Standard';
            settings.sku.size = 'Medium';
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('sku Standard invalid size', () => {
            settings.sku.tier = 'Standard';
            settings.sku.size = 'invalid';
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sku.size');
        });

        it('sku WAF valid size', () => {
            settings.sku.tier = 'WAF';
            settings.sku.size = 'Medium';
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('sku WAF invalid size', () => {
            settings.sku.tier = 'WAF';
            settings.sku.size = 'invalid';
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sku.size');
        });

        it('sku Standard_v2 valid', () => {
            settings.sku.tier = 'Standard_v2';
            delete settings.sku.size;
            delete settings.sku.capacity;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('sku Standard_v2 size specified', () => {
            settings.sku.tier = 'Standard_v2';
            settings.sku.size = 'Small';
            delete settings.sku.capacity;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sku.size');
        });

        it('sku Standard_v2 capacity specified', () => {
            settings.sku.tier = 'Standard_v2';
            delete settings.sku.size;
            settings.sku.capacity = 2;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].sku.capacity');
            expect(result[1].name).toEqual('[0].autoscaleConfiguration');
        });

        it('sku WAF_v2 valid', () => {
            settings.sku.tier = 'WAF_v2';
            delete settings.sku.size;
            delete settings.sku.capacity;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('sku WAF_v2 size specified', () => {
            settings.sku.tier = 'WAF_v2';
            settings.sku.size = 'Small';
            delete settings.sku.capacity;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sku.size');
        });

        it('sku WAF_v2 capacity specified', () => {
            settings.sku.tier = 'WAF_v2';
            delete settings.sku.size;
            settings.sku.capacity = 2;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].sku.capacity');
            expect(result[1].name).toEqual('[0].autoscaleConfiguration');
        });

        it('gatewayIPConfigurations subnet must be provided', () => {
            settings.gatewayIPConfigurations = [ { name: 'appGatewayIpConfig' } ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].gatewayIPConfigurations[0].subnetName');
        });
        it('frontendIPConfigurations cannot have 2 internal', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Internal'
                },
                {
                    name: 'testfec',
                    applicationGatewayType: 'Internal',
                    internalApplicationGatewaySettings: {
                        subnetName: 'biz'
                    }
                }
            ];
            let merged = applicationGatewaySettings.merge({
                settings: [settings],
                buildingBlockSettings: buildingBlockSettings
            });
            let result = v.validate({
                settings: merged,
                validations: applicationGatewaySettings.validations
            });
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendIPConfigurations');
        });
        it('frontendIPConfigurations cannot have 2 public', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public'
                },
                {
                    name: 'testfec',
                    applicationGatewayType: 'Public'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendIPConfigurations');
        });
        it('frontendIPConfigurations cannot have more than 2', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public'
                },
                {
                    name: 'testfec',
                    applicationGatewayType: 'Internal',
                    internalApplicationGatewaySettings: {
                        subnetName: 'biz'
                    }
                },
                {
                    name: 'sdfdsf',
                    applicationGatewayType: 'Public'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendIPConfigurations');
        });
        it('valid frontendIPConfigurations', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public'
                },
                {
                    name: 'testfec',
                    applicationGatewayType: 'Internal',
                    internalApplicationGatewaySettings: {
                        subnetName: 'biz'
                    }
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('frontendIPConfigurations can have only one internal', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Internal',
                    internalApplicationGatewaySettings: {
                        subnetName: 'biz'
                    }
                }
            ];
            let merged = applicationGatewaySettings.merge({
                settings: [settings],
                buildingBlockSettings: buildingBlockSettings
            });
            let result = v.validate({
                settings: merged,
                validations: applicationGatewaySettings.validations
            });
            expect(result.length).toEqual(0);
        });
        it('frontendIPConfigurations can have only one public', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('frontendIPConfigurations internalApplicationGatewaySettings cannot be specified if type is not Internal', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public',
                    internalApplicationGatewaySettings: {
                        subnetName: 'biz'
                    }
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendIPConfigurations[0].internalApplicationGatewaySettings');
        });
        it('frontendIPConfigurations internalApplicationGatewaySettings must be specified if type is Internal', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Internal'
                }
            ];
            let merged = applicationGatewaySettings.merge({
                settings: [settings],
                buildingBlockSettings: buildingBlockSettings
            });
            let result = v.validate({
                settings: merged,
                validations: applicationGatewaySettings.validations
            });
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendIPConfigurations[0].internalApplicationGatewaySettings');
        });

        it('valid frontendPorts', () => {
            settings.frontendPorts = [
                {
                    name: 'appGatewayFrontendPort',
                    port: 80
                },
                {
                    name: 'list1-http1',
                    port: 81
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('frontendPorts port must be between 0 and 65535', () => {
            settings.frontendPorts = [
                {
                    name: 'appGatewayFrontendPort',
                    port: 187569
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].frontendPorts[0].port');
        });
        it('valid backendHttpSettingsCollection port must be between 0 and 65535', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 80,
                    protocol: 'Http',
                    cookieBasedAffinity: 'Disabled',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: true,
                    requestTimeout: 30,
                    probeName: 'p1'
                },
                {
                    name: 'test-settings',
                    port: 80,
                    protocol: 'Http',
                    cookieBasedAffinity: 'Enabled',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: true,
                    requestTimeout: 20,
                    probeName: 'p2'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('backendHttpSettingsCollection port must be between 0 and 65535', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 800234,
                    protocol: 'Http',
                    cookieBasedAffinity: 'Disabled',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: true,
                    requestTimeout: 30,
                    probeName: 'p1'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendHttpSettingsCollection[0].port');
        });
        it('backendHttpSettingsCollection protocol must be Http or Https', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 80,
                    protocol: 'invalid',
                    cookieBasedAffinity: 'Disabled',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: true,
                    requestTimeout: 30,
                    probeName: 'p1'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendHttpSettingsCollection[0].protocol');
        });
        it('backendHttpSettingsCollection probeEnabled must be boolean', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 80,
                    protocol: 'Https',
                    cookieBasedAffinity: 'Disabled',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: 'invalid',
                    requestTimeout: 30,
                    probeName: 'p1'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendHttpSettingsCollection[0].probeEnabled');
        });
        it('backendHttpSettingsCollection probeEnabled must be boolean', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 80,
                    protocol: 'Https',
                    cookieBasedAffinity: 'Disabled',
                    pickHostNameFromBackendAddress: 'invalid',
                    probeEnabled: true,
                    requestTimeout: 30,
                    probeName: 'p1'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendHttpSettingsCollection[0].pickHostNameFromBackendAddress');
        });
        it('backendHttpSettingsCollection cookieBasedAffinity must be enabled or disabled', () => {
            settings.backendHttpSettingsCollection = [
                {
                    name: 'appGatewayBackendHttpSettings',
                    port: 80,
                    protocol: 'Https',
                    cookieBasedAffinity: 'invalid',
                    pickHostNameFromBackendAddress: false,
                    probeEnabled: true,
                    requestTimeout: 30,
                    probeName: 'p1'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendHttpSettingsCollection[0].cookieBasedAffinity');
        });

        it('valid httpListeners', () => {
            settings.httpListeners = [
                {
                    name: 'appGatewayHttpListener',
                    frontendIPConfigurationName: 'appGatewayFrontendIP',
                    frontendPortName: 'appGatewayFrontendPort',
                    protocol: 'Http',
                    requireServerNameIndication: false
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('httpListeners frontendIPConfigurationName must match one in frontendIPConfigurations', () => {
            settings.frontendIPConfigurations = [
                {
                    name: 'appGatewayFrontendIP',
                    applicationGatewayType: 'Public'
                }
            ];
            settings.httpListeners = [
                {
                    name: 'appGatewayHttpListener',
                    frontendIPConfigurationName: 'invalid',
                    frontendPortName: 'appGatewayFrontendPort',
                    protocol: 'Http',
                    requireServerNameIndication: false
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].httpListeners[0].frontendIPConfigurationName');
        });
        it('httpListeners frontendPortName must match one in frontendPorts', () => {
            settings.httpListeners = [
                {
                    name: 'appGatewayHttpListener',
                    frontendIPConfigurationName: 'appGatewayFrontendIP',
                    frontendPortName: 'invalid',
                    protocol: 'Http',
                    requireServerNameIndication: false
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].httpListeners[0].frontendPortName');
        });
        it('httpListeners requireServerNameIndication must be boolean', () => {
            settings.httpListeners = [
                {
                    name: 'appGatewayHttpListener',
                    frontendIPConfigurationName: 'appGatewayFrontendIP',
                    frontendPortName: 'appGatewayFrontendPort',
                    protocol: 'Http',
                    requireServerNameIndication: 'invalid'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].httpListeners[0].requireServerNameIndication');
        });
        it('httpListeners protocol must be Http or Https', () => {
            settings.httpListeners = [
                {
                    name: 'appGatewayHttpListener',
                    frontendIPConfigurationName: 'appGatewayFrontendIP',
                    frontendPortName: 'appGatewayFrontendPort',
                    protocol: 'invalid',
                    requireServerNameIndication: false
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].httpListeners[0].protocol');
        });

        it('urlPathMaps valid settings', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('urlPathMaps invalid defaultBackendAddressPoolName', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'invalid',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].defaultBackendAddressPoolName');
        });
        it('urlPathMaps invalid defaultBackendHttpSettingsName', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'invalid',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].defaultBackendHttpSettingsName');
        });
        it('urlPathMaps invalid backendAddressPoolName', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            backendAddressPoolName: 'invalid',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules[0].backendAddressPoolName');
        });
        it('urlPathMaps invalid backendHttpSettingsName', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'invalid'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules[0].backendHttpSettingsName');
        });
        it('urlPathMaps pathRules cannot be undefined', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules');
        });
        it('urlPathMaps pathRules cannot be empty', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: []
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules');
        });
        it('urlPathMaps paths cannot be undefined', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules');
        });
        it('urlPathMaps at leas one path must be specified', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [],
                            backendAddressPoolName: 'appGatewayBackendPool',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules');
        });
        it('valid requestRoutingRules', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'appGatewayBackendPool',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('valid redirect requestRoutingRules', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    redirectConfigurationName: 'appGatewayRedirect',
                    httpListenerName: 'appGatewayHttpListener'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('requestRoutingRules name must be specified', () => {
            settings.requestRoutingRules = [
                {
                    ruleType: 'Basic',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'appGatewayBackendPool',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].name');
        });
        it('requestRoutingRules a valid httpListenerName must be specified', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    httpListenerName: 'invalid',
                    backendAddressPoolName: 'appGatewayBackendPool',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].httpListenerName');
        });
        it('requestRoutingRules a valid backendAddressPoolName must be specified when type is Basic', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'invalid',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendAddressPoolName');
        });
        it('requestRoutingRules a valid backendHttpSettingsName must be specified when type is Basic', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'appGatewayBackendPool',
                    backendHttpSettingsName: 'invalid'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendHttpSettingsName');
        });
        it('requestRoutingRules ruleType must be Basic or PathBasedRouting', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'invalid',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'appGatewayBackendPool',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].ruleType');
        });
        it('requestRoutingRules when ruleType is PathBasedRouting urlPathMapName must be specified', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'PathBasedRouting',
                    httpListenerName: 'appGatewayHttpListener'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].urlPathMapName');
        });

        it('requestRoutingRules when ruleType is PathBasedRouting urlPathMaps must be specified', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'PathBasedRouting',
                    httpListenerName: 'appGatewayHttpListener',
                    urlPathMapName: 'foo'
                }
            ];
            delete settings.urlPathMaps;
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].ruleType');
        });
        it('requestRoutingRules when ruleType is PathBasedRouting urlPathMaps must be at least one', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'PathBasedRouting',
                    httpListenerName: 'appGatewayHttpListener',
                    urlPathMapName: 'foo'
                }
            ];
            settings.urlPathMaps = [];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].ruleType');
        });
        it('requestRoutingRules when ruleType is PathBasedRouting backendAddressPoolName cannot be specified', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'PathBasedRouting',
                    httpListenerName: 'appGatewayHttpListener',
                    urlPathMapName: 'pb-rule1',
                    backendAddressPoolName: 'appGatewayBackendPool'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendAddressPoolName');
        });
        it('requestRoutingRules when ruleType is PathBasedRouting backendHttpSettingsName cannot be specified', () => {
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'PathBasedRouting',
                    httpListenerName: 'appGatewayHttpListener',
                    urlPathMapName: 'pb-rule1',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendHttpSettingsName');
        });
        it('requestRoutingRules invalid redirectConfigurationName', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    redirectConfigurationName: 'invalid',
                    httpListenerName: 'appGatewayHttpListener'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].redirectConfigurationName');
        });
        it('requestRoutingRules backendAddressPoolName and redirectConfigurationName cannot be both specified', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    redirectConfigurationName: 'appGatewayRedirect',
                    httpListenerName: 'appGatewayHttpListener',
                    backendAddressPoolName: 'appGatewayBackendPool'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendAddressPoolName');
        });
        it('requestRoutingRules backendHttpSettingsName and redirectConfigurationName cannot be both specified', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    redirectConfigurationName: 'appGatewayRedirect',
                    httpListenerName: 'appGatewayHttpListener',
                    backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].requestRoutingRules[0].backendHttpSettingsName');
        });

        it('valid probes', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 30,
                    timeout: 30,
                    unhealthyThreshold: 3,
                    pickHostNameFromBackendHttpSettings: false,
                    match: {
                        statusCodes: ['200', '200-339']
                    }
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('valid probes without match', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 30,
                    timeout: 30,
                    unhealthyThreshold: 3,
                    pickHostNameFromBackendHttpSettings: false
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('probes must have a name', () => {
            settings.probes = [
                {
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 30,
                    timeout: 30,
                    unhealthyThreshold: 3,
                    pickHostNameFromBackendHttpSettings: false
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].name');
        });
        it('probes protocol must be Http or Https', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'invalid',
                    host: 'contoso.com',
                    path: '/',
                    interval: 30,
                    timeout: 30,
                    unhealthyThreshold: 3
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].protocol');
        });
        it('probes path must start with /', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: 'foo/',
                    interval: 30,
                    timeout: 30,
                    unhealthyThreshold: 3
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].path');
        });
        it('probes interval must be between 1 and 86400', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 864999,
                    timeout: 30,
                    unhealthyThreshold: 3
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].interval');
        });
        it('probes timeout must be between 1 and 86400', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 1,
                    timeout: 0,
                    unhealthyThreshold: 3
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].timeout');
        });
        it('probes unhealthyThreshold must be between 1 and 20', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 5,
                    timeout: 30,
                    unhealthyThreshold: 21
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].unhealthyThreshold');
        });
        it('probes match statusCodes must be a valid status code or range', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 5,
                    timeout: 30,
                    unhealthyThreshold: 1,
                    match: {
                        statusCodes: ['invalid', '200']
                    }
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].match.statusCodes');
        });
        it('probes minServers cannot be NaN', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 5,
                    timeout: 30,
                    unhealthyThreshold: 1,
                    minServers: 1/0
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].minServers');
        });
        it('probes minServers must be equal or greater than 0', () => {
            settings.probes = [
                {
                    name: 'p1',
                    protocol: 'Http',
                    host: 'contoso.com',
                    path: '/',
                    interval: 5,
                    timeout: 30,
                    unhealthyThreshold: 1,
                    minServers: -1
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].probes[0].minServers');
        });

        it('valid webApplicationFirewallConfiguration', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: false,
                    firewallMode: 'Prevention',
                    ruleSetType: 'OWASP',
                    ruleSetVersion: '3.0',
                    disabledRuleGroups: []
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('webApplicationFirewallConfiguration enabled must be boolean', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: 'invalid',
                    firewallMode: 'Prevention',
                    ruleSetType: 'OWASP',
                    ruleSetVersion: '3.0',
                    disabledRuleGroups: []
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].webApplicationFirewallConfiguration[0].enabled');
        });
        it('webApplicationFirewallConfiguration firewallMode must be Detection or Prevention', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'invalid',
                    ruleSetType: 'OWASP',
                    ruleSetVersion: '3.0',
                    disabledRuleGroups: []
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].webApplicationFirewallConfiguration[0].firewallMode');
        });
        it('webApplicationFirewallConfiguration ruleSetType must be OWASP', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'invalid',
                    ruleSetVersion: '3.0'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].webApplicationFirewallConfiguration[0].ruleSetType');
        });
        it('webApplicationFirewallConfiguration ruleSetVersion takes default when not specified', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'OWASP',
                    disabledRuleGroups: []
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('valid webApplicationFirewallConfiguration disabledRuleGroups', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'OWASP',
                    disabledRuleGroups: [
                        {
                            ruleGroupName: 'rule1',
                            rules: [1,3]
                        }
                    ]
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('webApplicationFirewallConfiguration disabledRuleGroups rules can be undefined', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'OWASP',
                    disabledRuleGroups: [
                        {
                            ruleGroupName: 'rule1'
                        }
                    ]
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('webApplicationFirewallConfiguration disabledRuleGroups rules can be empty', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'OWASP',
                    disabledRuleGroups: [
                        {
                            ruleGroupName: 'rule1',
                            rules: []
                        }
                    ]
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('webApplicationFirewallConfiguration disabledRuleGroups ruleGroupName must be specified', () => {
            settings.webApplicationFirewallConfiguration = [
                {
                    enabled: true,
                    firewallMode: 'Detection',
                    ruleSetType: 'OWASP',
                    disabledRuleGroups: [
                        {
                            rules: [1,2,3]
                        }
                    ]
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].webApplicationFirewallConfiguration[0].disabledRuleGroups');
        });

        it('valid Predefined sslPolicy', () => {
            settings.sslPolicy = {
                policyType: 'Predefined',
                policyName: 'AppGwSslPolicy20150501'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('valid Custom sslPolicy', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384', 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('sslPolicy type must be Predefined or Custom', () => {
            settings.sslPolicy = {
                policyType: 'invalid',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384', 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length > 0).toEqual(true);
            expect(result[0].name).toEqual('[0].sslPolicy.policyType');
        });
        it('sslPolicy cipherSuites must be valid', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                cipherSuites: ['invalid', 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.cipherSuites');
        });
        it('sslPolicy minProtocolVersion must be any of TLSv1_0, TLSv1_1 or TLSv1_2', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'invalid'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.minProtocolVersion');
        });
        it('sslPolicy cipherSuites cannot be undefined when type is custom', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.cipherSuites');
        });
        it('sslPolicy minProtocolVersion cannot be undefined when type is custom', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA']
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.minProtocolVersion');
        });
        it('sslPolicy policyName cannot be specified when type is Custom', () => {
            settings.sslPolicy = {
                policyType: 'Custom',
                policyName: 'AppGwSslPolicy20150501',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.policyName');
        });
        it('sslPolicy policyName cannot be undefined when type is Predefined', () => {
            settings.sslPolicy = {
                policyType: 'Predefined'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.policyName');
        });
        it('sslPolicy policyName must be valid', () => {
            settings.sslPolicy = {
                policyType: 'Predefined',
                policyName: 'invalid'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslPolicy.policyName');
        });
        it('sslPolicy cipherSuites and minProtocolVersion cannot be specified when type is Predefined', () => {
            settings.sslPolicy = {
                policyType: 'Predefined',
                policyName: 'AppGwSslPolicy20150501',
                cipherSuites: ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
                minProtocolVersion: 'TLSv1_1'
            };
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].sslPolicy.cipherSuites');
            expect(result[1].name).toEqual('[0].sslPolicy.minProtocolVersion');
        });

        it('backendAddressPools valid backendAddresses', () => {
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('backendAddressPools backendAddresses cannot specify both fqdn and ipAddress', () => {
            settings.backendAddressPools[0].backendAddresses = [
                {
                    fqdn: 'www.contoso.com',
                    ipAddress: '200.10.1.1'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].backendAddressPools[0].backendAddresses[0].fqdn');
        });
        it('backendAddressPools backendAddresses fqdn cannot be empty', () => {
            settings.backendAddressPools[0].backendAddresses = [
                {
                    fqdn: ' '
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendAddressPools[0].backendAddresses[0].fqdn');
        });
        it('backendAddressPools backendAddresses ipAddress cannot be empty', () => {
            settings.backendAddressPools[0].backendAddresses = [
                {
                    ipAddress: ' '
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].backendAddressPools[0].backendAddresses[0].ipAddress');
        });
        it('backendAddressPools backendAddresses must specify fqdn or ipAddress', () => {
            settings.backendAddressPools[0].backendAddresses = [
                {
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].backendAddressPools[0].backendAddresses[0].fqdn');
            expect(result[1].name).toEqual('[0].backendAddressPools[0].backendAddresses[0].ipAddress');
        });

        it('sslCertificates name must be provided', () => {
            settings.sslCertificates = [
                {
                    data: 'asadasdsad',
                    password: 'dfsf34tghdgSDFdsf*'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslCertificates[0].name');
        });
        it('sslCertificates data must be provided', () => {
            settings.sslCertificates = [
                {
                    name: 'asadasdsad',
                    password: 'dfsf34tghdgSDFdsf*'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslCertificates[0].data');
        });
        it('sslCertificates password must be provided', () => {
            settings.sslCertificates = [
                {
                    name: 'asadasdsad',
                    data: 'dfsf34tghdgSDFdsf*'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].sslCertificates[0].password');
        });
        it('valid sslCertificates', () => {
            settings.sslCertificates = [
                {
                    name: 'asadasdsad',
                    data: 'dfsf34tghdgSDFdsf*',
                    password: 'asdasdsa43534534SDSFDSD*'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('authenticationCertificates name must be provided', () => {
            settings.authenticationCertificates = [
                {
                    data: 'asadasdsad'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].authenticationCertificates[0].name');
        });
        it('authenticationCertificates data must be provided', () => {
            settings.authenticationCertificates = [
                {
                    name: 'asadasdsad'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].authenticationCertificates[0].data');
        });
        it('valid authenticationCertificates', () => {
            settings.authenticationCertificates = [
                {
                    name: 'asadasdsad',
                    data: 'adsadsadasdas23434jhbtihi34'
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });

        it('valid redirectConfigurations with targetUrl', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('valid redirectConfigurations with targetListenerName', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetListenerName: 'foo',
                    includePath: true,
                    includeQueryString: false
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(0);
        });
        it('redirectConfigurations targetUrl and targetListenerName cannot be both specified', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    targetListenerName: 'foo',
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].redirectConfigurations[0].targetUrl');
        });
        it('redirectConfigurations targetUrl or targetListenerName must be specified', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('[0].redirectConfigurations[0].targetUrl');
        });
        it('redirectConfigurations includePath cannot be specified with targetUrl', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includePath: false,
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(2);
            expect(result[1].name).toEqual('[0].redirectConfigurations[0].includePath');
        });
        it('redirectConfigurations invalid redirect type', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'invalid',
                    targetUrl: 'contoso.com',
                    includePath: false,
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[0].name).toEqual('[0].redirectConfigurations[0].redirectType');
        });
        it('redirectConfigurations name must be specified', () => {
            settings.redirectConfigurations = [
                {
                    redirectType: 'Temporary',
                    targetUrl: 'contoso.com',
                    includePath: false,
                    includeQueryString: true
                }
            ];
            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[0].name).toEqual('[0].redirectConfigurations[0].name');
        });
        it('urlPathMaps invalid defaultRedirectConfigurationName', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultRedirectConfigurationName: 'invalid',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'appGatewayRedirect'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].defaultRedirectConfigurationName');
        });
        it('urlPathMaps defaultRedirectConfigurationName and defaultBackendAddressPoolName cannot be both specified', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendAddressPoolName: 'appGatewayBackendPool',
                    defaultRedirectConfigurationName: 'appGatewayRedirect',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'appGatewayRedirect'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[1].name).toEqual('[0].urlPathMaps[0].defaultRedirectConfigurationName');
        });
        it('urlPathMaps defaultRedirectConfigurationName and defaultBackendHttpSettingsName cannot be both specified', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                    defaultRedirectConfigurationName: 'appGatewayRedirect',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'appGatewayRedirect'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[1].name).toEqual('[0].urlPathMaps[0].defaultRedirectConfigurationName');
        });
        it('urlPathMaps invalid redirectConfigurationName', () => {
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultRedirectConfigurationName: 'appGatewayRedirect',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'invalid'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('[0].urlPathMaps[0].pathRules[0].redirectConfigurationName');
        });
        it('urlPathMaps redirectConfigurationName and backendAddressPoolName cannot be both specified', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultRedirectConfigurationName: 'appGatewayRedirect',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'appGatewayRedirect',
                            backendAddressPoolName: 'appGatewayBackendPool'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[2].name).toEqual('[0].urlPathMaps[0].pathRules[0].redirectConfigurationName');
        });
        it('urlPathMaps defaultRedirectConfigurationName and backendHttpSettingsName cannot be both specified', () => {
            settings.urlPathMaps = [
                {
                    name: 'pb-rule1',
                    defaultRedirectConfigurationName: 'appGatewayRedirect',
                    pathRules: [
                        {
                            name: 'p2',
                            paths: [
                                '/bar'
                            ],
                            redirectConfigurationName: 'appGatewayRedirect',
                            backendHttpSettingsName: 'appGatewayBackendHttpSettings'
                        }
                    ]
                }
            ];

            let result = mergeAndValidate([settings], buildingBlockSettings);
            expect(result.length).toEqual(3);
            expect(result[2].name).toEqual('[0].urlPathMaps[0].pathRules[0].redirectConfigurationName');
        });

    });

    if (jasmine.testConfiguration.runTransform) {
        describe('process:', () => {

            let settings = _.cloneDeep(testSettings);
            settings.subscriptionId = '00000000-0000-1000-8000-000000000000';
            settings.resourceGroupName = 'test-vnet-rg';
            settings.location = 'westus';
            settings.sslCertificates = [
                {
                    name: 'ssltest',
                    data: 'sadasdsdasdsdc34r43r34nt34nr4jkrn4k3jrn34kjrn',
                    password: 'sadasd32d23d'
                }
            ];
            settings.authenticationCertificates = [
                {
                    name: 'authtest',
                    data: 'sadasdsdasdsdc34r43r34nt34nr4jkrn4k3jrn34kjrn'
                }
            ];
            settings.sslPolicy = {
                policyType: 'Predefined',
                policyName: 'AppGwSslPolicy20150501'
            };
            settings.redirectConfigurations = [
                {
                    name: 'appGatewayRedirect',
                    redirectType: 'Permanent',
                    targetUrl: 'contoso.com',
                    includeQueryString: true
                }
            ];
            settings.requestRoutingRules = [
                {
                    name: 'rule1',
                    ruleType: 'Basic',
                    redirectConfigurationName: 'appGatewayRedirect',
                    httpListenerName: 'appGatewayHttpListener'
                }
            ];
            it('valid process', () => {
                let merged = applicationGatewaySettings.merge({
                    settings: [settings],
                    buildingBlockSettings: buildingBlockSettings
                });
                //fixBlockSettingsAfterMerge(merged);
                let result = applicationGatewaySettings.transform(merged);
                expect(result !== null).toEqual(true);
            });
        });
    }
});