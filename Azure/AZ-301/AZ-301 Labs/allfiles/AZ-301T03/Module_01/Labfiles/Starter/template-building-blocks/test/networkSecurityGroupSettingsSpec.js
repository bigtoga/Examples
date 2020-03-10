describe('networkSecurityGroupSettings', () => {
    let rewire = require('rewire');
    let _ = require('lodash');
    let nsgSettings = rewire('../src/core/networkSecurityGroupSettings.js');
    let validation = require('../src/core/validation.js');

    describe('isValidProtocol', () => {
        let isValidProtocol = nsgSettings.__get__('isValidProtocol');

        it('undefined', () => {
            expect(isValidProtocol()).toEqual(false);
        });

        it('null', () => {
            expect(isValidProtocol(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidProtocol('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidProtocol(' ')).toEqual(false);
        });

        it('invalid spacing', () => {
            expect(isValidProtocol(' TCP ')).toEqual(false);
        });

        it('invalid casing', () => {
            expect(isValidProtocol('tcp')).toEqual(false);
        });

        it('invalid value', () => {
            expect(isValidProtocol('NOT_A_VALID_PROTOCOL')).toEqual(false);
        });

        it('TCP', () => {
            expect(isValidProtocol('TCP')).toEqual(true);
        });

        it('UDP', () => {
            expect(isValidProtocol('UDP')).toEqual(true);
        });

        it('*', () => {
            expect(isValidProtocol('*')).toEqual(true);
        });
    });

    describe('isValidAddressPrefix', () => {
        let isValidAddressPrefix = nsgSettings.__get__('isValidAddressPrefix');

        it('undefined', () => {
            expect(isValidAddressPrefix()).toEqual(false);
        });

        it('null', () => {
            expect(isValidAddressPrefix(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidAddressPrefix('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidAddressPrefix(' ')).toEqual(false);
        });

        it('invalid spacing', () => {
            expect(isValidAddressPrefix(' 127.0.0.1 ')).toEqual(false);
        });

        it('invalid casing', () => {
            expect(isValidAddressPrefix('virtualnetwork')).toEqual(false);
        });

        it('invalid value', () => {
            expect(isValidAddressPrefix('NOT_A_VALID_ADDRESS_PREFIX')).toEqual(false);
        });

        it('invalid IP Address', () => {
            expect(isValidAddressPrefix('127.0.0')).toEqual(false);
        });

        it('invalid CIDR', () => {
            expect(isValidAddressPrefix('127.0.0.1/33')).toEqual(false);
        });

        it('IP Address', () => {
            expect(isValidAddressPrefix('127.0.0.1')).toEqual(true);
        });

        it('CIDR', () => {
            expect(isValidAddressPrefix('127.0.0.1/29')).toEqual(true);
        });

        it('VirtualNetwork', () => {
            expect(isValidAddressPrefix('VirtualNetwork')).toEqual(true);
        });

        it('AzureLoadBalancer', () => {
            expect(isValidAddressPrefix('AzureLoadBalancer')).toEqual(true);
        });

        it('Internet', () => {
            expect(isValidAddressPrefix('Internet')).toEqual(true);
        });

        it('*', () => {
            expect(isValidAddressPrefix('*')).toEqual(true);
        });
    });

    describe('isValidDirection', () => {
        let isValidDirection = nsgSettings.__get__('isValidDirection');

        it('undefined', () => {
            expect(isValidDirection()).toEqual(false);
        });

        it('null', () => {
            expect(isValidDirection(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidDirection('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidDirection(' ')).toEqual(false);
        });

        it('invalid spacing', () => {
            expect(isValidDirection(' Inbound ')).toEqual(false);
        });

        it('invalid casing', () => {
            expect(isValidDirection('inbound')).toEqual(false);
        });

        it('invalid value', () => {
            expect(isValidDirection('NOT_A_VALID_DIRECTION')).toEqual(false);
        });

        it('Inbound', () => {
            expect(isValidDirection('Inbound')).toEqual(true);
        });

        it('Outbound', () => {
            expect(isValidDirection('Outbound')).toEqual(true);
        });
    });

    describe('isValidPriority', () => {
        let isValidPriority = nsgSettings.__get__('isValidPriority');

        it('undefined', () => {
            expect(isValidPriority()).toEqual(false);
        });

        it('null', () => {
            expect(isValidPriority(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidPriority('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidPriority(' ')).toEqual(false);
        });

        it('too low', () => {
            expect(isValidPriority(99)).toEqual(false);
        });

        it('too high', () => {
            expect(isValidPriority(4097)).toEqual(false);
        });

        it('low', () => {
            expect(isValidPriority(100)).toEqual(true);
        });

        it('high', () => {
            expect(isValidPriority(4096)).toEqual(true);
        });

        it('string', () => {
            expect(isValidPriority('100')).toEqual(true);
        });

        it('string with spacing', () => {
            expect(isValidPriority(' 100 ')).toEqual(true);
        });
    });

    describe('isValidAccess', () => {
        let isValidAccess = nsgSettings.__get__('isValidAccess');

        it('undefined', () => {
            expect(isValidAccess()).toEqual(false);
        });

        it('null', () => {
            expect(isValidAccess(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidAccess('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidAccess(' ')).toEqual(false);
        });

        it('invalid spacing', () => {
            expect(isValidAccess(' Allow ')).toEqual(false);
        });

        it('invalid casing', () => {
            expect(isValidAccess('allow')).toEqual(false);
        });

        it('invalid value', () => {
            expect(isValidAccess('NOT_A_VALID_ACCESS')).toEqual(false);
        });

        it('Allow', () => {
            expect(isValidAccess('Allow')).toEqual(true);
        });

        it('Deny', () => {
            expect(isValidAccess('Deny')).toEqual(true);
        });
    });

    describe('validations', () => {
        let nsgSettingsValidations = nsgSettings.__get__('networkSecurityGroupSettingsValidations');

        describe('networkInterfaceValidations', () => {
            let networkInterfaceValidations = nsgSettingsValidations.networkInterfaces;
            let networkInterfaceSettings = [
                {
                    name: 'my-nic1'
                },
                {
                    name: 'my-nic2'
                }
            ];

            it('empty array', () => {
                let errors = validation.validate({
                    settings: [],
                    validations: networkInterfaceValidations
                });

                expect(errors.length).toEqual(0);
            });

            describe('', () => {
                let settings;
                beforeEach(() => {
                    settings = _.cloneDeep(networkInterfaceSettings);
                });
                it('name undefined', () => {
                    delete settings[0].name;

                    let errors = validation.validate({
                        settings: settings,
                        validations: networkInterfaceValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].name');
                });

                it('name null', () => {
                    settings[0].name = null;

                    let errors = validation.validate({
                        settings: settings,
                        validations: networkInterfaceValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].name');
                });

                it('name empty', () => {
                    settings[0].name = '';

                    let errors = validation.validate({
                        settings: settings,
                        validations: networkInterfaceValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].name');
                });
            });
        });

        describe('virtualNetworkValidations', () => {
            let virtualNetworkValidations = nsgSettingsValidations.virtualNetworks;
            let virtualNetworkSettings = [
                {
                    name: 'my-virtual-network',
                    subnets: ['web', 'biz']
                }
            ];

            it('empty array', () => {
                let errors = validation.validate({
                    settings: [],
                    validations: virtualNetworkValidations
                });

                expect(errors.length).toEqual(0);
            });

            describe('', () => {
                let settings;
                beforeEach(() => {
                    settings = _.cloneDeep(virtualNetworkSettings);
                });

                it('name undefined', () => {
                    delete settings[0].name;

                    let errors = validation.validate({
                        settings: settings,
                        validations: virtualNetworkValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].name');
                });

                it('subnets undefined', () => {
                    delete settings[0].subnets;

                    let errors = validation.validate({
                        settings: settings,
                        validations: virtualNetworkValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].subnets');
                });

                it('subnets empty', () => {
                    settings[0].subnets = [];

                    let errors = validation.validate({
                        settings: settings,
                        validations: virtualNetworkValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].subnets');
                });

                it('subnets empty string', () => {
                    settings[0].subnets = [''];

                    let errors = validation.validate({
                        settings: settings,
                        validations: virtualNetworkValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].subnets[0]');
                });
            });
        });

        describe('securityRulesValidations', () => {
            let securityRulesValidations = nsgSettingsValidations.securityRules;

            let valid = [
                {
                    name: 'rule1',
                    direction: 'Inbound',
                    priority: 100,
                    sourceAddressPrefix: '192.168.1.1',
                    destinationAddressPrefix: '*',
                    sourcePortRange: '*',
                    destinationPortRange: '*',
                    access: 'Allow',
                    protocol: '*'
                }
            ];

            it('empty array', () => {
                let errors = validation.validate({
                    settings: [],
                    validations: securityRulesValidations
                });

                expect(errors.length).toEqual(0);
            });

            describe('', () => {
                let invalid;
                beforeEach(() => {
                    invalid = _.cloneDeep(valid);
                });
                it('name undefined', () => {
                    delete invalid[0].name;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].name');
                });

                it('direction undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].direction;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].direction');
                });

                it('priority undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].priority;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].priority');
                });

                it('sourceAddressPrefix undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].sourceAddressPrefix;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].sourceAddressPrefix');
                });

                it('destinationAddressPrefix undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].destinationAddressPrefix;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].destinationAddressPrefix');
                });

                it('sourcePortRange undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].sourcePortRange;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].sourcePortRange');
                });

                it('destinationPortRange undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].destinationPortRange;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].destinationPortRange');
                });

                it('access undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].access;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].access');
                });

                it('protocol undefined', () => {
                    let invalid = _.cloneDeep(valid);
                    delete invalid[0].protocol;
                    let errors = validation.validate({
                        settings: invalid,
                        validations: securityRulesValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('[0].protocol');
                });
            });
        });
    });

    describe('merge', () => {
        let merge = nsgSettings.__get__('merge');

        let networkSecurityGroup = [
            {
                name: 'test-nsg',
                virtualNetworks: [
                    {
                        name: 'my-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ],
                networkInterfaces: [
                    {
                        name: 'my-nic1'
                    }
                ],
                securityRules: [
                    {
                        name: 'rule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '192.168.1.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }
        ];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-rg'
        };

        let settings;
        beforeEach(() => {
            settings = _.cloneDeep(networkSecurityGroup);
        });

        it('virtualNetworks undefined', () => {
            delete settings[0].virtualNetworks;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].virtualNetworks.length).toBe(0);
        });

        it('virtualNetworks null', () => {
            settings[0].virtualNetworks = null;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].virtualNetworks.length).toBe(0);
        });

        it('virtualNetworks present', () => {
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].virtualNetworks[0].name).toBe('my-virtual-network');
        });

        it('networkInterfaces undefined', () => {
            delete settings[0].networkInterfaces;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].networkInterfaces.length).toBe(0);
        });

        it('networkInterfaces null', () => {
            settings[0].networkInterfaces = null;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].networkInterfaces.length).toBe(0);
        });

        it('networkInterfaces present', () => {
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].networkInterfaces[0].name).toBe('my-nic1');
        });

        it('securityRules undefined', () => {
            delete settings[0].securityRules;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].securityRules.length).toBe(0);
        });

        it('securityRules null', () => {
            settings[0].securityRules = null;
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].securityRules.length).toBe(0);
        });

        it('securityRules present', () => {
            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].securityRules[0].name).toBe('rule1');
        });

        it('named security rule', () => {
            let securityRuleName = 'ActiveDirectory';
            let namedSecurityRule = nsgSettings.__get__('namedSecurityRules')[securityRuleName];

            settings[0].securityRules.push({
                name: securityRuleName
            });

            settings[0].securityRules.push({
                name: 'rule2',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.2.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });

            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].securityRules.length).toEqual(namedSecurityRule.length + 2);
            expect(merged[0].securityRules[0].name).toEqual(settings[0].securityRules[0].name);
            _.forEach(namedSecurityRule, (value, index) => {
                expect(merged[0].securityRules[index + 1].name).toEqual(value.name);
                expect(merged[0].securityRules[index + 1].protocol).toEqual(value.protocol);
                expect(merged[0].securityRules[index + 1].sourcePortRange).toEqual(value.sourcePortRange);
                expect(merged[0].securityRules[index + 1].destinationPortRange).toEqual(value.destinationPortRange);
                expect(merged[0].securityRules[index + 1].sourceAddressPrefix).toEqual(value.sourceAddressPrefix);
                expect(merged[0].securityRules[index + 1].destinationAddressPrefix).toEqual(value.destinationAddressPrefix);
                expect(merged[0].securityRules[index + 1].direction).toEqual(value.direction);
                expect(merged[0].securityRules[index + 1].access).toEqual(value.access);
            });
            expect(merged[0].securityRules[namedSecurityRule.length + 1].name).toEqual(settings[0].securityRules[2].name);
        });

        it('named security rule with user overrides', () => {
            let securityRuleName = 'ActiveDirectory';
            let namedSecurityRule = nsgSettings.__get__('namedSecurityRules')[securityRuleName];

            settings[0].securityRules.push({
                name: securityRuleName,
                sourceAddressPrefix: '192.168.2.1'
            });

            settings[0].securityRules.push({
                name: 'rule2',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.3.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });

            let merged = merge({settings, buildingBlockSettings});
            expect(merged[0].securityRules.length).toEqual(namedSecurityRule.length + 2);
            expect(merged[0].securityRules[0].name).toEqual(settings[0].securityRules[0].name);
            _.forEach(namedSecurityRule, (value, index) => {
                expect(merged[0].securityRules[index + 1].name).toEqual(value.name);
                expect(merged[0].securityRules[index + 1].protocol).toEqual(value.protocol);
                expect(merged[0].securityRules[index + 1].sourcePortRange).toEqual(value.sourcePortRange);
                expect(merged[0].securityRules[index + 1].destinationPortRange).toEqual(value.destinationPortRange);
                expect(merged[0].securityRules[index + 1].sourceAddressPrefix).toEqual(settings[0].securityRules[1].sourceAddressPrefix);
                expect(merged[0].securityRules[index + 1].destinationAddressPrefix).toEqual(value.destinationAddressPrefix);
                expect(merged[0].securityRules[index + 1].direction).toEqual(value.direction);
                expect(merged[0].securityRules[index + 1].access).toEqual(value.access);
            });
            expect(merged[0].securityRules[namedSecurityRule.length + 1].name).toEqual(settings[0].securityRules[2].name);
        });
    });

    describe('block validations', () => {
        let merge = nsgSettings.__get__('merge');
        let validate = nsgSettings.__get__('validate');
        let networkSecurityGroup = [
            {
                name: 'test-nsg',
                virtualNetworks: [
                    {
                        name: 'my-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ],
                networkInterfaces: [
                    {
                        name: 'my-nic1'
                    }
                ],
                securityRules: [
                    {
                        name: 'rule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '192.168.1.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }
        ];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-rg',
            location: 'westus'
        };

        let settings;
        beforeEach(() => {
            settings = _.cloneDeep(networkSecurityGroup);
        });

        it('cannot have different location than vnet', () => {
            settings[0].virtualNetworks[0].location = 'centralus';
            delete settings[0].networkInterfaces;

            let merged = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings
            });
            let results = validate(merged);
            expect(results.length).toEqual(1);
        });

        it('cannot have different subscription than vnet', () => {
            settings[0].virtualNetworks[0].subscriptionId = '00000000-0000-1000-A000-000000000000';

            let merged = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings
            });
            let results = validate(merged);
            expect(results.length).toEqual(1);
        });
        it('cannot have different location than nic', () => {
            settings[0].networkInterfaces[0].location = 'centralus';
            delete settings[0].virtualNetworks;

            let merged = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings
            });
            let results = validate(merged);
            expect(results.length).toEqual(1);
        });

        it('cannot have different subscription than nic', () => {
            settings[0].networkInterfaces[0].subscriptionId = '00000000-0000-1000-A000-000000000000';

            let merged = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings
            });
            let results = validate(merged);
            expect(results.length).toEqual(1);
        });
    });

    describe('userDefaults', () => {
        let merge = nsgSettings.__get__('merge');

        let networkSecurityGroup = [
            {
                name: 'test-nsg',
                virtualNetworks: [
                    {
                        name: 'my-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ],
                networkInterfaces: [
                    {
                        name: 'my-nic1'
                    }
                ],
                securityRules: [
                    {
                        name: 'rule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '192.168.1.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }
        ];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-rg'
        };

        let settings;
        beforeEach(() => {
            settings = _.cloneDeep(networkSecurityGroup);
        });

        it('virtualNetworks undefined despite user-defaults', () => {
            let defaults = [{
                virtualNetworks: [
                    {
                        name: 'my-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ]
            }];

            delete settings[0].virtualNetworks;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].virtualNetworks.length).toBe(0);
        });

        it('virtualNetworks null despite user-defaults', () => {
            let defaults = [{
                virtualNetworks: [
                    {
                        name: 'my-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ]
            }];
            settings[0].virtualNetworks = null;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].virtualNetworks.length).toBe(0);
        });

        it('virtualNetworks present and not overriden by user-defaults', () => {
            let defaults = [{
                virtualNetworks: [
                    {
                        name: 'my-default-virtual-network',
                        subnets: ['biz', 'web']
                    }
                ]
            }];
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].virtualNetworks[0].name).toBe('my-virtual-network');
        });

        it('networkInterfaces undefined despite user-defaults', () => {
            let defaults = [{
                networkInterfaces: [
                    {
                        name: 'my-default-nic1'
                    }
                ]
            }];
            delete settings[0].networkInterfaces;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].networkInterfaces.length).toBe(0);
        });

        it('networkInterfaces null despite user-defaults', () => {
            let defaults = [{
                networkInterfaces: [
                    {
                        name: 'my-default-nic1'
                    }
                ]
            }];
            settings[0].networkInterfaces = null;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].networkInterfaces.length).toBe(0);
        });

        it('networkInterfaces present and not overriden by user-defaults', () => {
            let defaults = [{
                networkInterfaces: [
                    {
                        name: 'my-default-nic1'
                    }
                ]
            }];
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].networkInterfaces[0].name).toBe('my-nic1');
        });

        it('securityRules undefined with user-defaults', () => {
            let defaults = [{
                securityRules: [
                    {
                        name: 'defaultrule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '10.0.0.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }];
            delete settings[0].securityRules;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].securityRules.length).toBe(1);
        });

        it('securityRules null with user-defaults', () => {
            let defaults = [{
                securityRules: [
                    {
                        name: 'defaultrule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '10.0.0.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }];
            settings[0].securityRules = null;
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].securityRules.length).toBe(1);
        });

        it('securityRules present and not overriden by user-defaults', () => {
            let defaults = [{
                securityRules: [
                    {
                        name: 'defaultrule1',
                        direction: 'Inbound',
                        priority: 100,
                        sourceAddressPrefix: '10.0.0.1',
                        destinationAddressPrefix: '*',
                        sourcePortRange: '*',
                        destinationPortRange: '*',
                        access: 'Allow',
                        protocol: '*'
                    }
                ]
            }];
            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].securityRules[0].name).toBe('rule1');
            expect(merged[0].securityRules[0].sourceAddressPrefix).toBe('192.168.1.1');
        });

        it('named security rule merged with user-defaults (complement)', () => {
            let defaults = [{
                name: 'default-nsg',
                networkInterfaces: [
                    {
                        name: 'my-default-nic1'
                    }
                ],
                securityRules: []
            }];
            let securityRuleName = 'ActiveDirectory';
            let namedSecurityRule = nsgSettings.__get__('namedSecurityRules')[securityRuleName];

            settings[0].securityRules.push({
                name: securityRuleName
            });

            settings[0].securityRules.push({
                name: 'rule2',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.2.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });

            defaults[0].securityRules.push({
                name: 'defaultrule1',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.2.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });

            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults
            });
            expect(merged[0].securityRules.length).toEqual(namedSecurityRule.length + 2 + 1);
            expect(merged[0].securityRules[0].name).toEqual(settings[0].securityRules[0].name);
            _.forEach(namedSecurityRule, (value, index) => {
                expect(merged[0].securityRules[index + 1].name).toEqual(value.name);
                expect(merged[0].securityRules[index + 1].protocol).toEqual(value.protocol);
                expect(merged[0].securityRules[index + 1].sourcePortRange).toEqual(value.sourcePortRange);
                expect(merged[0].securityRules[index + 1].destinationPortRange).toEqual(value.destinationPortRange);
                expect(merged[0].securityRules[index + 1].sourceAddressPrefix).toEqual(value.sourceAddressPrefix);
                expect(merged[0].securityRules[index + 1].destinationAddressPrefix).toEqual(value.destinationAddressPrefix);
                expect(merged[0].securityRules[index + 1].direction).toEqual(value.direction);
                expect(merged[0].securityRules[index + 1].access).toEqual(value.access);
            });
            expect(merged[0].securityRules[namedSecurityRule.length + 1].name).toEqual(settings[0].securityRules[2].name);
        });

        it('named security rule with user overrides', () => {
            let defaults = [{
                name: 'default-nsg',
                networkInterfaces: [
                    {
                        name: 'my-default-nic1'
                    }
                ],
                securityRules: []
            }];

            let securityRuleName = 'ActiveDirectory';
            let namedSecurityRule = nsgSettings.__get__('namedSecurityRules')[securityRuleName];

            settings[0].securityRules.push({
                name: securityRuleName,
                sourceAddressPrefix: '192.168.2.1'
            });

            settings[0].securityRules.push({
                name: 'rule2',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.3.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });
            defaults[0].securityRules.push({
                name: 'defaultrule1',
                direction: 'Inbound',
                priority: 200,
                sourceAddressPrefix: '192.168.2.1',
                destinationAddressPrefix: '*',
                sourcePortRange: '*',
                destinationPortRange: '*',
                access: 'Allow',
                protocol: '*'
            });

            let merged = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: defaults });
            expect(merged[0].securityRules.length).toEqual(namedSecurityRule.length + 2 + 1);
            expect(merged[0].securityRules[0].name).toEqual(settings[0].securityRules[0].name);
            _.forEach(namedSecurityRule, (value, index) => {
                expect(merged[0].securityRules[index + 1].name).toEqual(value.name);
                expect(merged[0].securityRules[index + 1].protocol).toEqual(value.protocol);
                expect(merged[0].securityRules[index + 1].sourcePortRange).toEqual(value.sourcePortRange);
                expect(merged[0].securityRules[index + 1].destinationPortRange).toEqual(value.destinationPortRange);
                expect(merged[0].securityRules[index + 1].sourceAddressPrefix).toEqual(settings[0].securityRules[1].sourceAddressPrefix);
                expect(merged[0].securityRules[index + 1].destinationAddressPrefix).toEqual(value.destinationAddressPrefix);
                expect(merged[0].securityRules[index + 1].direction).toEqual(value.direction);
                expect(merged[0].securityRules[index + 1].access).toEqual(value.access);
            });
            expect(merged[0].securityRules[namedSecurityRule.length + 1].name).toEqual(settings[0].securityRules[2].name);
        });
    });

    if (jasmine.testConfiguration.runTransform) {
        describe('process', () => {
            let networkSecurityGroup = [
                {
                    name: 'test-nsg',
                    virtualNetworks: [
                        {
                            name: 'my-virtual-network',
                            subnets: ['biz', 'web']
                        }
                    ],
                    networkInterfaces: [
                        {
                            name: 'my-nic1'
                        }
                    ],
                    securityRules: [
                        {
                            name: 'rule1',
                            direction: 'Inbound',
                            priority: 100,
                            sourceAddressPrefix: '192.168.1.1',
                            destinationAddressPrefix: '*',
                            sourcePortRange: '*',
                            destinationPortRange: '*',
                            access: 'Allow',
                            protocol: '*'
                        }
                    ]
                }
            ];

            let buildingBlockSettings = {
                subscriptionId: '00000000-0000-1000-8000-000000000000',
                resourceGroupName: 'test-rg',
                location: 'westus'
            };

            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(networkSecurityGroup);
            });

            it('single network security group', () => {
                let result = nsgSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                expect(result.resourceGroups.length).toEqual(1);
                expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                expect(result.parameters.networkSecurityGroups.length).toEqual(1);
                let settingsResult = result.parameters.networkSecurityGroups[0];
                expect(settingsResult.hasOwnProperty('id')).toEqual(true);
                expect(settingsResult.name).toEqual(settings[0].name);
                expect(settingsResult.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(settingsResult.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);

                expect(settingsResult.properties.securityRules.length).toEqual(1);
                let securityRulesResult = settingsResult.properties.securityRules;
                expect(securityRulesResult[0].name).toEqual(settings[0].securityRules[0].name);
                expect(securityRulesResult[0].properties.direction).toEqual(settings[0].securityRules[0].direction);
                expect(securityRulesResult[0].properties.priority).toEqual(settings[0].securityRules[0].priority);
                expect(securityRulesResult[0].properties.sourceAddressPrefix).toEqual(settings[0].securityRules[0].sourceAddressPrefix);
                expect(securityRulesResult[0].properties.destinationAddressPrefix).toEqual(settings[0].securityRules[0].destinationAddressPrefix);
                expect(securityRulesResult[0].properties.sourcePortRange).toEqual(settings[0].securityRules[0].sourcePortRange);
                expect(securityRulesResult[0].properties.destinationPortRange).toEqual(settings[0].securityRules[0].destinationPortRange);
                expect(securityRulesResult[0].properties.access).toEqual(settings[0].securityRules[0].access);
                expect(securityRulesResult[0].properties.protocol).toEqual(settings[0].securityRules[0].protocol);

                expect(result.parameters.subnets.length).toEqual(2);
                expect(result.parameters.subnets[0].id.endsWith('my-virtual-network/subnets/biz')).toEqual(true);
                expect(result.parameters.subnets[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.parameters.subnets[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.parameters.subnets[0].location).toEqual(buildingBlockSettings.location);
                expect(result.parameters.subnets[0].virtualNetwork).toEqual(settings[0].virtualNetworks[0].name);
                expect(result.parameters.subnets[0].name).toEqual(settings[0].virtualNetworks[0].subnets[0]);

                expect(result.parameters.subnets[1].id.endsWith('my-virtual-network/subnets/web')).toEqual(true);
                expect(result.parameters.subnets[1].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.parameters.subnets[1].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.parameters.subnets[1].location).toEqual(buildingBlockSettings.location);
                expect(result.parameters.subnets[1].virtualNetwork).toEqual(settings[0].virtualNetworks[0].name);
                expect(result.parameters.subnets[1].name).toEqual(settings[0].virtualNetworks[0].subnets[1]);

                expect(result.parameters.networkInterfaces.length).toEqual(1);
                expect(result.parameters.networkInterfaces[0].id.endsWith('networkInterfaces/my-nic1')).toEqual(true);
                expect(result.parameters.networkInterfaces[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.parameters.networkInterfaces[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.parameters.networkInterfaces[0].location).toEqual(buildingBlockSettings.location);
                expect(result.parameters.networkInterfaces[0].name).toEqual(settings[0].networkInterfaces[0].name);
            });

            it('single network security group with no network interfaces or subnets', () => {
                settings = settings[0];
                delete settings.virtualNetworks;
                delete settings.networkInterfaces;
                let result = nsgSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                expect(result.resourceGroups.length).toEqual(1);
                expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                expect(result.parameters.networkSecurityGroups.length).toBe(1);
                let settingsResult = result.parameters.networkSecurityGroups[0];
                expect(settingsResult.hasOwnProperty('id')).toBe(true);
                expect(settingsResult.name).toBe(settings.name);
                expect(settingsResult.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(settingsResult.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);

                expect(settingsResult.properties.securityRules.length).toBe(1);
                let securityRulesResult = settingsResult.properties.securityRules;
                expect(securityRulesResult[0].name).toEqual(settings.securityRules[0].name);
                expect(securityRulesResult[0].properties.direction).toEqual(settings.securityRules[0].direction);
                expect(securityRulesResult[0].properties.priority).toEqual(settings.securityRules[0].priority);
                expect(securityRulesResult[0].properties.sourceAddressPrefix).toEqual(settings.securityRules[0].sourceAddressPrefix);
                expect(securityRulesResult[0].properties.destinationAddressPrefix).toEqual(settings.securityRules[0].destinationAddressPrefix);
                expect(securityRulesResult[0].properties.sourcePortRange).toEqual(settings.securityRules[0].sourcePortRange);
                expect(securityRulesResult[0].properties.destinationPortRange).toEqual(settings.securityRules[0].destinationPortRange);
                expect(securityRulesResult[0].properties.access).toEqual(settings.securityRules[0].access);
                expect(securityRulesResult[0].properties.protocol).toEqual(settings.securityRules[0].protocol);

                expect(result.parameters.subnets.length).toBe(0);

                expect(result.parameters.networkInterfaces.length).toBe(0);
            });

            it('test settings validation errors', () => {
                delete settings[0].name;
                expect(() => {
                    nsgSettings.process({
                        settings: settings,
                        buildingBlockSettings: buildingBlockSettings
                    });
                }).toThrow();
            });

            it('test building blocks validation errors', () => {
                let bbSettings = _.cloneDeep(buildingBlockSettings);
                delete bbSettings.subscriptionId;
                expect(() => {
                    nsgSettings.process({
                        settings: settings,
                        buildingBlockSettings: bbSettings
                    });
                }).toThrow();
            });
        });
    }
});