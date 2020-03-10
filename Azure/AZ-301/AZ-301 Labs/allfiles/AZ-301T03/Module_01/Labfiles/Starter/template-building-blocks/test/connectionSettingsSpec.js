describe('connectionSettings', () => {
    let _ = require('lodash');
    let rewire = require('rewire');
    let connectionSettings = rewire('../src/core/connectionSettings.js');
    let validation = require('../src/core/validation.js');

    describe('isValidConnectionType', () => {
        let isValidConnectionType = connectionSettings.__get__('isValidConnectionType');
        it('undefined', () => {
            expect(isValidConnectionType()).toEqual(false);
        });

        it('null', () => {
            expect(isValidConnectionType(null)).toEqual(false);
        });

        it('empty', () => {
            expect(isValidConnectionType('')).toEqual(false);
        });

        it('whitespace', () => {
            expect(isValidConnectionType(' ')).toEqual(false);
        });

        it('invalid spacing', () => {
            expect(isValidConnectionType(' IPsec ')).toEqual(false);
        });

        it('invalid casing', () => {
            expect(isValidConnectionType('ipsec')).toEqual(false);
        });

        it('invalid value', () => {
            expect(isValidConnectionType('NOT_A_VALID_CONNECTION_TYPE')).toEqual(false);
        });

        it('IPsec', () => {
            expect(isValidConnectionType('IPsec')).toEqual(true);
        });

        it('Vnet2Vnet', () => {
            expect(isValidConnectionType('Vnet2Vnet')).toEqual(true);
        });

        it('ExpressRoute', () => {
            expect(isValidConnectionType('ExpressRoute')).toEqual(true);
        });
    });

    describe('merge', () => {
        let merge = connectionSettings.__get__('merge');

        let fullConnectionSettings = {
            name: 'my-connection',
            routingWeight: 10,
            sharedKey: 'mysecret',
            virtualNetworkGateway: {
                name: 'vgw'
            },
            virtualNetworkGateway1: {
                name: 'vgw1'
            },
            virtualNetworkGateway2: {
                name: 'vgw2'
            },
            expressRouteCircuit: {
                name: 'my-er-circuit'
            },
            localNetworkGateway: {
                name: 'my-lgw',
                ipAddress: '40.50.60.70',
                addressPrefixes: ['10.0.1.0/24']
            },
            tags: {
                tag1: 'value1',
                tag2: 'value2',
                tag3: 'value3'
            }
        };

        let ipsecConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'IPsec',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            localNetworkGateway: fullConnectionSettings.localNetworkGateway,
            tags: fullConnectionSettings.tags
        }];

        let expressRouteConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'ExpressRoute',
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            expressRouteCircuit: fullConnectionSettings.expressRouteCircuit,
            tags: fullConnectionSettings.tags
        }];

        let vnet2VnetConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'Vnet2Vnet',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway1: fullConnectionSettings.virtualNetworkGateway1,
            virtualNetworkGateway2: fullConnectionSettings.virtualNetworkGateway2,
            tags: fullConnectionSettings.tags
        }];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-vnet-rg',
            location: 'westus'
        };

        it('IPsec setupResources', () => {
            let result = merge({
                settings: ipsecConnectionSettings,
                buildingBlockSettings: buildingBlockSettings
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway.location).toEqual(buildingBlockSettings.location);

            expect(result[0].localNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].localNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].localNetworkGateway.location).toEqual(buildingBlockSettings.location);
        });

        it('ExpressRoute setupResources', () => {
            let result = merge({
                settings: expressRouteConnectionSettings,
                buildingBlockSettings: buildingBlockSettings
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway.location).toEqual(buildingBlockSettings.location);

            expect(result[0].expressRouteCircuit.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].expressRouteCircuit.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].expressRouteCircuit.location).toEqual(buildingBlockSettings.location);
        });

        it('Vnet2Vnet setupResources', () => {
            let result = merge({
                settings: vnet2VnetConnectionSettings,
                buildingBlockSettings: buildingBlockSettings
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway1.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway1.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway1.location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway2.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway2.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway2.location).toEqual(buildingBlockSettings.location);
        });
    });

    describe('block validations', () => {
        let merge = connectionSettings.__get__('merge');
        let connectionSettingsValidations = connectionSettings.__get__('connectionSettingsValidations');
        let validate = (settings) => {
            return validation.validate({
                settings: settings,
                validations: connectionSettingsValidations
            });
        };
        let fullConnectionSettings = {
            name: 'my-connection',
            routingWeight: 10,
            sharedKey: 'mysecret',
            virtualNetworkGateway: {
                name: 'vgw'
            },
            virtualNetworkGateway1: {
                name: 'vgw1'
            },
            virtualNetworkGateway2: {
                name: 'vgw2'
            },
            expressRouteCircuit: {
                name: 'my-er-circuit'
            },
            localNetworkGateway: {
                name: 'my-lgw',
                ipAddress: '40.50.60.70',
                addressPrefixes: ['10.0.1.0/24']
            },
            tags: {
                tag1: 'value1',
                tag2: 'value2',
                tag3: 'value3'
            }
        };

        let ipsecConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'IPsec',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            localNetworkGateway: fullConnectionSettings.localNetworkGateway,
            tags: fullConnectionSettings.tags
        }];

        let expressRouteConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'ExpressRoute',
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            expressRouteCircuit: fullConnectionSettings.expressRouteCircuit,
            tags: fullConnectionSettings.tags
        }];

        let vnet2VnetConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'Vnet2Vnet',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway1: fullConnectionSettings.virtualNetworkGateway1,
            virtualNetworkGateway2: fullConnectionSettings.virtualNetworkGateway2,
            tags: fullConnectionSettings.tags
        }];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-vnet-rg',
            location: 'westus'
        };
        describe('vnet2vnet', () => {
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(vnet2VnetConnectionSettings);
            });
            it('virtual network gateway 1 cannot be in different location', () => {
                settings[0].location = 'westus';
                settings[0].virtualNetworkGateway1.location = 'centralus';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });

            it('virtual network gateway 1 cannot be in different subscription', () => {
                settings[0].virtualNetworkGateway1.subscriptionId = '00000000-0000-1000-A000-000000000000';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });
        });

        describe('IPSec', () => {
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(ipsecConnectionSettings);
            });
            it('virtual network gateway cannot be in different location', () => {
                settings[0].location = 'westus';
                settings[0].localNetworkGateway.location = 'centralus';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });

            it('virtual network gateway cannot be in different subscription', () => {
                settings[0].localNetworkGateway.subscriptionId = '00000000-0000-1000-A000-000000000000';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });
        });

        describe('ExpressRoute', () => {
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(expressRouteConnectionSettings);
            });
            it('virtual network gateway cannot be in different location', () => {
                settings[0].location = 'westus';
                settings[0].virtualNetworkGateway.location = 'centralus';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });

            it('virtual network gateway cannot be in different subscription', () => {
                settings[0].virtualNetworkGateway.subscriptionId = '00000000-0000-1000-A000-000000000000';

                let merged = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                let result = validate(merged);
                expect(result.length).toEqual(1);
            });
        });
    });

    describe('user-defaults', () => {
        let merge = connectionSettings.__get__('merge');

        let fullConnectionSettings = {
            name: 'my-connection',
            routingWeight: 10,
            sharedKey: 'mysecret',
            virtualNetworkGateway: {
                name: 'vgw'
            },
            virtualNetworkGateway1: {
                name: 'vgw1'
            },
            virtualNetworkGateway2: {
                name: 'vgw2'
            },
            expressRouteCircuit: {
                name: 'my-er-circuit'
            },
            localNetworkGateway: {
                name: 'my-lgw',
                ipAddress: '40.50.60.70',
                addressPrefixes: ['10.0.1.0/24']
            },
            tags: {
                tag1: 'value1',
                tag2: 'value2',
                tag3: 'value3'
            }
        };

        let ipsecConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'IPsec',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            localNetworkGateway: fullConnectionSettings.localNetworkGateway,
            tags: fullConnectionSettings.tags
        }];

        let expressRouteConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'ExpressRoute',
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            expressRouteCircuit: fullConnectionSettings.expressRouteCircuit,
            tags: fullConnectionSettings.tags
        }];

        let vnet2VnetConnectionSettings = [{
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'Vnet2Vnet',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway1: fullConnectionSettings.virtualNetworkGateway1,
            virtualNetworkGateway2: fullConnectionSettings.virtualNetworkGateway2,
            tags: fullConnectionSettings.tags
        }];

        let buildingBlockSettings = {
            subscriptionId: '00000000-0000-1000-8000-000000000000',
            resourceGroupName: 'test-vnet-rg',
            location: 'westus'
        };

        it('tags merged - user-defaults as null (defaults => directory-defaults => user-params)', () => {
            let result = merge({
                settings: [{}],
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: { tags: {
                    status: 'other',
                    company: 'xyz'
                }}
            });

            let expectedTags = {
                status: 'other',
                company: 'xyz'
            };

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);
            expect(result[0].tags).toEqual(expectedTags);
        });

        it('tags merged (defaults => directory-defaults => user-params)', () => {
            let result = merge({
                settings: [{tags: {
                    status: 'ongoing'
                }}],
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: { tags: {
                    status: 'other',
                    company: 'xyz'
                }}
            });

            let expectedTags = {
                status: 'ongoing',
                company: 'xyz'
            };

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);
            expect(result[0].tags).toEqual(expectedTags);
        });

        it('IPsec setupResources with user-defaults', () => {
            let result = merge({
                settings: ipsecConnectionSettings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: {
                    connectionType: 'Vnet2Vnet',
                }
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway.location).toEqual(buildingBlockSettings.location);

            expect(result[0].localNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].localNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].localNetworkGateway.location).toEqual(buildingBlockSettings.location);
        });

        it('ExpressRoute setupResources with user-defaults', () => {
            let result = merge({
                settings: expressRouteConnectionSettings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: {
                    connectionType: 'IPsec',
                }
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway.location).toEqual(buildingBlockSettings.location);

            expect(result[0].expressRouteCircuit.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].expressRouteCircuit.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].expressRouteCircuit.location).toEqual(buildingBlockSettings.location);
        });

        it('Vnet2Vnet setupResources with user-defaults', () => {
            let result = merge({
                settings: vnet2VnetConnectionSettings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: {
                    connectionType: 'ExpressRoute',
                }
            });

            expect(result[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway1.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway1.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway1.location).toEqual(buildingBlockSettings.location);

            expect(result[0].virtualNetworkGateway2.subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
            expect(result[0].virtualNetworkGateway2.resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
            expect(result[0].virtualNetworkGateway2.location).toEqual(buildingBlockSettings.location);
        });

    });

    describe('validations', () => {
        let connectionSettingsValidations = connectionSettings.__get__('connectionSettingsValidations');
        let fullConnectionSettings = {
            name: 'my-connection',
            routingWeight: 10,
            sharedKey: 'mysecret',
            virtualNetworkGateway: {
                name: 'vgw'
            },
            virtualNetworkGateway1: {
                name: 'vgw1'
            },
            virtualNetworkGateway2: {
                name: 'vgw2'
            },
            expressRouteCircuit: {
                name: 'my-er-circuit'
            },
            localNetworkGateway: {
                name: 'my-lgw',
                ipAddress: '40.50.60.70',
                addressPrefixes: ['10.0.1.0/24']
            },
            tags: {
                tag1: 'value1',
                tag2: 'value2',
                tag3: 'value3'
            }
        };

        let ipsecConnectionSettings = {
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'IPsec',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            localNetworkGateway: fullConnectionSettings.localNetworkGateway,
            tags: fullConnectionSettings.tags
        };

        let expressRouteConnectionSettings = {
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'ExpressRoute',
            virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
            expressRouteCircuit: fullConnectionSettings.expressRouteCircuit,
            tags: fullConnectionSettings.tags
        };

        let vnet2VnetConnectionSettings = {
            name: fullConnectionSettings.name,
            routingWeight: fullConnectionSettings.routingWeight,
            connectionType: 'Vnet2Vnet',
            sharedKey: fullConnectionSettings.sharedKey,
            virtualNetworkGateway1: fullConnectionSettings.virtualNetworkGateway1,
            virtualNetworkGateway2: fullConnectionSettings.virtualNetworkGateway2,
            tags: fullConnectionSettings.tags
        };

        let replaceField = (settings, field) => {
            let clone = _.cloneDeep(settings);
            delete clone[field];
            return validation.validate({
                settings: clone,
                validations: connectionSettingsValidations
            });
        };

        describe('IPsec', () => {
            let connectionSettings = ipsecConnectionSettings;
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(connectionSettings);
            });
            describe('', () => {
                it('sharedKey null', () => {
                    settings.sharedKey = null;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('sharedKey empty', () => {
                    settings.sharedKey = '';
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('sharedKey whitespace', () => {
                    settings.sharedKey = '   ';
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('expressRouteCircuit defined', () => {
                    settings.expressRouteCircuit = fullConnectionSettings.expressRouteCircuit;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.expressRouteCircuit');
                });

                it('virtualNetworkGateway1 defined', () => {
                    settings.virtualNetworkGateway1 = fullConnectionSettings.virtualNetworkGateway1;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.virtualNetworkGateway1');
                });

                it('virtualNetworkGateway2 defined', () => {
                    settings.virtualNetworkGateway2 = fullConnectionSettings.virtualNetworkGateway2;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.virtualNetworkGateway2');
                });

                it('tags null', () => {
                    settings.tags = null;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.tags');
                });
            });

            it('name undefined', () => {
                let errors = replaceField(connectionSettings, 'name');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.name');
            });

            it('routingWeight undefined', () => {
                let errors = replaceField(connectionSettings, 'routingWeight');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.routingWeight');
            });

            it('connectionType undefined', () => {
                let errors = replaceField(connectionSettings, 'connectionType');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.connectionType');
            });

            it('sharedKey undefined', () => {
                let errors = replaceField(connectionSettings, 'sharedKey');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.sharedKey');
            });

            it('virtualNetworkGateway undefined', () => {
                let errors = replaceField(connectionSettings, 'virtualNetworkGateway');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.virtualNetworkGateway');
            });

            it('localNetworkGateway undefined', () => {
                let errors = replaceField(connectionSettings, 'localNetworkGateway');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.localNetworkGateway');
            });

            it('tags undefined', () => {
                let settings = _.cloneDeep(connectionSettings);
                delete settings.tags;
                let errors = validation.validate({
                    settings: settings,
                    validations: connectionSettingsValidations
                });

                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.tags');
            });

            it('valid', () => {
                let errors = validation.validate({
                    settings: connectionSettings,
                    validations: connectionSettingsValidations
                });

                expect(errors.length).toEqual(0);
            });
        });

        describe('ExpressRoute', () => {
            let connectionSettings = expressRouteConnectionSettings;
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(connectionSettings);
            });
            describe('', () => {
                it('sharedKey defined', () => {
                    settings.sharedKey = fullConnectionSettings.sharedKey;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });
                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });
                it('localNetworkGateway defined', () => {
                    settings.localNetworkGateway = fullConnectionSettings.localNetworkGateway;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.localNetworkGateway');
                });
                it('virtualNetworkGateway2 defined', () => {
                    settings.virtualNetworkGateway2 = fullConnectionSettings.virtualNetworkGateway2;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.virtualNetworkGateway2');
                });
                it('virtualNetworkGateway1 defined', () => {
                    settings.virtualNetworkGateway1 = fullConnectionSettings.virtualNetworkGateway1;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.virtualNetworkGateway1');
                });
            });

            it('name undefined', () => {
                let errors = replaceField(connectionSettings, 'name');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.name');
            });

            it('routingWeight undefined', () => {
                let errors = replaceField(connectionSettings, 'routingWeight');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.routingWeight');
            });

            it('connectionType undefined', () => {
                let errors = replaceField(connectionSettings, 'connectionType');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.connectionType');
            });

            it('virtualNetworkGateway undefined', () => {
                let errors = replaceField(connectionSettings, 'virtualNetworkGateway');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.virtualNetworkGateway');
            });

            it('expressRouteCircuit undefined', () => {
                let errors = replaceField(connectionSettings, 'expressRouteCircuit');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.expressRouteCircuit');
            });

            it('valid', () => {
                let errors = validation.validate({
                    settings: connectionSettings,
                    validations: connectionSettingsValidations
                });

                expect(errors.length).toEqual(0);
            });
        });

        describe('Vnet2Vnet', () => {
            let connectionSettings = vnet2VnetConnectionSettings;
            let settings;
            beforeEach(() => {
                settings = _.cloneDeep(connectionSettings);
            });
            describe('', () => {
                it('sharedKey null', () => {
                    settings.sharedKey = null;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('sharedKey empty', () => {
                    let settings = _.cloneDeep(connectionSettings);
                    settings.sharedKey = '';
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('sharedKey whitespace', () => {
                    let settings = _.cloneDeep(connectionSettings);
                    settings.sharedKey = '   ';
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.sharedKey');
                });

                it('localNetworkGateway defined', () => {
                    let settings = _.cloneDeep(connectionSettings);
                    settings.localNetworkGateway = fullConnectionSettings.localNetworkGateway;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.localNetworkGateway');
                });

                it('virtualNetworkGateway defined', () => {
                    let settings = _.cloneDeep(connectionSettings);
                    settings.virtualNetworkGateway = fullConnectionSettings.virtualNetworkGateway;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.virtualNetworkGateway');
                });

                it('expressRouteCircuit defined', () => {
                    let settings = _.cloneDeep(connectionSettings);
                    settings.expressRouteCircuit = fullConnectionSettings.expressRouteCircuit;
                    let errors = validation.validate({
                        settings: settings,
                        validations: connectionSettingsValidations
                    });

                    expect(errors.length).toEqual(1);
                    expect(errors[0].name).toEqual('.expressRouteCircuit');
                });
            });

            it('name undefined', () => {
                let errors = replaceField(connectionSettings, 'name');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.name');
            });

            it('routingWeight undefined', () => {
                let errors = replaceField(connectionSettings, 'routingWeight');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.routingWeight');
            });

            it('connectionType undefined', () => {
                let errors = replaceField(connectionSettings, 'connectionType');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.connectionType');
            });

            it('sharedKey undefined', () => {
                let errors = replaceField(connectionSettings, 'sharedKey');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.sharedKey');
            });

            it('virtualNetworkGateway1 undefined', () => {
                let errors = replaceField(connectionSettings, 'virtualNetworkGateway1');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.virtualNetworkGateway1');
            });

            it('virtualNetworkGateway2 undefined', () => {
                let errors = replaceField(connectionSettings, 'virtualNetworkGateway2');
                expect(errors.length).toEqual(1);
                expect(errors[0].name).toEqual('.virtualNetworkGateway2');
            });

            it('valid', () => {
                let errors = validation.validate({
                    settings: connectionSettings,
                    validations: connectionSettingsValidations
                });

                expect(errors.length).toEqual(0);
            });
        });
    });

    if (jasmine.testConfiguration.runTransform) {
        describe('transform', () => {
            let fullConnectionSettings = {
                name: 'my-connection',
                routingWeight: 10,
                sharedKey: 'mysecret',
                virtualNetworkGateway: {
                    name: 'vgw'
                },
                virtualNetworkGateway1: {
                    name: 'vgw1'
                },
                virtualNetworkGateway2: {
                    name: 'vgw2'
                },
                expressRouteCircuit: {
                    name: 'my-er-circuit'
                },
                localNetworkGateway: {
                    name: 'my-lgw',
                    ipAddress: '40.50.60.70',
                    addressPrefixes: ['10.0.1.0/24']
                },
                tags: {
                    tag1: 'value1',
                    tag2: 'value2',
                    tag3: 'value3'
                }
            };

            let ipsecConnectionSettings = [{
                name: fullConnectionSettings.name,
                routingWeight: fullConnectionSettings.routingWeight,
                connectionType: 'IPsec',
                sharedKey: fullConnectionSettings.sharedKey,
                virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
                localNetworkGateway: fullConnectionSettings.localNetworkGateway,
                tags: fullConnectionSettings.tags
            }];

            let expressRouteConnectionSettings = [{
                name: fullConnectionSettings.name,
                routingWeight: fullConnectionSettings.routingWeight,
                connectionType: 'ExpressRoute',
                virtualNetworkGateway: fullConnectionSettings.virtualNetworkGateway,
                expressRouteCircuit: fullConnectionSettings.expressRouteCircuit,
                tags: fullConnectionSettings.tags
            }];

            let vnet2VnetConnectionSettings = [{
                name: fullConnectionSettings.name,
                routingWeight: fullConnectionSettings.routingWeight,
                connectionType: 'Vnet2Vnet',
                sharedKey: fullConnectionSettings.sharedKey,
                virtualNetworkGateway1: fullConnectionSettings.virtualNetworkGateway1,
                virtualNetworkGateway2: fullConnectionSettings.virtualNetworkGateway2,
                tags: fullConnectionSettings.tags
            }];

            let buildingBlockSettings = {
                subscriptionId: '00000000-0000-1000-8000-000000000000',
                resourceGroupName: 'test-vnet-rg',
                location: 'westus'
            };

            it('ExpressRoute settings', () => {
                let settings = _.cloneDeep(expressRouteConnectionSettings);
                let result = connectionSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                expect(result.resourceGroups.length).toEqual(1);
                expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                expect(result.parameters.connections.length).toBe(1);
                expect(result.parameters.localNetworkGateways.length).toEqual(0);
                let connectionSetting = result.parameters.connections[0];
                expect(connectionSetting.name).toBe(settings[0].name);
                expect(connectionSetting.properties.connectionType).toBe(settings[0].connectionType);
                expect(connectionSetting.properties.routingWeight).toBe(settings[0].routingWeight);
                expect(connectionSetting.properties.sharedKey).toBeUndefined();
                expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway1.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway.name}`)).toBe(true);
                expect(_.endsWith(connectionSetting.properties.peer.id, `/expressRouteCircuits/${fullConnectionSettings.expressRouteCircuit.name}`)).toBe(true);
            });

            it('Vnet2Vnet settings', () => {
                let settings = _.cloneDeep(vnet2VnetConnectionSettings);
                let result = connectionSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                expect(result.resourceGroups.length).toEqual(1);
                expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                expect(result.parameters.connections.length).toBe(1);
                expect(result.parameters.localNetworkGateways.length).toEqual(0);
                let connectionSetting = result.parameters.connections[0];
                expect(connectionSetting.name).toBe(settings[0].name);
                expect(connectionSetting.properties.connectionType).toBe(settings[0].connectionType);
                expect(connectionSetting.properties.routingWeight).toBe(settings[0].routingWeight);
                expect(connectionSetting.properties.sharedKey).toBe(settings[0].sharedKey);
                expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway1.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway1.name}`)).toBe(true);
                expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway2.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway2.name}`)).toBe(true);
            });

            it('IPsec and ExpressRoute settings', () => {
                let settings = [_.cloneDeep(ipsecConnectionSettings[0]), _.cloneDeep(expressRouteConnectionSettings[0])];
                let result = connectionSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });

                expect(result.resourceGroups.length).toEqual(1);
                expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                expect(result.parameters.connections.length).toBe(2);
                expect(result.parameters.localNetworkGateways.length).toEqual(1);
                let connectionSetting = result.parameters.connections[0];
                let setting = settings[0];
                expect(connectionSetting.name).toBe(setting.name);
                expect(connectionSetting.properties.connectionType).toBe(setting.connectionType);
                expect(connectionSetting.properties.routingWeight).toBe(setting.routingWeight);
                expect(connectionSetting.properties.sharedKey).toBe(setting.sharedKey);
                expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway1.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway.name}`)).toBe(true);
                expect(_.endsWith(connectionSetting.properties.localNetworkGateway2.id, `/localNetworkGateways/${fullConnectionSettings.localNetworkGateway.name}`)).toBe(true);

                connectionSetting = result.parameters.connections[1];
                setting = settings[1];
                expect(connectionSetting.name).toBe(setting.name);
                expect(connectionSetting.properties.connectionType).toBe(setting.connectionType);
                expect(connectionSetting.properties.routingWeight).toBe(setting.routingWeight);
                expect(connectionSetting.properties.sharedKey).toBeUndefined();
                expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway1.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway.name}`)).toBe(true);
                expect(_.endsWith(connectionSetting.properties.peer.id, `/expressRouteCircuits/${fullConnectionSettings.expressRouteCircuit.name}`)).toBe(true);
            });

            describe('', () => {
                let settings;
                beforeEach(() => {
                    settings = _.cloneDeep(ipsecConnectionSettings);
                });
                it('IPsec settings', () => {
                    let result = connectionSettings.process({
                        settings: settings,
                        buildingBlockSettings: buildingBlockSettings
                    });

                    expect(result.resourceGroups.length).toEqual(1);
                    expect(result.resourceGroups[0].subscriptionId).toEqual(buildingBlockSettings.subscriptionId);
                    expect(result.resourceGroups[0].resourceGroupName).toEqual(buildingBlockSettings.resourceGroupName);
                    expect(result.resourceGroups[0].location).toEqual(buildingBlockSettings.location);

                    expect(result.parameters.connections.length).toEqual(1);
                    expect(result.parameters.localNetworkGateways.length).toEqual(1);
                    let connectionSetting = result.parameters.connections[0];
                    expect(connectionSetting.name).toBe(settings[0].name);
                    expect(connectionSetting.properties.connectionType).toBe(settings[0].connectionType);
                    expect(connectionSetting.properties.routingWeight).toBe(settings[0].routingWeight);
                    expect(connectionSetting.properties.sharedKey).toBe(settings[0].sharedKey);
                    expect(_.endsWith(connectionSetting.properties.virtualNetworkGateway1.id, `/virtualNetworkGateways/${fullConnectionSettings.virtualNetworkGateway.name}`)).toBe(true);
                    expect(_.endsWith(connectionSetting.properties.localNetworkGateway2.id, `/localNetworkGateways/${fullConnectionSettings.localNetworkGateway.name}`)).toBe(true);
                    let localNetworkGateway = result.parameters.localNetworkGateways[0];
                    expect(localNetworkGateway.name).toEqual(settings[0].localNetworkGateway.name);
                    expect(localNetworkGateway.properties.gatewayIpAddress).toEqual(settings[0].localNetworkGateway.ipAddress);
                    expect(localNetworkGateway.properties.localNetworkAddressSpace.addressPrefixes.length).toEqual(1);
                    expect(localNetworkGateway.properties.localNetworkAddressSpace.addressPrefixes[0]).toEqual(settings[0].localNetworkGateway.addressPrefixes[0]);
                });

                it('test settings validation errors', () => {
                    delete settings[0].name;
                    expect(() => {
                        connectionSettings.process({
                            settings: settings,
                            buildingBlockSettings: buildingBlockSettings
                        });
                    }).toThrow();
                });

                it('test building blocks validation errors', () => {
                    let bbSettings = _.cloneDeep(buildingBlockSettings);
                    delete bbSettings.subscriptionId;
                    expect(() => {
                        connectionSettings.process({
                            settings: settings,
                            buildingBlockSettings: bbSettings
                        });
                    }).toThrow();
                });
            });
        });
    }
});