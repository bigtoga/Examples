describe('virtualMachineSettings:', () => {
    let rewire = require('rewire');
    let virtualMachineSettings = rewire('../src/core/virtualMachineSettings.js');
    let v = require('../src/core/validation.js');
    // Monkey patch the call to get VM skus
    virtualMachineSettings.__set__('az', {
        isValidLocation: ({subscriptionId, location}) => {
            //return getLocations({subscriptionId}).includes(location);
            throw new Error("isValidLocation patched!");
        },
        getVMSkuInfo: ({vmSize, subscriptionId, location}) => {
            // We'll mimic the underlying behavior. If the size is anything but Standard_DS2_v2,
            // the SKU is "not found".
            if (vmSize !== 'Standard_DS2_v2') {
                return undefined;
            }
            // Test location data
            const sku = [
                {
                    location: "eastus",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "eastus2",
                    zones: [
                        "3",
                        "1",
                        "2"
                    ]
                },
                {
                    location: "westus",
                    zones: []
                },
                {
                    location: "centralus",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "northcentralus",
                    zones: []
                },
                {
                    location: "southcentralus",
                    zones: []
                },
                {
                    location: "northeurope",
                    zones: [
                        "1",
                        "3",
                        "2"
                    ]
                },
                {
                    location: "westeurope",
                    zones: [
                        "1",
                        "3",
                        "2"
                    ]
                },
                {
                    location: "eastasia",
                    zones: []
                },
                {
                    location: "southeastasia",
                    zones: [
                        "3",
                        "1",
                        "2"
                    ]
                },
                {
                    location: "japaneast",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "japanwest",
                    zones: []
                },
                {
                    location: "australiaeast",
                    zones: []
                },
                {
                    location: "australiasoutheast",
                    zones: []
                },
                {
                    location: "AustraliaCentral",
                    zones: []
                },
                {
                    location: "brazilsouth",
                    zones: []
                },
                {
                    location: "SouthIndia",
                    zones: []
                },
                {
                    location: "CentralIndia",
                    zones: []
                },
                {
                    location: "WestIndia",
                    zones: []
                },
                {
                    location: "CanadaCentral",
                    zones: []
                },
                {
                    location: "CanadaEast",
                    zones: []
                },
                {
                    location: "westus2",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "westcentralus",
                    zones: []
                },
                {
                    location: "uksouth",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "ukwest",
                    zones: []
                },
                {
                    location: "KoreaCentral",
                    zones: []
                },
                {
                    location: "KoreaSouth",
                    zones: []
                },
                {
                    location: "FranceCentral",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "SouthAfricaNorth",
                    zones: []
                },
                {
                    location: "UAENorth",
                    zones: []
                },
                {
                    location: "UKNorth",
                    zones: []
                },
                {
                    location: "UKSouth2",
                    zones: []
                },
                {
                    location: "AustraliaCentral2",
                    zones: []
                },
                {
                    location: "EastUS2EUAP",
                    zones: [
                        "3",
                        "2",
                        "1"
                    ]
                },
                {
                    location: "CentralUSEUAP",
                    zones: []
                }
            ];
            // let sku = getVMSku({vmSize, subscriptionId});
            // if (sku) {
            return sku.find((locInfo) => locInfo.location.toLowerCase() === location.toLowerCase());
            // }
            // if (v.utilities.isNullOrWhitespace(vmSize)) {
            //     return undefined;
            // }

            // return {
            //     zones: []
            // };
        }
    });
    let _ = require('lodash');
    let testSettings = {
        vmCount: 2,
        namePrefix: 'test',
        computerNamePrefix: 'test',
        size: 'Standard_DS2_v2',
        osType: 'windows',
        customData: 'custom data',
        osDisk: {
            caching: 'ReadWrite',
            createOption: 'fromImage'
        },
        adminUsername: 'testadminuser',
        storageAccounts: {
            nameSuffix: 'st',
            count: 1,
            skuType: 'Premium_LRS',
            managed: false,
            accounts: [],
            supportsHttpsTrafficOnly: false,
            encryptBlobStorage: false,
            encryptFileStorage: false,
            keyVaultProperties: {}
        },
        diagnosticStorageAccounts: {
            nameSuffix: 'diag',
            count: 1,
            skuType: 'Standard_LRS',
            managed: false,
            accounts: [],
            supportsHttpsTrafficOnly: false,
            encryptBlobStorage: false,
            encryptFileStorage: false,
            keyVaultProperties: {}
        },
        nics: [
            {
                isPublic: true,
                isPrimary: true,
                subnetName: 'web',
                privateIPAllocationMethod: 'Static',
                publicIPAllocationMethod: 'Static',
                startingIPAddress: '10.0.1.240',
                enableIPForwarding: false,
                domainNameLabelPrefix: '',
                dnsServers: [
                    '10.0.1.240',
                    '10.0.1.242'
                ],
                applicationGatewayBackendPoolNames: [],
                backendPoolNames: [],
                inboundNatRulesNames: [],
                inboundNatPoolNames: [],
                enableAcceleratedNetworking: false
            },
            {
                isPublic: false,
                isPrimary: false,
                subnetName: 'biz',
                privateIPAllocationMethod: 'Dynamic',
                publicIPAllocationMethod: 'Dynamic',
                startingIPAddress: '',
                enableIPForwarding: false,
                domainNameLabelPrefix: '',
                dnsServers: [],
                applicationGatewayBackendPoolNames: [],
                backendPoolNames: [],
                inboundNatRulesNames: [],
                inboundNatPoolNames: [],
                enableAcceleratedNetworking: false
            }
        ],
        imageReference: {
            publisher: 'MicrosoftWindowsServer',
            offer: 'WindowsServer',
            sku: '2012-R2-Datacenter',
            version: 'latest'
        },
        dataDisks: {
            count: 1,
            diskSizeGB: 127,
            caching: 'None',
            createOption: 'empty',
            disks: []
        },
        existingWindowsServerlicense: false,
        availabilitySet: {
            platformFaultDomainCount: 3,
            platformUpdateDomainCount: 5,
            name: 'test-as'
        },
        adminPassword: 'testPassw0rd111',
        virtualNetwork: {
            name: 'test-vnet'
        },
        tags: {},
        usePlan: false,
        zones: []
    };
    let buildingBlockSettings = {
        resourceGroupName: 'test-rg',
        subscriptionId: '00000000-0000-1000-A000-000000000000',
        location: 'westus2',
        cloud: {
            suffixes: {
                storageEndpoint: 'core.windows.net'
            }
        }
    };
    describe('merge:', () => {
        let merge = virtualMachineSettings.__get__('merge');

        it('uses linux as default if .osType is not provided.', () => {
            let settings = {};
            let mergedValue = merge({ settings, buildingBlockSettings });
            expect(mergedValue.osType).toEqual('linux');
        });
        it('throw if anything other that windows or linux is specified for .osType.', () => {
            let settings = { osType: 'test' };

            expect(() => merge({ settings, buildingBlockSettings })).toThrowError(Error);
        });
        it('value for .osType is case insensitive.', () => {
            let settings = { osType: 'WinDows' };
            let mergedValue = merge({ settings, buildingBlockSettings });
            expect(mergedValue.osType).toEqual('windows');
        });
        it('when computerName is not specified, its assigned an empty string at merge.', () => {
            let settings = _.cloneDeep(testSettings);
            delete settings.computerNamePrefix;
            let mergedValue = merge({ settings, buildingBlockSettings });
            expect(mergedValue.computerNamePrefix).toEqual('');
        });
        it('when load balancer name is not specified, should use vm namePrefix.', () => {
            let settings = _.cloneDeep(testSettings);
            settings.loadBalancerSettings = {};
            let mergedValue = merge({ settings, buildingBlockSettings });
            expect(mergedValue.loadBalancerSettings.name).toEqual(`${settings.namePrefix}-lb`);
        });
        it('validates load balancer settings', () => {
            let settings = _.cloneDeep(testSettings);

            let mergedValue = merge({ settings: settings, buildingBlockSettings });
            expect(_.isPlainObject(mergedValue.nics[0].publicIpAddress)).toEqual(true);
            expect(mergedValue.nics[0].publicIpAddress.publicIPAllocationMethod).toEqual('Static');
            expect(mergedValue.nics[0].publicIpAddress.publicIPAddressVersion).toEqual('IPv4');
            expect(_.isPlainObject(mergedValue.nics[1].publicIpAddress)).toEqual(false);
        });
        describe('AvailabilitySet:', () => {
            it('validates that no errors are thrown if AvailabilitySet is not provided ', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'WinDows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
            });
            it('validates that AvSet name property is applied for vmcount > 1', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'WinDows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.name).toEqual('testvm-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(2);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(5);
            });
            it('validates that AvSet name property is not applied for vmcount <= 1', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 1,
                    osType: 'WinDows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('name')).toEqual(false);
            });
            it('validates that validate that name of avSet is computed (if not provided) using vm namePrefix', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'WinDows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.name).toEqual('testvm-as');
            });
            it('validates that avset is merged with defaults for windows', () => {
                let settings = {
                    availabilitySet: {
                        name: 'test-as'
                    },
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.availabilitySet.name).toEqual('test-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(2);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(5);
            });
            it('validates that avset is merged with defaults for linux', () => {
                let settings = {
                    availabilitySet: {
                        name: 'test-as'
                    },
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.availabilitySet.name).toEqual('test-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(2);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(5);
            });
        });
        describe('ScaleSetSettings:', () => {
            it('validates that no errors are thrown if ScaleSetSettings is not provided', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.scaleSetSettings)).toEqual(false);
            });
            it('validates that overrides happen for user-params ScaleSetSettings over defaults', () => {
                let settings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows',
                    scaleSetSettings: {
                        upgradePolicy: 'Automatic',
                        overprovision: false,
                        singlePlacementGroup: false
                    }
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(_.isPlainObject(mergedValue.scaleSetSettings)).toEqual(true);
                expect(mergedValue.scaleSetSettings.overprovision).toEqual(false);
                expect(mergedValue.scaleSetSettings.singlePlacementGroup).toEqual(false);
            });
        });
        describe('windows:', () => {
            it('validates that properties for windows are applied', () => {
                let settings = { vmCount: 2, osType: 'windows' };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.hasOwnProperty('vmCount')).toEqual(true);
                expect(mergedValue.hasOwnProperty('namePrefix')).toEqual(true);
                expect(mergedValue.hasOwnProperty('computerNamePrefix')).toEqual(true);
                expect(mergedValue.hasOwnProperty('size')).toEqual(true);
                expect(mergedValue.hasOwnProperty('osType')).toEqual(true);
                expect(mergedValue.hasOwnProperty('osDisk')).toEqual(true);
                expect(mergedValue.osDisk.hasOwnProperty('caching')).toEqual(true);
                expect(mergedValue.osDisk.hasOwnProperty('createOption')).toEqual(true);
                expect(mergedValue.hasOwnProperty('adminUsername')).toEqual(true);
                expect(mergedValue.hasOwnProperty('storageAccounts')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('nameSuffix')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('skuType')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('accounts')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('managed')).toEqual(true);
                expect(mergedValue.hasOwnProperty('diagnosticStorageAccounts')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('nameSuffix')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('skuType')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('accounts')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('managed')).toEqual(true);
                expect(mergedValue.hasOwnProperty('nics')).toEqual(true);
                expect(mergedValue.nics.length).toEqual(0);
                expect(mergedValue.hasOwnProperty('imageReference')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('publisher')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('offer')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('sku')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('version')).toEqual(true);
                expect(mergedValue.hasOwnProperty('dataDisks')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('diskSizeGB')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('caching')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('createOption')).toEqual(true);
                expect(mergedValue.hasOwnProperty('existingWindowsServerlicense')).toEqual(true);
                expect(mergedValue.hasOwnProperty('availabilitySet')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('platformFaultDomainCount')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('platformUpdateDomainCount')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('name')).toEqual(true);
                expect(mergedValue.hasOwnProperty('virtualNetwork')).toEqual(true);
                expect(mergedValue.hasOwnProperty('tags')).toEqual(true);
            });
            it('validate defaults do not override settings.', () => {
                let settings = {
                    vmCount: 2,
                    osType: 'windows'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.vmCount).toEqual(2);
            });
            it('validate additional properties in settings are not removed.', () => {
                let settings = {
                    adminPassword: 'test',
                    osType: 'windows'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.hasOwnProperty('adminPassword')).toEqual(true);
                expect(mergedValue.adminPassword).toEqual('test');
            });
            it('validate default nics are not added if provided.', () => {
                let settings = {
                    nics: [
                        {
                            isPublic: true,
                            subnetName: 'web',
                            privateIPAllocationMethod: 'Static',
                            publicIPAllocationMethod: 'Static',
                            startingIPAddress: '10.0.1.240',
                            isPrimary: true,
                            dnsServers: [
                                '10.0.1.240',
                                '10.0.1.242'
                            ]
                        },
                        {
                            isPrimary: false,
                            subnetName: 'biz',
                            privateIPAllocationMethod: 'Dynamic',
                            enableIPForwarding: false,
                            domainNameLabelPrefix: '',
                            dnsServers: []
                        }
                    ],
                    osType: 'windows'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.nics.length).toEqual(2);
                expect(mergedValue.nics[0].subnetName).toEqual('web');
                expect(mergedValue.nics[1].subnetName).toEqual('biz');
            });
            it('validates that individual nics are merged with defaults', () => {
                let settings = {
                    nics: [
                        {
                            isPublic: true,
                            isPrimary: true,
                            subnetName: 'web',
                            privateIPAllocationMethod: 'Static',
                            publicIPAllocationMethod: 'Static',
                            startingIPAddress: '10.0.1.240',
                            dnsServers: [
                                '10.0.1.240',
                                '10.0.1.242'
                            ]
                        },
                        {
                            subnetName: 'biz',
                            privateIPAllocationMethod: 'Dynamic'
                        }
                    ],
                    osType: 'windows'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.nics.length).toEqual(2);
                expect(mergedValue.nics[0].isPrimary).toEqual(true);
                expect(mergedValue.nics[0].isPublic).toEqual(true);
                expect(mergedValue.nics[0].subnetName).toEqual('web');
                expect(mergedValue.nics[0].privateIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[0].publicIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[0].startingIPAddress).toEqual('10.0.1.240');
                expect(mergedValue.nics[0].enableIPForwarding).toEqual(false);
                expect(mergedValue.nics[0].domainNameLabelPrefix).toEqual('');
                expect(mergedValue.nics[0].dnsServers.length).toEqual(2);

                expect(mergedValue.nics[1].isPublic).toEqual(true);
                expect(mergedValue.nics[1].isPrimary).toEqual(false);
                expect(mergedValue.nics[1].subnetName).toEqual('biz');
                expect(mergedValue.nics[1].privateIPAllocationMethod).toEqual('Dynamic');
                expect(mergedValue.nics[1].publicIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[1].startingIPAddress).toEqual('');
                expect(mergedValue.nics[1].enableIPForwarding).toEqual(false);
                expect(mergedValue.nics[1].domainNameLabelPrefix).toEqual('');
                expect(mergedValue.nics[1].dnsServers.length).toEqual(0);
            });
            it('validates that storage is merged with defaults', () => {
                let settings = {
                    storageAccounts: {
                        count: 5,
                        managed: true
                    },
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.storageAccounts.nameSuffix).toEqual('st');
                expect(mergedValue.storageAccounts.count).toEqual(5);
                expect(mergedValue.storageAccounts.skuType).toEqual('Premium_LRS');
                expect(mergedValue.storageAccounts.managed).toEqual(true);
                expect(mergedValue.storageAccounts.accounts.length).toEqual(0);
            });
            it('validates that diagnostic storage is merged with defaults', () => {
                let settings = {
                    diagnosticStorageAccounts: {
                        count: 5,
                        managed: true
                    },
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.diagnosticStorageAccounts.nameSuffix).toEqual('diag');
                expect(mergedValue.diagnosticStorageAccounts.count).toEqual(5);
                expect(mergedValue.diagnosticStorageAccounts.skuType).toEqual('Standard_LRS');
                expect(mergedValue.diagnosticStorageAccounts.managed).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.accounts.length).toEqual(0);
            });
            it('validates that osDisk is merged with defaults', () => {
                let settings = {
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.osDisk.caching).toEqual('ReadWrite');
                expect(mergedValue.osDisk.createOption).toEqual('fromImage');
            });
            it('validates that datadisk is merged with defaults', () => {
                let settings = {
                    dataDisks: {
                        count: 2,
                        diskSizeGB: 127
                    },
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.dataDisks.count).toEqual(2);
                expect(mergedValue.dataDisks.caching).toEqual('None');
                expect(mergedValue.dataDisks.createOption).toEqual('empty');
                expect(mergedValue.dataDisks.diskSizeGB).toEqual(127);

            });
            it('validates that imageReference is merged with defaults', () => {
                let settings = {
                    imageReference: {},
                    osType: 'windows'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.imageReference.publisher).toEqual('MicrosoftWindowsServer');
                expect(mergedValue.imageReference.offer).toEqual('WindowsServer');
                expect(mergedValue.imageReference.sku).toEqual('2016-Datacenter');
                expect(mergedValue.imageReference.version).toEqual('latest');
            });
            it('validates secrets is merged with defaults', () => {
                let settings = {
                    secrets: [
                        {
                            keyVault: {
                                name: 'test-keyvault'
                            },
                            certificates: [
                                {
                                    certificateUrl: 'certificate-url'
                                }
                            ]
                        }
                    ],
                    osType: 'windows'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.secrets[0].certificates[0].certificateStore).toEqual('My');
            });
        });
        describe('Linux:', () => {
            it('validates that properties for linux are applied', () => {
                let settings = { vmCount: 2, osType: 'linux' };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.hasOwnProperty('vmCount')).toEqual(true);
                expect(mergedValue.hasOwnProperty('namePrefix')).toEqual(true);
                expect(mergedValue.hasOwnProperty('computerNamePrefix')).toEqual(true);
                expect(mergedValue.hasOwnProperty('size')).toEqual(true);
                expect(mergedValue.hasOwnProperty('osType')).toEqual(true);
                expect(mergedValue.hasOwnProperty('osDisk')).toEqual(true);
                expect(mergedValue.osDisk.hasOwnProperty('caching')).toEqual(true);
                expect(mergedValue.osDisk.hasOwnProperty('createOption')).toEqual(true);
                expect(mergedValue.hasOwnProperty('adminUsername')).toEqual(true);
                expect(mergedValue.hasOwnProperty('storageAccounts')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('nameSuffix')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('skuType')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('accounts')).toEqual(true);
                expect(mergedValue.storageAccounts.hasOwnProperty('managed')).toEqual(true);
                expect(mergedValue.hasOwnProperty('diagnosticStorageAccounts')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('nameSuffix')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('skuType')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('accounts')).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.hasOwnProperty('managed')).toEqual(true);
                expect(mergedValue.hasOwnProperty('nics')).toEqual(true);
                expect(mergedValue.nics.length).toEqual(0);
                expect(mergedValue.hasOwnProperty('imageReference')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('publisher')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('offer')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('sku')).toEqual(true);
                expect(mergedValue.imageReference.hasOwnProperty('version')).toEqual(true);
                expect(mergedValue.hasOwnProperty('dataDisks')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('count')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('diskSizeGB')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('caching')).toEqual(true);
                expect(mergedValue.dataDisks.hasOwnProperty('createOption')).toEqual(true);
                expect(mergedValue.hasOwnProperty('availabilitySet')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('platformFaultDomainCount')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('platformUpdateDomainCount')).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('name')).toEqual(true);
                expect(mergedValue.hasOwnProperty('virtualNetwork')).toEqual(true);
                expect(mergedValue.hasOwnProperty('tags')).toEqual(true);
            });
            it('validate defaults do not override settings.', () => {
                let settings = {
                    vmCount: 2,
                    osType: 'linux'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.vmCount).toEqual(2);
            });
            it('validate additional properties in settings are not removed.', () => {
                let settings = {
                    adminPassword: 'test',
                    osType: 'linux'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.hasOwnProperty('adminPassword')).toEqual(true);
                expect(mergedValue.adminPassword).toEqual('test');
            });
            it('validate default nics are not added if provided.', () => {
                let settings = {
                    nics: [
                        {
                            isPublic: true,
                            subnetName: 'web',
                            privateIPAllocationMethod: 'Static',
                            publicIPAllocationMethod: 'Static',
                            startingIPAddress: '10.0.1.240',
                            isPrimary: true,
                            dnsServers: [
                                '10.0.1.240',
                                '10.0.1.242'
                            ]
                        },
                        {
                            isPrimary: false,
                            subnetName: 'biz',
                            privateIPAllocationMethod: 'Dynamic',
                            enableIPForwarding: false,
                            domainNameLabelPrefix: '',
                            dnsServers: []
                        }
                    ],
                    osType: 'linux'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.nics.length).toEqual(2);
                expect(mergedValue.nics[0].subnetName).toEqual('web');
                expect(mergedValue.nics[1].subnetName).toEqual('biz');
            });
            it('validates that individual nics are merged with defaults', () => {
                let settings = {
                    nics: [
                        {
                            isPrimary: true,
                            isPublic: true,
                            subnetName: 'web',
                            privateIPAllocationMethod: 'Static',
                            publicIPAllocationMethod: 'Static',
                            startingIPAddress: '10.0.1.240',
                            dnsServers: [
                                '10.0.1.240',
                                '10.0.1.242'
                            ]
                        },
                        {
                            subnetName: 'biz'
                        }
                    ],
                    osType: 'linux'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.nics.length).toEqual(2);
                expect(mergedValue.nics[0].isPublic).toEqual(true);
                expect(mergedValue.nics[0].subnetName).toEqual('web');
                expect(mergedValue.nics[0].privateIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[0].publicIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[0].startingIPAddress).toEqual('10.0.1.240');
                expect(mergedValue.nics[0].enableIPForwarding).toEqual(false);
                expect(mergedValue.nics[0].domainNameLabelPrefix).toEqual('');
                expect(mergedValue.nics[0].dnsServers.length).toEqual(2);
                expect(mergedValue.nics[0].isPrimary).toEqual(true);

                expect(mergedValue.nics[1].isPublic).toEqual(true);
                expect(mergedValue.nics[1].subnetName).toEqual('biz');
                expect(mergedValue.nics[1].privateIPAllocationMethod).toEqual('Dynamic');
                expect(mergedValue.nics[1].publicIPAllocationMethod).toEqual('Static');
                expect(mergedValue.nics[1].startingIPAddress).toEqual('');
                expect(mergedValue.nics[1].enableIPForwarding).toEqual(false);
                expect(mergedValue.nics[1].domainNameLabelPrefix).toEqual('');
                expect(mergedValue.nics[1].dnsServers.length).toEqual(0);
                expect(mergedValue.nics[1].isPrimary).toEqual(false);
            });
            it('validates that storage is merged with defaults', () => {
                let settings = {
                    storageAccounts: {
                        count: 5,
                        managed: true
                    },
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.storageAccounts.nameSuffix).toEqual('st');
                expect(mergedValue.storageAccounts.count).toEqual(5);
                expect(mergedValue.storageAccounts.skuType).toEqual('Premium_LRS');
                expect(mergedValue.storageAccounts.managed).toEqual(true);
                expect(mergedValue.storageAccounts.accounts.length).toEqual(0);
            });
            it('validates that diagnostic storage is merged with defaults', () => {
                let settings = {
                    diagnosticStorageAccounts: {
                        count: 5,
                        managed: true
                    },
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.diagnosticStorageAccounts.nameSuffix).toEqual('diag');
                expect(mergedValue.diagnosticStorageAccounts.count).toEqual(5);
                expect(mergedValue.diagnosticStorageAccounts.skuType).toEqual('Standard_LRS');
                expect(mergedValue.diagnosticStorageAccounts.managed).toEqual(true);
                expect(mergedValue.diagnosticStorageAccounts.accounts.length).toEqual(0);
            });
            it('validates that osDisk is merged with defaults', () => {
                let settings = {
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.osDisk.caching).toEqual('ReadWrite');
                expect(mergedValue.osDisk.createOption).toEqual('fromImage');
            });
            it('validates that datadisk is merged with defaults', () => {
                let settings = {
                    dataDisks: {
                        count: 2,
                        diskSizeGB: 127
                    },
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.dataDisks.count).toEqual(2);
                expect(mergedValue.dataDisks.caching).toEqual('None');
                expect(mergedValue.dataDisks.createOption).toEqual('empty');
                expect(mergedValue.dataDisks.diskSizeGB).toEqual(127);

            });
            it('validates that imageReference is merged with defaults', () => {
                let settings = {
                    imageReference: {},
                    osType: 'linux'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.imageReference.publisher).toEqual('Canonical');
                expect(mergedValue.imageReference.offer).toEqual('UbuntuServer');
                expect(mergedValue.imageReference.sku).toEqual('16.04-LTS');
                expect(mergedValue.imageReference.version).toEqual('latest');

            });
            it('validates secrets is merged with defaults', () => {
                let settings = {
                    osType: 'linux'
                };

                let mergedValue = merge({ settings, buildingBlockSettings });
                expect(mergedValue.secrets).toEqual([]);
            });
        });
    });
    describe('user defaults:', () => {
        let merge = virtualMachineSettings.__get__('merge');

        let windowsDefaults = {
            vmCount: 1,
            namePrefix: 'test',
            computerNamePrefix: 'test',
            size: 'Standard_DS2_v2',
            osType: 'windows',
            osDisk: {
                caching: 'ReadWrite',
                createOption: 'fromImage'
            },
            adminUsername: 'adminUser',
            storageAccounts: {},
            diagnosticStorageAccounts: {},
            nics: [{}],
            imageReference: {
                publisher: 'MicrosoftWindowsServer',
                offer: 'WindowsServer',
                sku: '2012-R2-Datacenter',
                version: 'latest'
            },
            dataDisks: {
                count: 0,
                diskSizeGB: 127,
                caching: 'None',
                createOption: 'empty'
            },
            existingWindowsServerlicense: false,
            availabilitySet: {
                platformFaultDomainCount: 6,
                platformUpdateDomainCount: 10,
                name: 'default-as'
            },
            scaleSetSettings: {
                name: 'company-scaleset',
                upgradePolicy: 'Automatic',
                overprovision: false,
                singlePlacementGroup: false
            },
            virtualNetwork: {},
            loadBalancerSettings: {
                frontendIPConfigurations: [
                    {
                        name: 'userdefault-feConfig',
                        loadBalancerType: 'Public'
                    }
                ]
            },
            tags: {}
        };

        let userDefaults;
        let settings;

        beforeEach(() => {
            userDefaults = _.cloneDeep(windowsDefaults);
            settings = _.cloneDeep(testSettings);
        });

        it('loadBalancerSettings not added if not specified in parameters or userDefaults', () => {
            delete userDefaults.loadBalancerSettings;
            delete settings.loadBalancerSettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.loadBalancerSettings).toBeUndefined();
        });

        it('loadBalancerSettings added if not specified in parameters but specified in userDefaults', () => {
            delete settings.loadBalancerSettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.loadBalancerSettings).toBeDefined();
        });

        it('applicationGatewaySettings not added if not specified in parameters or userDefaults', () => {
            delete userDefaults.applicationGatewaySettings;
            delete settings.applicationGatewaySettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.applicationGatewaySettings).toBeUndefined();
        });

        it('applicationGatewaySettings added if not specified in parameters but specified in userDefaults', () => {
            userDefaults.applicationGatewaySettings = {};
            delete settings.applicationGatewaySettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.applicationGatewaySettings).toBeDefined();
        });

        it('scaleSetSettings not added if not specified in parameters or userDefaults', () => {
            delete userDefaults.scaleSetSettings;
            delete settings.scaleSetSettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.scaleSetSettings).toBeUndefined();
        });

        it('scaleSetSettings added if not specified in parameters but specified in userDefaults', () => {
            delete settings.scaleSetSettings;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.scaleSetSettings).toBeDefined();
        });

        it('overrides vmCount', () => {
            userDefaults.vmCount = 5;
            let settings = _.cloneDeep(testSettings);
            delete settings.vmCount;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.vmCount).toEqual(5);
        });

        it('overrides namePrefix', () => {
            userDefaults.namePrefix = 'contoso';
            delete settings.namePrefix;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.namePrefix.substring(0, 7)).toEqual('contoso');
        });

        it('overrides computerNamePrefix', () => {
            userDefaults.computerNamePrefix = 'contoso';
            delete settings.computerNamePrefix;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.computerNamePrefix.substring(0, 7)).toEqual('contoso');
        });

        it('overrides size', () => {
            userDefaults.size = 'Standard_DS5_v2';
            delete settings.size;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.size).toEqual('Standard_DS5_v2');
        });

        describe('osDisk defaults:', () => {
            it('overrides caching', () => {
                userDefaults.osDisk.caching = 'ReadOnly';
                delete settings.osDisk.caching;
                let results = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(results.osDisk.caching).toEqual('ReadOnly');
            });
            it('overrides createOption', () => {
                userDefaults.osDisk.createOption = 'attach';
                delete settings.osDisk.createOption;
                let results = merge({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(results.osDisk.createOption).toEqual('attach');
            });
        });

        it('overrides adminUsername', () => {
            userDefaults.adminUsername = 'superuser';
            delete settings.adminUsername;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.adminUsername).toEqual('superuser');
        });
        it('overrides storageAccounts', () => {
            userDefaults.storageAccounts.managed = false;
            userDefaults.storageAccounts.nameSuffix = 'some';
            userDefaults.storageAccounts.count = 5;
            delete settings.storageAccounts;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.storageAccounts.managed).toEqual(false);
            expect(results.storageAccounts.nameSuffix).toEqual('some');
            expect(results.storageAccounts.count).toEqual(5);
        });
        it('overrides diagnosticStorageAccounts', () => {
            userDefaults.diagnosticStorageAccounts.managed = true;
            userDefaults.diagnosticStorageAccounts.nameSuffix = 'some';
            userDefaults.diagnosticStorageAccounts.count = 5;
            delete settings.diagnosticStorageAccounts;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.diagnosticStorageAccounts.managed).toEqual(true);
            expect(results.diagnosticStorageAccounts.nameSuffix).toEqual('some');
            expect(results.diagnosticStorageAccounts.count).toEqual(5);
        });
        it('overrides nics', () => {
            userDefaults.nics = [{
                isPrimary: false,
                isPublic: false,
                domainNameLabelPrefix: 'some',
            }];
            settings.nics = [
                {
                    privateIPAllocationMethod: 'Dynamic',
                    enableIPForwarding: false,
                },
                {
                    privateIPAllocationMethod: 'Dynamic',
                    enableIPForwarding: true,
                }
            ];
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.nics.length).toEqual(2);
            expect(results.nics[0].isPublic).toEqual(false);
            expect(results.nics[0].isPrimary).toEqual(false);
            expect(results.nics[0].domainNameLabelPrefix).toEqual('some');
            expect(results.nics[0].privateIPAllocationMethod).toEqual('Dynamic');
            expect(results.nics[0].enableIPForwarding).toEqual(false);
            expect(results.nics[1].isPublic).toEqual(false);
            expect(results.nics[1].isPrimary).toEqual(false);
            expect(results.nics[1].domainNameLabelPrefix).toEqual('some');
            expect(results.nics[1].enableIPForwarding).toEqual(true);
        });
        it('overrides windows imageReference', () => {
            userDefaults.imageReference.sku = '2008-R2-SP1';
            let settings = _.cloneDeep(testSettings);
            delete settings.imageReference;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.imageReference.sku).toEqual('2008-R2-SP1');
        });
        it('overrides debian imageReference', () => {
            userDefaults.osType = 'linux';
            userDefaults.imageReference.offer = 'Debian';
            userDefaults.imageReference.sku = '8';
            userDefaults.imageReference.version = '8.0.201701180';
            delete settings.imageReference;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.imageReference.offer).toEqual('Debian');
            expect(results.imageReference.sku).toEqual('8');
            expect(results.imageReference.version).toEqual('8.0.201701180');
        });
        it('overrides dataDisks', () => {
            userDefaults.dataDisks = {
                count: 5,
                diskSizeGB: 256
            };
            delete settings.dataDisks;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.dataDisks.count).toEqual(5);
            expect(results.dataDisks.diskSizeGB).toEqual(256);
        });
        it('overrides virtualNetwork', () => {
            userDefaults.virtualNetwork = {
                subnets: [
                    {
                        name: 'web',
                        addressPrefix: '10.0.1.0/24'
                    },
                    {
                        name: 'biz',
                        addressPrefix: '10.0.2.0/24'
                    }
                ],
                virtualNetworkPeerings: [
                    {
                        allowForwardedTraffic: true,
                    }
                ]
            };
            delete settings.virtualNetwork;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.virtualNetwork.subnets.length).toEqual(2);
            expect(results.virtualNetwork.subnets[0].name).toEqual('web');
            expect(results.virtualNetwork.subnets[1].addressPrefix).toEqual('10.0.2.0/24');
            expect(results.virtualNetwork.virtualNetworkPeerings[0].allowForwardedTraffic).toEqual(true);
        });
        it('overrides usePlan', () => {
            userDefaults.usePlan = true;
            delete settings.usePlan;
            let results = merge({
                settings: settings,
                buildingBlockSettings: buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(results.usePlan).toEqual(true);
        });
        it('when load balancer name is not specified neither at user-params nor user-defaults, should use vm namePrefix.', () => {
            settings.loadBalancerSettings = {};
            let mergedValue = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(mergedValue.loadBalancerSettings.name).toEqual(`${settings.namePrefix}-lb`);
        });
        it('validates load balancer settings with user-defaults', () => {
            let mergedValue = merge({
                settings,
                buildingBlockSettings,
                defaultSettings: userDefaults
            });
            expect(_.isPlainObject(mergedValue.nics[0].publicIpAddress)).toEqual(true);
            expect(mergedValue.nics[0].publicIpAddress.publicIPAllocationMethod).toEqual('Static');
            expect(mergedValue.nics[0].publicIpAddress.publicIPAddressVersion).toEqual('IPv4');
            expect(mergedValue.loadBalancerSettings.frontendIPConfigurations.length).toEqual(1);
            expect(mergedValue.loadBalancerSettings.frontendIPConfigurations[0].name).toEqual('userdefault-feConfig');
            //expect(mergedValue.loadBalancerSettings.frontendIPConfigurations[0].publicIpAddress.name).toEqual('undefined-userdefault-feConfig-pip');
            expect(_.isPlainObject(mergedValue.nics[1].publicIpAddress)).toEqual(false);
        });
        describe('AvailabilitySet:', () => {
            it('validates that no errors are thrown if AvailabilitySet is not provided but user-defaults', () => {
                let customSettings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(6);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(10);
            });
            it('validates that AvSet name property is applied for vmcount > 1 and not overriden by user-defaults', () => {
                let customSettings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows',
                    availabilitySet: {
                        platformFaultDomainCount: 6,
                        platformUpdateDomainCount: 10,
                        name: 'user-as'
                    }
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.name).toEqual('user-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(6);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(10);
            });
            it('validates that AvSet name property is not applied for vmcount <= 1', () => {
                let customSettings = {
                    namePrefix: 'uservm',
                    vmCount: 1,
                    osType: 'Windows'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.hasOwnProperty('name')).toEqual(true);
                expect(mergedValue.availabilitySet.name).toEqual('default-as');
            });
            it('validates that validate that name of avSet is merged if provided thru user-defaults', () => {
                let customSettings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.availabilitySet)).toEqual(true);
                expect(mergedValue.availabilitySet.name).toEqual('default-as');
            });
            it('validates that avset is merged with user-defaults for windows', () => {
                let customSettings = {
                    availabilitySet: {
                        name: 'test-as'
                    },
                    osType: 'Windows'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(mergedValue.availabilitySet.name).toEqual('test-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(6);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(10);
            });
            it('validates that avset is merged with user-defaults for linux', () => {
                let customSettings = {
                    availabilitySet: {
                        name: 'test-as'
                    },
                    osType: 'Linux'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(mergedValue.availabilitySet.name).toEqual('test-as');
                expect(mergedValue.availabilitySet.platformFaultDomainCount).toEqual(6);
                expect(mergedValue.availabilitySet.platformUpdateDomainCount).toEqual(10);
            });
        });
        describe('ScaleSetSettings:', () => {
            it('validates that no errors are thrown if ScaleSetSettings is not provided but user-defaults', () => {
                let customSettings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows'
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.scaleSetSettings)).toEqual(true);
                expect(mergedValue.scaleSetSettings.overprovision).toEqual(false);
                expect(mergedValue.scaleSetSettings.singlePlacementGroup).toEqual(false);
            });
            it('validates that overrides happen for user-params ScaleSetSettings on top of user-defaults when defined', () => {
                let customSettings = {
                    namePrefix: 'testvm',
                    vmCount: 2,
                    osType: 'Windows',
                    scaleSetSettings: {
                        upgradePolicy: 'Automatic',
                        overprovision: true,
                        singlePlacementGroup: true
                    }
                };
                let mergedValue = merge({
                    settings: customSettings,
                    buildingBlockSettings,
                    defaultSettings: userDefaults
                });
                expect(_.isPlainObject(mergedValue.scaleSetSettings)).toEqual(true);
                expect(mergedValue.scaleSetSettings.overprovision).toEqual(true);
                expect(mergedValue.scaleSetSettings.singlePlacementGroup).toEqual(true);
            });
        });
    });

    describe('validate:', () => {
        let validate = virtualMachineSettings.__get__('validate');
        let settings;

        beforeEach(() => {
            settings = _.cloneDeep(testSettings);
            info = _.pick(buildingBlockSettings, ['resourceGroupName', 'location', 'subscriptionId']);
            _.merge(settings, info);
            _.merge(settings.storageAccounts, info);
            _.merge(settings.diagnosticStorageAccounts, info);
            settings.nics = _.map(settings.nics, (nic) => _.merge(nic, info));
            _.merge(settings.availabilitySet, info);
            _.merge(settings.virtualNetwork, info);
        });

        it('validates that vmcount is greater than 0', () => {
            settings.vmCount = 5;
            let result = validate(settings);
            expect(result.length).toEqual(0);
        });
        it('validates that vmcount errors out if lower than 1', () => {
            settings.vmCount = 0;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.vmCount');
        });
        it('validates that vmcount errors out if NaN', () => {
            settings.vmCount = '0';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.vmCount');
        });
        it('validates that vmcount errors out if null', () => {
            settings.vmCount = null;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.vmCount');
        });
        it('validates that works when valid structure', () => {
            let result = validate(settings);
            expect(result.length).toEqual(0);
        });
        it('validates that namePrefix is not null', () => {
            settings.namePrefix = null;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.namePrefix');
        });
        it('validates that namePrefix is not empty', () => {
            settings.namePrefix = '';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.namePrefix');
        });
        it('validates that if computerNamePrefix is not specified, then namePrefix is provided', () => {
            let merge = virtualMachineSettings.__get__('merge');
            settings.computerNamePrefix = null;

            let mergedValue = merge({ settings, buildingBlockSettings });
            mergedValue.namePrefix = null;

            let result = validate(mergedValue);
            expect(result.length).toEqual(2);
        });
        it('validates that if computerNamePrefix is not specified, then length of computer name computed using namePrefix is <= 15', () => {
            settings.computerNamePrefix = '';
            settings.vmCount = 101;
            settings.namePrefix = 'test123456'; // test123456-vm101
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.computerNamePrefix');
        });
        it('validates that if computerNamePrefix is not specified, then length of computer name computed using namePrefix is <= 15', () => {
            settings.computerNamePrefix = '';
            settings.vmCount = 101;
            settings.namePrefix = 'test12345'; // test12345-vm101
            let result = validate(settings);
            expect(result.length).toEqual(0);
        });
        it('validates that if computerNamePrefix is specified, then length of computer name computed using computerNamePrefix is <= 15', () => {
            settings.computerNamePrefix = 'test12345678'; // test12345678101
            settings.vmCount = 101;
            let result = validate(settings);
            expect(result.length).toEqual(0);
        });
        it('validates that if computerNamePrefix is specified, then length of computer name computed using computerNamePrefix is <= 15', () => {
            settings.computerNamePrefix = 'test123456789'; // test123456789101
            settings.vmCount = 101;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.computerNamePrefix');
        });
        it('validates that vm size is not null', () => {
            settings.size = null;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.size');
        });
        it('validates that vm size is not empty', () => {
            settings.size = '';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.size');
        });
        it('validates that vm adminUsername is not null', () => {
            settings.adminUsername = null;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('validates that vm adminUsername is not empty', () => {
            settings.adminUsername = '';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('validates that vm adminUsername property exists', () => {
            delete settings.adminUsername;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('adminUsername cannot be more than 20 characters long', () => {
            settings.adminUsername = 'a1234567890123456789sadasdsadsadsadsdsadsadasdsa';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('adminUsername cannot end with a period(.)', () => {
            settings.adminUsername = 'abc.';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('adminUsername cannot contains these characters: " [ ] : | < > + = ; , ? * @', () => {
            settings.adminUsername = 'abc"a';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc[a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc]a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc:a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc|a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc<a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc>a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc+a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc=a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc;a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc,a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc?a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc*a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');

            settings.adminUsername = 'abc@a';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminUsername');
        });
        it('adminPassword must be between 6-72 characters long', () => {
            settings.adminPassword = Array(5).join('a');
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');

            settings.adminPassword = settings.adminPassword = Array(80).join('a');
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');
        });
        it('adminPassword must satisfy at least 3 of password complexity requirements', () => {
            // The supplied password must be between 6-72 characters long and must satisfy at least 3 of password complexity requirements from the following:
            // 1) Contains an uppercase character
            // 2) Contains a lowercase character
            // 3) Contains a numeric digit
            // 4) Contains a special character
            settings.adminPassword = 'abc12$34abc';
            let result = validate(settings);
            expect(result.length).toEqual(0);

            settings.adminPassword = 'AB34SDF@F';
            result = validate(settings);
            expect(result.length).toEqual(0);

            settings.adminPassword = 'abc1234abc';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');

            settings.adminPassword = 'abcdedfrgrgrgr';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');

            settings.adminPassword = 'ASDASDASDSADSAD';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');

            settings.adminPassword = '123123123123';
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');
        });
        it('validates that both password & ssh cannot be null or empty', () => {
            settings.sshPublicKey = null;
            settings.adminPassword = null;
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.adminPassword');

            settings.osType = 'linux';
            settings.sshPublicKey = null;
            settings.adminPassword = null;
            result = validate(settings);
            expect(result.length > 0).toEqual(true);
            expect(result[0].name === '.sshPublicKey' || result[0].name === '.adminPassword').toEqual(true);

        });
        it('validates that virtual network name cannot be null or empty', () => {
            settings.virtualNetwork.name = '';
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.virtualNetwork.name');

            settings.virtualNetwork.name = null;
            result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.virtualNetwork.name');
        });

        it('validates that usePlan cannot be true for osDisk.createOption != fromImage', () => {
            settings.usePlan = true;
            delete settings.imageReference;
            settings.osDisk.createOption = 'attach';
            settings.osDisk.images = [
                '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-group-name/providers/Microsoft.Compute/disks/os-disk1-name',
                '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-group-name/providers/Microsoft.Compute/disks/os-disk2-name'
            ];
            let result = validate(settings);
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual('.usePlan');
        });
        describe('customData: ', () => {
            it('undefined', () => {
                delete settings.customData;
                let result = validate(settings);
                expect(result.length).toEqual(0);
            });
            it('null', () => {
                settings.customData = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.customData');
            });
            it('empty string', () => {
                settings.customData = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.customData');
            });
            it('whitespace', () => {
                settings.customData = ' ';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.customData');
            });
        });
        describe('AvailabilitySet:', () => {
            it('validates that no validation errors are thrown if name is not present in avSet', () => {
                delete settings.availabilitySet.name;
                settings.availabilitySet.platformFaultDomainCount = 100;
                settings.availabilitySet.platformUpdateDomainCount = 100;
                let result = validate(settings);
                expect(result.length).toEqual(0);
            });
            it('validates that validation is done and errors are thrown if name present in avSet', () => {
                settings.availabilitySet.platformFaultDomainCount = 100;
                settings.availabilitySet.platformUpdateDomainCount = 100;
                let result = validate(settings);
                expect(result.length).toEqual(2);
                expect(result[0].name).toEqual('.availabilitySet.platformFaultDomainCount');
                expect(result[1].name).toEqual('.availabilitySet.platformUpdateDomainCount');
            });
        });
        describe('nics:', () => {
            let lbSettings = {
                loadBalancerSettings: {
                    location: buildingBlockSettings.location,
                    resourceGroupName: buildingBlockSettings.resourceGroupName,
                    subscriptionId: buildingBlockSettings.subscriptionId,
                    frontendIPConfigurations: [
                        {
                            name: 'lb-fe-config1',
                            loadBalancerType: 'Public'
                        }
                    ],
                    loadBalancingRules: [
                        {
                            name: 'lbr1',
                            frontendPort: 80,
                            backendPort: 80,
                            protocol: 'Tcp',
                            backendPoolName: 'bep1',
                            frontendIPConfigurationName: 'lb-fe-config1',
                            enableFloatingIP: false,
                            probeName: 'lbp1'
                        }
                    ],
                    probes: [
                        {
                            name: 'lbp1',
                            port: 80,
                            protocol: 'Http',
                            requestPath: '/'
                        }
                    ],
                    backendPools: [
                        {
                            name: 'bep1'
                        },
                        {
                            name: 'bep2'
                        }
                    ],
                    inboundNatRules: [
                        {
                            name: 'natrule1',
                            protocol: 'Tcp',
                            startingFrontendPort: 2000,
                            backendPort: 3389,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        },
                        {
                            name: 'natrule2',
                            protocol: 'Tcp',
                            startingFrontendPort: 3000,
                            backendPort: 22,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        }
                    ],
                    inboundNatPools: [
                        {
                            name: 'natpool1',
                            protocol: 'Tcp',
                            startingFrontendPort: 2000,
                            frontendPortRangeEnd: 2010,
                            backendPort: 3389,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        },
                        {
                            name: 'natpool2',
                            protocol: 'Tcp',
                            startingFrontendPort: 3000,
                            frontendPortRangeEnd: 3010,
                            backendPort: 22,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        }
                    ]
                }
            };

            let nicSettings = {
                nics: [
                    {
                        location: buildingBlockSettings.location,
                        resourceGroupName: buildingBlockSettings.resourceGroupName,
                        subscriptionId: buildingBlockSettings.subscriptionId,
                        isPublic: false,
                        isPrimary: true,
                        privateIPAllocationMethod: 'Static',
                        startingIPAddress: '10.0.2.4',
                        subnetName: 'subnet1',
                        backendPoolNames: [
                            {
                                name: 'bep1',
                                loadBalancerName: 'lb1',
                                resourceGroupName: 'lb1-rg',
                                subscriptionId: '00000000-0000-1000-AA00-000000000000'

                            },
                            'bep2'
                        ],
                        inboundNatRulesNames: [
                            {
                                name: 'natrule1'
                            },
                            'natrule2'
                        ],
                        inboundNatPoolNames: [
                            {
                                name: 'natpool1',
                                loadBalancerName: 'lb3',
                                resourceGroupName: 'lb3-rg',
                                subscriptionId: '00000000-0000-1000-BB00-000000000000'
                            },
                            'natpool2'
                        ]
                    },
                    {
                        location: buildingBlockSettings.location,
                        resourceGroupName: buildingBlockSettings.resourceGroupName,
                        subscriptionId: buildingBlockSettings.subscriptionId,
                        isPublic: false,
                        privateIPAllocationMethod: 'Static',
                        startingIPAddress: '10.0.2.5',
                        subnetName: 'subnet1',
                        backendPoolNames: [
                            {
                                name: 'ss-lb-bep1',
                                loadBalancerName: 'lb4'
                            }
                        ],
                        inboundNatRulesNames: [
                            {
                                name: 'natrule1'
                            }
                        ],
                        inboundNatPoolNames: [
                            {
                                name: 'natpool1',
                                loadBalancerName: 'lb6'
                            }
                        ]
                    }
                ]
            };
            it('validates that if loadbalancer is not specified then NatRules cannot be specified', () => {
                settings.nics[0].inboundNatRulesNames = nicSettings.nics[0].inboundNatRulesNames;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('inboundNatRules cannot be specified');
            });
            it('validates that if NOT scaleset then NatPools cannot be specified', () => {
                settings.nics[0].inboundNatPoolNames = nicSettings.nics[0].inboundNatPoolNames;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('inboundNatPoolNames can only be specified for scalesets');
            });
            it('validates that if scaleset then NatPools name in nics matchs the names in loadbalancer', () => {
                settings.scaleSetSettings = {
                    name: 'scaleSet-lb',
                    upgradePolicy: 'Automatic',
                    overprovision: true,
                    singlePlacementGroup: true
                };
                settings.nics[0].inboundNatPoolNames = ['natpool1'];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatRules = [];
                let result = validate(settings);
                expect(result.length).toEqual(0);

                settings.nics[0].inboundNatPoolNames = ['test'];
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('InboundNatPool test specified in nic[0] is not valid');
            });
            it('validates that NatRule names in nics matchs the names in loadbalancer', () => {
                settings.nics[0].inboundNatRulesNames = ['natrule1'];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatPools = [];
                let result = validate(settings);
                expect(result.length).toEqual(0);

                settings.nics[0].inboundNatRulesNames = ['test'];
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('InboundNatRule test specified in nic[0] is not valid');
            });
            it('validates that NatRule names in nics cannot reference existing loadbalancer', () => {
                settings.nics[0].inboundNatRulesNames = [{name: 'natrule1', loadBalancerName: 'xyz'}];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatPools = [];
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('cannot reference an existing loadBalancer');
            });
            it('validates that bep name in nics match the names in loadbalancer', () => {
                settings.nics[0].backendPoolNames = ['bep1'];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatPools = [];
                let result = validate(settings);
                expect(result.length).toEqual(0);

                settings.nics[0].backendPoolNames = ['test'];
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('BackendPool test specified in nic[0] is not valid');
            });
            it('validates that subnets cannot be null or empty', () => {
                delete settings.nics;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');

                settings.nics = [];
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
            });
            it('validates that subnets cannot be null or empty', () => {
                settings.nics[0].subnetName = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].subnetName');

                settings.nics[0].subnetName = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].subnetName');
            });
            it('validates that isPublic can only be boolean', () => {
                settings.nics[0].isPublic = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].isPublic');

                settings.nics[0].isPublic = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].isPublic');
            });
            it('validates that isPrimary can only be boolean', () => {
                settings.nics[1].isPrimary = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[1].isPrimary');

                settings.nics[1].isPrimary = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[1].isPrimary');
            });
            it('validates that enableIPForwarding can only be boolean', () => {
                settings.nics[0].enableIPForwarding = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].enableIPForwarding');

                settings.nics[0].enableIPForwarding = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].enableIPForwarding');
            });
            it('validates that only one nic can be set as primary', () => {
                settings.nics[1].isPrimary = true;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
            });
            it('validates that valid values for privateIPAllocationMethod are static and dynamic', () => {
                settings.nics[0].privateIPAllocationMethod = true;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].privateIPAllocationMethod');

                settings.nics[0].privateIPAllocationMethod = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].privateIPAllocationMethod');

                settings.nics[0].privateIPAllocationMethod = 'Static';
                settings.nics[1].privateIPAllocationMethod = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[1].privateIPAllocationMethod');
            });
            it('validates that when privateIPAllocationMethod is set as static, startingIPAddress cannot be null', () => {
                settings.nics[0].privateIPAllocationMethod = 'Static';
                settings.nics[0].startingIPAddress = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].privateIPAllocationMethod');

                settings.nics[0].startingIPAddress = 'test';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].privateIPAllocationMethod');
            });
            it('validates that dnsServers property can only have valid IP addresses or empty', () => {
                settings.nics[0].dnsServers = [];
                let result = validate(settings);
                expect(result.length).toEqual(0);

                settings.nics[0].dnsServers = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].dnsServers');

                settings.nics[0].dnsServers = ['A', 'B'];
                result = validate(settings);
                expect(result.length).toEqual(2);
                expect(result[0].name).toEqual('.nics[0].dnsServers[0]');
                expect(result[1].name).toEqual('.nics[0].dnsServers[1]');

                settings.nics[0].dnsServers = ['10.0.0.0', 'B'];
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics[0].dnsServers[1]');
            });
        });
        describe('storageAccounts:', () => {
            it('validates that nameSuffix is not null or empty', () => {
                settings.storageAccounts.nameSuffix = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.nameSuffix');

                settings.storageAccounts.nameSuffix = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.nameSuffix');
            });
            it('validates that count is greater than 0', () => {
                settings.storageAccounts.count = 0;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.count');
            });
            it('validates that skuType is not null or empty', () => {
                settings.storageAccounts.skuType = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.skuType');

                settings.storageAccounts.skuType = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.skuType');
            });
            it('validates that managed is provided and a boolean value', () => {
                settings.storageAccounts.managed = 'true';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.managed');

                settings.storageAccounts.managed = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.managed');
            });
            it('validates that account is provided', () => {
                settings.storageAccounts.accounts = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts.accounts');
            });
        });
        describe('diagnosticStorageAccounts:', () => {
            it('validates that nameSuffix is not null or empty', () => {
                settings.diagnosticStorageAccounts.nameSuffix = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.nameSuffix');

                settings.diagnosticStorageAccounts.nameSuffix = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.nameSuffix');
            });
            it('validates that count is greater than 0', () => {
                settings.diagnosticStorageAccounts.count = 0;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.count');
            });
            it('validates that skuType is not null or empty', () => {
                settings.diagnosticStorageAccounts.skuType = '';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.skuType');

                settings.diagnosticStorageAccounts.skuType = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.skuType');
            });
            it('validates that skuType is not premiun', () => {
                settings.diagnosticStorageAccounts.skuType = 'Premium_LRS';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.skuType');
            });
            it('validates that managed is provided and a boolean value', () => {
                settings.diagnosticStorageAccounts.managed = 'true';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.managed');

                settings.diagnosticStorageAccounts.managed = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.managed');
            });
            it('validates that managed cannot be true', () => {
                settings.diagnosticStorageAccounts.managed = true;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.managed');
            });
            it('validates that account is provided', () => {
                settings.diagnosticStorageAccounts.accounts = null;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts.accounts');
            });
        });
        describe('secrets:', () => {
            beforeEach(() => {
                settings.secrets = [
                    {
                        keyVault: {
                            name: 'test-keyvault',
                            location: buildingBlockSettings.location,
                            resourceGroupName: 'test-rg',
                            subscriptionId: '00000000-0000-1000-A000-000000000000'
                        },
                        certificates: [
                            {
                                certificateUrl: 'https://test-keyvault.vault.azure.net/secrets/testcertificate/00000000000000000000000000000000',
                                certificateStore: 'My'
                            }
                        ]
                    }
                ];
            });
            it('validates that no errors are thrown if secrets is undefined, null, or not an array', () => {
                delete settings.secrets;
                let result = validate(settings);
                expect(result.length).toEqual(0);

                settings.secrets = null;
                result = validate(settings);
                expect(result.length).toEqual(0);

                settings.secrets = {};
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets');
            });
            it('validates that no errors are thrown if secrets an empty array', () => {
                settings.secrets = [];
                let result = validate(settings);
                expect(result.length).toEqual(0);
            });
            it('validates that errors are thrown if keyVault is undefined or null', () => {
                delete settings.secrets[0].keyVault;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].keyVault');

                settings.secrets[0].keyVault = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].keyVault');
            });
            it('validates that errors are thrown if certificates is undefined, null, or not an array', () => {
                delete settings.secrets[0].certificates;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates');

                settings.secrets[0].certificates = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates');

                settings.secrets[0].certificates = {};
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates');
            });
            it('validates that errors are thrown if certificates is an empty array', () => {
                settings.secrets[0].certificates = [];
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates');
            });
            it('validates that errors are thrown if certificateUrl is undefined, null, or empty', () => {
                delete settings.secrets[0].certificates[0].certificateUrl;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateUrl');

                settings.secrets[0].certificates[0].certificateUrl = null;
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateUrl');

                settings.secrets[0].certificates[0].certificateUrl = '';
                result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateUrl');
            });
            describe('windows:', () => {
                beforeEach(() => {
                    settings.osType = 'windows';
                });

                it('validates that errors are thrown if certificateStore is undefined, null, or empty', () => {
                    delete settings.secrets[0].certificates[0].certificateStore;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateStore');

                    settings.secrets[0].certificates[0].certificateStore = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateStore');

                    settings.secrets[0].certificates[0].certificateStore = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateStore');
                });
            });
            describe('linux:', () => {
                beforeEach(() => {
                    settings.osType = 'linux';
                });

                it('validates that errors are thrown if certificateStore is not undefined', () => {
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.secrets[0].certificates[0].certificateStore');
                });
                it('validates that no errors are thrown if certificateStore is undefined', () => {
                    delete settings.secrets[0].certificates[0].certificateStore;
                    let result = validate(settings);
                    expect(result.length).toEqual(0);
                });
            });
        });
        describe('encryptionSettings', () => {
            describe('pre-encrypted settings', () => {
                beforeEach(() => {
                    settings.osDisk.encryptionSettings = {
                        diskEncryptionKey: {
                            secretUrl: 'https://test-keyvault.vault.azure.net/secrets/secret/00000000000000000000000000000000',
                            keyVault: {
                                name: 'test-keyvault',
                                resourceGroupName: 'test-rg',
                                subscriptionId: '00000000-0000-1000-A000-000000000000'
                            }
                        },
                        keyEncryptionKey: {
                            keyUrl: 'https://test-keyvault.vault.azure.net/keys/keyencryptionkey/00000000000000000000000000000000',
                            keyVault: {
                                name: 'test-keyvault',
                                resourceGroupName: 'test-rg',
                                subscriptionId: '00000000-0000-1000-A000-000000000000'
                            }
                        }
                    };
                });
            });
            describe('encryption extension', () => {
                beforeEach(() => {
                    settings.osDisk.encryptionSettings = {
                        aadClientId: '00000000-0000-1000-A000-000000000000',
                        aadClientCertThumbprint: '0000000000000000000000000000000000000000',
                        volumeType: 'All',
                        diskEncryptionKeyVaultUrl: 'https://test-keyvault.vault.azure.net/',
                        diskEncryptionKeyVault: {
                            name: 'test-keyvault',
                            resourceGroupName: 'test-rg',
                            subscriptionId: '00000000-0000-1000-A000-000000000000'
                        },
                        keyEncryptionKeyVault: {
                            name: 'test-keyvault',
                            resourceGroupName: 'test-rg',
                            subscriptionId: '00000000-0000-1000-A000-000000000000'
                        },
                        keyEncryptionKeyUrl: 'https://test-keyvault.vault.azure.net/keys/keyencryptionkey/00000000000000000000000000000000'
                    };
                });
                it('validates that errors are thrown if both aadClientId is undefined, null, or empty', () => {
                    delete settings.osDisk.encryptionSettings.aadClientId;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.aadClientId');

                    settings.osDisk.encryptionSettings.aadClientId = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.aadClientId');

                    settings.osDisk.encryptionSettings.aadClientId = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.aadClientId');
                });
                it('validates that errors are thrown if both aadClientSecret and aadClientCertThumbprint are undefined, null, or empty', () => {
                    delete settings.osDisk.encryptionSettings.aadClientCertThumbprint;
                    delete settings.osDisk.encryptionSettings.protectedSettings;
                    let result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.aadClientCertThumbprint'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.protectedSettings'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.aadClientCertThumbprint = null;
                    settings.osDisk.encryptionSettings.protectedSettings = {
                    };
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.aadClientCertThumbprint'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.protectedSettings'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.aadClientCertThumbprint = null;
                    settings.osDisk.encryptionSettings.protectedSettings = {
                        aadClientSecret: null
                    };
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.aadClientCertThumbprint'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.protectedSettings'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.aadClientCertThumbprint = '';
                    settings.osDisk.encryptionSettings.protectedSettings = {
                        aadClientSecret: ''
                    };
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.aadClientCertThumbprint'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.protectedSettings'; }).length).toEqual(1);
                });
                it('validates that errors are thrown if both aadClientSecret and aadClientCertThumbprint are specified', () => {
                    settings.osDisk.encryptionSettings.protectedSettings = {
                        aadClientSecret: 'aadClientSecret'
                    };
                    let result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.aadClientCertThumbprint'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.protectedSettings.aadClientSecret'; }).length).toEqual(1);
                });
                it('validates that no errors are thrown if both protectedSettings is a KeyVault reference and aadClientCertThumbprint are specified', () => {
                    settings.osDisk.encryptionSettings.protectedSettings = {
                        reference: {
                            keyVault: {
                                name: 'test-keyvault'
                            },
                            secretName: 'secretname'
                        }
                    };
                    let result = validate(settings);
                    expect(result.length).toEqual(0);
                });
                it('validates that errors are thrown for invalid volumeType', () => {
                    delete settings.osDisk.encryptionSettings.volumeType;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.volumeType');

                    settings.osDisk.encryptionSettings.volumeType = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.volumeType');

                    settings.osDisk.encryptionSettings.volumeType = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.volumeType');

                    settings.osDisk.encryptionSettings.volumeType = 'NOT_VALID';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.volumeType');
                });
                it('validates that errors are thrown if diskEncryptionKeyVaultUrl is undefined, null, or empty', () => {
                    delete settings.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl');

                    settings.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl');

                    settings.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVaultUrl');
                });
                it('validates that errors are thrown if keyEncryptionKeyUrl is undefined, null, or empty', () => {
                    delete settings.osDisk.encryptionSettings.keyEncryptionKeyUrl;
                    let result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyVault'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyUrl'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.keyEncryptionKeyUrl = null;
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyVault'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyUrl'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.keyEncryptionKeyUrl = '';
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyVault'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyUrl'; }).length).toEqual(1);
                });
                it('validates that errors are thrown if diskEncryptionKeyVault is undefined or null', () => {
                    delete settings.osDisk.encryptionSettings.diskEncryptionKeyVault;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVault');

                    settings.osDisk.encryptionSettings.diskEncryptionKeyVault = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVault');
                });
                it('validates that errors are thrown if keyEncryptionKeyVault is undefined or null', () => {
                    delete settings.osDisk.encryptionSettings.keyEncryptionKeyVault;
                    let result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyVault'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyUrl'; }).length).toEqual(1);

                    settings.osDisk.encryptionSettings.keyEncryptionKeyVault = null;
                    result = validate(settings);
                    expect(result.length).toEqual(2);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyVault'; }).length).toEqual(1);
                    expect((_.filter(result), (value) => { return value.name === '.osDisk.encryptionSettings.keyEncryptionKeyUrl'; }).length).toEqual(1);
                });
                it('validates that errors are thrown if diskEncryptionKeyVault.name is undefined, null, or only whitespace', () => {
                    delete settings.osDisk.encryptionSettings.diskEncryptionKeyVault.name;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVault.name');

                    settings.osDisk.encryptionSettings.diskEncryptionKeyVault.name = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVault.name');

                    settings.osDisk.encryptionSettings.diskEncryptionKeyVault.name = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.diskEncryptionKeyVault.name');
                });
                it('validates that errors are thrown if keyEncryptionKeyVault.name is undefined, null, or only whitespace', () => {
                    delete settings.osDisk.encryptionSettings.keyEncryptionKeyVault.name;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.keyEncryptionKeyVault.name');

                    settings.osDisk.encryptionSettings.keyEncryptionKeyVault.name = null;
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.keyEncryptionKeyVault.name');

                    settings.osDisk.encryptionSettings.keyEncryptionKeyVault.name = '';
                    result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.osDisk.encryptionSettings.keyEncryptionKeyVault.name');
                });
                describe('windows:', () => {
                    beforeEach(() => {
                        settings.osType = 'windows';
                        settings.osDisk.encryptionSettings.protectedSettings = {
                            passphrase: 'passphrase'
                        };
                    });
                    it('validates that no errors are thrown if passphrase is undefined', () => {
                        delete settings.osDisk.encryptionSettings.protectedSettings.passphrase;
                        let result = validate(settings);
                        expect(result.length).toEqual(0);
                    });
                    it('validates that errors are thrown if passphrase is specified', () => {
                        settings.osDisk.encryptionSettings.protectedSettings = {
                            passphrase: null
                        };
                        let result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');

                        settings.osDisk.encryptionSettings.protectedSettings = {
                            passphrase: ''
                        };
                        result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');

                        settings.osDisk.encryptionSettings.protectedSettings = {
                            passphrase: 'passphrase'
                        };
                        result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');
                    });
                });
                describe('linux:', () => {
                    beforeEach(() => {
                        settings.osType = 'linux';
                        settings.osDisk.encryptionSettings.protectedSettings = {
                            passphrase: 'passphrase'
                        };
                    });
                    it('validates that no errors are thrown if passphrase is specified', () => {
                        let result = validate(settings);
                        expect(result.length).toEqual(0);
                    });
                    it('validates that errors are thrown if passphrase is undefined, null, or only whitespace', () => {
                        delete settings.osDisk.encryptionSettings.protectedSettings.passphrase;
                        let result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');

                        settings.osDisk.encryptionSettings.protectedSettings.passphrase = null;
                        result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');

                        settings.osDisk.encryptionSettings.protectedSettings.passphrase = '';
                        result = validate(settings);
                        expect(result.length).toEqual(1);
                        expect(result[0].name).toEqual('.osDisk.encryptionSettings.protectedSettings.passphrase');
                    });
                });
            });
        });
        describe('windows:', () => {
            describe('AuthenticationType:', () => {
                it('validates that no errors are thorwn if password is provided and sshPublicKey is not', () => {
                    settings.osType = 'windows';
                    settings.adminPassword = 'test343DSFDS4f';
                    let result = validate(settings);
                    expect(result.length).toEqual(0);
                });
                it('validates that providing both the password and sshPublicKey throws error', () => {
                    settings.osType = 'windows';
                    settings.adminPassword = 'test343DSFDS4f';
                    settings.sshPublicKey = 'key';
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.sshPublicKey');
                });
                it('validates that error is thrown if both the password and sshPublicKey are not be provided', () => {
                    settings.osType = 'windows';
                    delete settings.adminPassword;
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.adminPassword');
                });
                it('validates that sshPublicKey cannot be specified if osType is windows', () => {
                    settings.osType = 'windows';
                    settings.sshPublicKey = 'testKey';
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.sshPublicKey');
                });
            });
        });
        describe('linux:', () => {
            describe('AuthenticationType:', () => {
                it('validates that no errors are thorwn if sshPublicKey is provided and password is not', () => {
                    settings.osType = 'linux';
                    settings.sshPublicKey = 'key';
                    delete settings.adminPassword;
                    let result = validate(settings);
                    expect(result.length).toEqual(0);
                });
                it('validates that no errors are thorwn if password is provided and sshPublicKey is not', () => {
                    settings.osType = 'linux';
                    settings.adminPassword = 'test343DSFDS4f';
                    let result = validate(settings);
                    expect(result.length).toEqual(0);
                });
                it('validates that providing both the password and sshPublicKey throws error', () => {
                    settings.osType = 'linux';
                    settings.adminPassword = 'test343DSFDS4f';
                    settings.sshPublicKey = 'key';
                    let result = validate(settings);
                    expect(result.length).toEqual(1);
                    expect(result[0].name).toEqual('.sshPublicKey');
                });
                it('validates that error is thrown if both the password and sshPublicKey are not provided', () => {
                    settings.osType = 'linux';
                    delete settings.adminPassword;
                    let result = validate(settings);
                    expect(result.length > 0).toEqual(true);
                    expect(result[0].name === '.sshPublicKey' || result[0].name === '.adminPassword').toEqual(true);
                });

            });
            it('validates that setting existingWindowsServerlicense is not valid for linux vms', () => {
                settings.osType = 'linux';

                settings.existingWindowsServerlicense = true;
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.existingWindowsServerlicense');

                settings.existingWindowsServerlicense = false;
                result = validate(settings);
                expect(result.length).toEqual(0);
            });
        });
        describe('block validations:', () => {
            it('availability set cannot have a different resource group', () => {
                settings.availabilitySet.resourceGroupName = 'diffResourceGroup';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.availabilitySet');
                expect(result[0].message).toContain('Virtual Machine must be in the same resource group, location and subscription than Availability Set');
            });
            it('availability set cannot have a different location', () => {
                settings.availabilitySet.location = 'centralus';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.availabilitySet');
                expect(result[0].message).toContain('Virtual Machine must be in the same resource group, location and subscription than Availability Set');
            });
            it('availability set cannot have a different subscription', () => {
                settings.availabilitySet.subscriptionId = '00000000-0000-1000-8000-000000000000';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.availabilitySet');
                expect(result[0].message).toContain('Virtual Machine must be in the same resource group, location and subscription than Availability Set');
            });

            it('virtual network cannot have a different location', () => {
                settings.virtualNetwork.location = 'centralus';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.virtualNetwork');
                expect(result[0].message).toContain('Virtual Machine must be the same location than Virtual Network');
            });

            it('storage cannot have a different location', () => {
                settings.storageAccounts.location = 'centralus';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts');
                expect(result[0].message).toContain('Virtual Machine must be in the same location and subscription than storage account');
            });
            it('storage cannot have a different subscription', () => {
                settings.storageAccounts.subscriptionId = '00000000-0000-1000-8000-000000000000';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts');
                expect(result[0].message).toContain('Virtual Machine must be in the same location and subscription than storage account');
            });

            it('diagnostic storage cannot have a different location', () => {
                settings.storageAccounts.location = 'centralus';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.storageAccounts');
                expect(result[0].message).toContain('Virtual Machine must be in the same location and subscription than storage account');
            });
            it('diagnostic storage cannot have a different subscription', () => {
                settings.diagnosticStorageAccounts.subscriptionId = '00000000-0000-1000-8000-000000000000';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts');
                expect(result[0].message).toContain('Virtual Machine must be in the same location and subscription than diagnostic storage account');
            });

            it('network interfaces cannot have a different location', () => {
                settings.nics[0].location = 'centralus';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('Network interfaces must be in the same location & subscription as virtual machines');
            });
            it('network interfaces cannot have a different subscription', () => {
                settings.nics[1].subscriptionId = '00000000-0000-1000-8000-000000000000';
                let result = validate(settings);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('Network interfaces must be in the same location & subscription as virtual machines');
            });

            it('load balancer cannot have a different subscription', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.loadBalancerSettings = {
                    name: 'lbtest004',
                    loadBalancerType: 'Public',
                    domainNameLabel: 'lbtest004',
                    publicIPAddressVersion: 'IPv',
                    location: buildingBlockSettings.location,
                    resourceGroupName: buildingBlockSettings.resourceGroupName,
                    subscriptionId: buildingBlockSettings.subscriptionId,
                };
                settings.loadBalancerSettings.subscriptionId = '00000000-0000-1000-8000-000000000000';

                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.loadBalancerSettings');
                expect(result[0].message).toContain('Virtual Machine must be in the same subscription as Load Balancer');
            });

            it('scale set cannot have a different location than vnet', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                settings.nics[0].isPublic = false;
                settings.virtualNetwork.location = 'centralus';

                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.scaleSetSettings');
                expect(result[0].message).toContain('Scale set must be in the same location and subscription than virtual network');
            });
            it('scale set cannot have a different subscription than vnet', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                settings.nics[0].isPublic = false;
                settings.virtualNetwork.subscriptionId = '00000000-0000-1000-8000-000000000000';

                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.scaleSetSettings');
                expect(result[0].message).toContain('Scale set must be in the same location and subscription than virtual network');
            });

            it('nics cannot have different location than scale set', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                settings.nics[0].location = 'centralus';
                settings.nics[0].isPublic = false;

                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('Network interfaces must be in the same location & subscription as virtual machine scalesets');
            });
            it('scale set can have a different location than nic', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                let mergedValue = merge({ settings, buildingBlockSettings });
                mergedValue.location = 'centralus';
                mergedValue.nics[0].isPublic = false;
                mergedValue.virtualNetwork.location = 'centralus'; // otherwise it fails because of vnet
                let result = validate(mergedValue);
                expect(result.length).toEqual(2);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts');
                expect(result[0].message).toContain('Virtual Machine Scalesets must be in the same location and subscription than diagnostic storage account');
                expect(result[1].name).toEqual('.nics');
                expect(result[1].message).toContain('Network interfaces must be in the same location & subscription as virtual machine scalesets');
            });
            it('scale set cannot have a different subscription than nic', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                let mergedValue = merge({ settings, buildingBlockSettings });
                mergedValue.subscriptionId = '00000000-0000-1000-8000-000000000000';
                mergedValue.virtualNetwork.subscriptionId = '00000000-0000-1000-8000-000000000000'; // otherwise it fails because of vnet
                mergedValue.nics[0].isPublic = false;
                let result = validate(mergedValue);
                expect(result.length).toEqual(2);
                expect(result[0].name).toEqual('.diagnosticStorageAccounts');
                expect(result[0].message).toContain('Virtual Machine Scalesets must be in the same location and subscription than diagnostic storage account');
                expect(result[1].name).toEqual('.nics');
                expect(result[1].message).toContain('Network interfaces must be in the same location & subscription as virtual machine scalesets');
            });
            it('nic cannot have a different subscription than scale set', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                let mergedValue = merge({ settings, buildingBlockSettings });
                mergedValue.nics[0].isPublic = false;
                mergedValue.nics[0].subscriptionId = '00000000-0000-1000-8000-000000000000';
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.nics');
                expect(result[0].message).toContain('Network interfaces must be in the same location & subscription as virtual machine scalesets');
            });

            it('scale set can have a different location than load balancer', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {};
                settings.nics[0].isPublic = false;
                settings.loadBalancerSettings = {
                    name: 'lbtest004',
                    loadBalancerType: 'Public',
                    domainNameLabel: 'lbtest004',
                    publicIPAddressVersion: 'IPv',
                    location: 'centralus'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(0);
            });
            it('load balancer cannot have a different subscription than scale set', () => {
                let merge = virtualMachineSettings.__get__('merge');
                settings.scaleSetSettings = {
                };
                settings.nics[0].isPublic = false;
                settings.loadBalancerSettings = {
                    name: 'lbtest004',
                    loadBalancerType: 'Public',
                    domainNameLabel: 'lbtest004',
                    publicIPAddressVersion: 'IPv',
                    location: buildingBlockSettings.location,
                    resourceGroupName: buildingBlockSettings.resourceGroupName,
                    subscriptionId: '00000000-0000-1000-8000-000000000000'
                };
                let mergedValue = merge({ settings, buildingBlockSettings });
                let result = validate(mergedValue);
                expect(result.length).toEqual(1);
                expect(result[0].name).toEqual('.loadBalancerSettings');
                expect(result[0].message).toContain('Virtual Machine Scale Set must be in the same subscription as Load Balancer');
            });

            it('inboundNatRules idleTimeoutInMinutes specified', () => {
                let settings = _.cloneDeep(testSettings);
                settings.loadBalancerSettings = {
                    name: 'lbtest004',
                    loadBalancerType: 'Public',
                    domainNameLabel: 'lbtest004',
                    publicIPAddressVersion: 'IPv'
                };
                settings.loadBalancerSettings.frontendIPConfigurations = [
                    {
                        name: 'feConfig1',
                        loadBalancerType: 'Public'
                    }
                ];
                settings.loadBalancerSettings.inboundNatRules = [
                    {
                        name: 'natP1',
                        frontendIPConfigurationName: 'feConfig1',
                        startingFrontendPort: 60001,
                        frontendPortRangeEnd: 60020,
                        backendPort: 3389,
                        protocol: 'Tcp',
                        idleTimeoutInMinutes: 5
                    }
                ];
                let result = virtualMachineSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });
                expect(result.parameters.virtualMachines[0].loadBalancers[0].properties.inboundNatRules[0].properties.idleTimeoutInMinutes).toEqual(5);
            });
            it('inboundNatRules idleTimeoutInMinutes not specified', () => {
                let settings = _.cloneDeep(testSettings);
                settings.loadBalancerSettings = {
                    name: 'lbtest004',
                    loadBalancerType: 'Public',
                    domainNameLabel: 'lbtest004',
                    publicIPAddressVersion: 'IPv'
                };
                settings.loadBalancerSettings.frontendIPConfigurations = [
                    {
                        name: 'feConfig1',
                        loadBalancerType: 'Public'
                    }
                ];
                settings.loadBalancerSettings.inboundNatRules = [
                    {
                        name: 'natP1',
                        frontendIPConfigurationName: 'feConfig1',
                        startingFrontendPort: 60001,
                        frontendPortRangeEnd: 60020,
                        backendPort: 3389,
                        protocol: 'Tcp'
                    }
                ];
                let result = virtualMachineSettings.process({
                    settings: settings,
                    buildingBlockSettings: buildingBlockSettings
                });
                expect(result.parameters.virtualMachines[0].loadBalancers[0].properties.inboundNatRules[0].properties.hasOwnProperty('idleTimeoutInMinutes')).toEqual(false);
            });
        });
    });
    if (jasmine.testConfiguration.runTransform) {
        describe('transform:', () => {
            let settings;
            let lbSettings = {
                loadBalancerSettings: {
                    frontendIPConfigurations: [
                        {
                            name: 'lb-fe-config1',
                            loadBalancerType: 'Public'
                        }
                    ],
                    loadBalancingRules: [
                        {
                            name: 'lbr1',
                            frontendPort: 80,
                            backendPort: 80,
                            protocol: 'Tcp',
                            backendPoolName: 'bep1',
                            frontendIPConfigurationName: 'lb-fe-config1',
                            enableFloatingIP: false,
                            probeName: 'lbp1'
                        }
                    ],
                    probes: [
                        {
                            name: 'lbp1',
                            port: 80,
                            protocol: 'Http',
                            requestPath: '/'
                        }
                    ],
                    backendPools: [
                        {
                            name: 'bep1'
                        },
                        {
                            name: 'bep2'
                        }
                    ],
                    inboundNatRules: [
                        {
                            name: 'natrule1',
                            protocol: 'Tcp',
                            startingFrontendPort: 2000,
                            backendPort: 3389,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        },
                        {
                            name: 'natrule2',
                            protocol: 'Tcp',
                            startingFrontendPort: 3000,
                            backendPort: 22,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        }
                    ],
                    inboundNatPools: [
                        {
                            name: 'natpool1',
                            protocol: 'Tcp',
                            startingFrontendPort: 2000,
                            frontendPortRangeEnd: 2010,
                            backendPort: 3389,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        },
                        {
                            name: 'natpool2',
                            protocol: 'Tcp',
                            startingFrontendPort: 3000,
                            frontendPortRangeEnd: 3010,
                            backendPort: 22,
                            frontendIPConfigurationName: 'lb-fe-config1'
                        }
                    ]
                }
            };

            let nicSettings = {
                nics: [
                    {
                        isPublic: false,
                        isPrimary: true,
                        privateIPAllocationMethod: 'Static',
                        startingIPAddress: '10.0.2.4',
                        subnetName: 'subnet1',
                        applicationGatewayBackendPoolNames: [
                            {
                                name: 'gwbep1',
                                applicationGatewayName: 'gw1',
                                resourceGroupName: 'gw1-rg',
                                subscriptionId: '00000000-0000-1000-AA00-000000000000'

                            },
                            'gwbep2'
                        ],
                        backendPoolNames: [
                            {
                                name: 'bep1',
                                loadBalancerName: 'lb1',
                                resourceGroupName: 'lb1-rg',
                                subscriptionId: '00000000-0000-1000-AA00-000000000000'

                            },
                            'bep2'
                        ],
                        inboundNatRulesNames: [
                            {
                                name: 'natrule1'
                            },
                            'natrule2'
                        ],
                        inboundNatPoolNames: [
                            {
                                name: 'natpool1',
                                loadBalancerName: 'lb3',
                                resourceGroupName: 'lb3-rg',
                                subscriptionId: '00000000-0000-1000-BB00-000000000000'
                            },
                            'natpool2'
                        ]
                    },
                    {
                        isPublic: false,
                        privateIPAllocationMethod: 'Static',
                        startingIPAddress: '10.0.2.5',
                        subnetName: 'subnet1',
                        applicationGatewayBackendPoolNames: [
                            {
                                name: 'gwbep1',
                                applicationGatewayName: 'gw2'
                            }
                        ],
                        backendPoolNames: [
                            {
                                name: 'bep1',
                                loadBalancerName: 'lb4'
                            }
                        ],
                        inboundNatRulesNames: [
                            {
                                name: 'natrule1'
                            }
                        ],
                        inboundNatPoolNames: [
                            {
                                name: 'natpool1',
                                loadBalancerName: 'lb6'
                            }
                        ]
                    }
                ]
            };

            let gwSettings = {
                name: 'test-agw',
                // sku: {
                //     tier: 'Standard',
                //     size: 'Small',
                //     capacity: 2
                // },
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
                        name: 'gwbep1',
                        backendAddresses: [
                            {
                                fqdn: 'www.contoso.com'
                            }
                        ]
                    },
                    {
                        name: 'gwbep2',
                        backendAddresses: [
                            {
                                fqdn: 'www.contoso2.com'
                            }
                        ]
                    }
                ],
                urlPathMaps: [
                    {
                        name: 'pb-rule1',
                        defaultBackendAddressPoolName: 'gwbep1',
                        defaultBackendHttpSettingsName: 'appGatewayBackendHttpSettings',
                        pathRules: [
                            {
                                name: 'p2',
                                paths: ['/path'],
                                backendAddressPoolName: 'gwbep1',
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
                        backendAddressPoolName: 'gwbep1',
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

            beforeEach(() => {
                settings = _.cloneDeep(testSettings);
            });

            it('LB: validates that networkinterfaces are transformed correctly for VMs', () => {
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].applicationGatewayBackendPoolNames = [];
                settings.nics[1].applicationGatewayBackendPoolNames = [];
                settings.nics[0].inboundNatPoolNames = [];
                settings.nics[1].inboundNatPoolNames = [];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatPools = [];

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(2);

                let nics = processedParam.parameters.virtualMachines[0].networkInterfaces;
                expect(nics.length).toEqual(4);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/lb1-rg/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/bep1');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/backendAddressPools/bep2');

                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-0');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule2-0');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb4/backendAddressPools/bep1');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-0');

                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/lb1-rg/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/bep1');
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/backendAddressPools/bep2');

                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-1');
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule2-1');

                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb4/backendAddressPools/bep1');

                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-1');

            });
            it('LB: validates that networkinterfaces are transformed correctly for VMs when lbSettings specify different resource group', () => {
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].applicationGatewayBackendPoolNames = [];
                settings.nics[1].applicationGatewayBackendPoolNames = [];
                settings.nics[0].inboundNatPoolNames = [];
                settings.nics[1].inboundNatPoolNames = [];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.resourceGroupName = 'different-rg';
                settings.loadBalancerSettings.inboundNatPools = [];

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(2);

                let nics = processedParam.parameters.virtualMachines[0].networkInterfaces;
                expect(nics.length).toEqual(4);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/lb1-rg/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/bep1');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/backendAddressPools/bep2');

                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-0');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule2-0');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb4/backendAddressPools/bep1');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-0');

                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/lb1-rg/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/bep1');
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/backendAddressPools/bep2');

                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-1');
                expect(nics[2].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule2-1');

                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb4/backendAddressPools/bep1');

                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.loadBalancerInboundNatRules[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatRules/natrule1-1');

            });
            it('LB: validates that networkinterfaces are transformed correctly for Scalesets', () => {
                settings.scaleSetSettings = {
                    name: 'scaleSet-lb',
                    upgradePolicy: 'Automatic',
                    overprovision: true,
                    singlePlacementGroup: true
                };
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].applicationGatewayBackendPoolNames = [];
                settings.nics[1].applicationGatewayBackendPoolNames = [];
                settings.nics[0].inboundNatRulesNames = [];
                settings.nics[1].inboundNatRulesNames = [];
                settings.loadBalancerSettings = _.cloneDeep(lbSettings.loadBalancerSettings);
                settings.loadBalancerSettings.inboundNatRules = [];

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(0);

                let nics = processedParam.parameters.virtualMachines[0].scaleSets[0].properties.virtualMachineProfile.networkProfile.networkInterfaceConfigurations;
                expect(nics.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/lb1-rg/providers/Microsoft.Network/loadBalancers/lb1/backendAddressPools/bep1');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/backendAddressPools/bep2');

                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatPools[0].id).toEqual('/subscriptions/00000000-0000-1000-BB00-000000000000/resourceGroups/lb3-rg/providers/Microsoft.Network/loadBalancers/lb3/inboundNatPools/natpool1');
                expect(nics[0].properties.ipConfigurations[0].properties.loadBalancerInboundNatPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/test-lb/inboundNatPools/natpool2');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb4/backendAddressPools/bep1');

                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.loadBalancerInboundNatPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/loadBalancers/lb6/inboundNatPools/natpool1');

            });
            it('AGW: validates that networkinterfaces are transformed correctly for VMs', () => {
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].backendPoolNames = [];
                settings.nics[1].backendPoolNames = [];
                settings.nics[0].inboundNatRulesNames = [];
                settings.nics[1].inboundNatRulesNames = [];
                settings.nics[0].inboundNatPoolNames = [];
                settings.nics[1].inboundNatPoolNames = [];
                settings.applicationGatewaySettings = _.cloneDeep(gwSettings);

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(2);

                let nics = processedParam.parameters.virtualMachines[0].networkInterfaces;
                expect(nics.length).toEqual(4);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/gw1-rg/providers/Microsoft.Network/applicationGateways/gw1/backendAddressPools/gwbep1');
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/test-agw/backendAddressPools/gwbep2');

                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/gw2/backendAddressPools/gwbep1');

                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/gw1-rg/providers/Microsoft.Network/applicationGateways/gw1/backendAddressPools/gwbep1');
                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/test-agw/backendAddressPools/gwbep2');

                expect(nics[3].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/gw2/backendAddressPools/gwbep1');

            });
            it('AGW: validates that networkinterfaces are transformed correctly for VMs when gwSettings specify different resource group', () => {
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].backendPoolNames = [];
                settings.nics[1].backendPoolNames = [];
                settings.nics[0].inboundNatRulesNames = [];
                settings.nics[1].inboundNatRulesNames = [];
                settings.nics[0].inboundNatPoolNames = [];
                settings.nics[1].inboundNatPoolNames = [];
                settings.applicationGatewaySettings = _.cloneDeep(gwSettings);
                settings.applicationGatewaySettings.resourceGroupName = 'different-rg';

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(2);

                let nics = processedParam.parameters.virtualMachines[0].networkInterfaces;
                expect(nics.length).toEqual(4);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/gw1-rg/providers/Microsoft.Network/applicationGateways/gw1/backendAddressPools/gwbep1');
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/applicationGateways/test-agw/backendAddressPools/gwbep2');

                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/gw2/backendAddressPools/gwbep1');

                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(2);
                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/gw1-rg/providers/Microsoft.Network/applicationGateways/gw1/backendAddressPools/gwbep1');
                expect(nics[2].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/different-rg/providers/Microsoft.Network/applicationGateways/test-agw/backendAddressPools/gwbep2');

                expect(nics[3].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(1);
                expect(nics[3].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/gw2/backendAddressPools/gwbep1');

            });
            it('AGW: validates that networkinterfaces are transformed correctly for Scalesets', () => {
                settings.scaleSetSettings = {
                    name: 'scaleSet-lb',
                    upgradePolicy: 'Automatic',
                    overprovision: true,
                    singlePlacementGroup: true
                };
                settings.nics = _.cloneDeep(nicSettings.nics);
                settings.nics[0].backendPoolNames = [];
                settings.nics[1].backendPoolNames = [];
                settings.nics[0].inboundNatRulesNames = [];
                settings.nics[1].inboundNatRulesNames = [];
                settings.nics[0].inboundNatPoolNames = [];
                settings.nics[1].inboundNatPoolNames = [];
                settings.applicationGatewaySettings = _.cloneDeep(gwSettings);

                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(0);

                let nics = processedParam.parameters.virtualMachines[0].scaleSets[0].properties.virtualMachineProfile.networkProfile.networkInterfaceConfigurations;
                expect(nics.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(2);
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-AA00-000000000000/resourceGroups/gw1-rg/providers/Microsoft.Network/applicationGateways/gw1/backendAddressPools/gwbep1');
                expect(nics[0].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/test-agw/backendAddressPools/gwbep2');

                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools.length).toEqual(1);
                expect(nics[1].properties.ipConfigurations[0].properties.applicationGatewayBackendAddressPools[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/applicationGateways/gw2/backendAddressPools/gwbep1');
            });
            it('validates that number of stamps created are based on vmcount property', () => {

                let processedParam = virtualMachineSettings.process({ settings: testSettings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines.length).toEqual(2);
            });
            it('validates that vm names are correctly computed', () => {

                let processedParam = virtualMachineSettings.process({ settings: testSettings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].name).toEqual('test-vm1');
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].name).toEqual('test-vm2');
            });
            it('For VMs, validates that computerNames is computed as nameprefix-vm1, if computernamePrefix is not specified', () => {
                settings.computerNamePrefix = null;
                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.computerName).toEqual('test-vm1');
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.computerName).toEqual('test-vm2');
            });
            it('For VMs, validates that computerNames is computed as computerNamePrefix1, if computernamePrefix is specified', () => {
                settings.computerNamePrefix = 'temp';
                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.computerName).toEqual('temp1');
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.computerName).toEqual('temp2');
            });
            it('For scaleset, validates that computerNames is computed as nameprefix, if computernamePrefix is not specified', () => {
                settings.computerNamePrefix = null;
                settings.namePrefix = 'temp';
                settings.scaleSetSettings = {};
                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].scaleSets[0].properties.virtualMachineProfile.osProfile.computerNamePrefix).toEqual('temp');
            });
            it('For scaleset, validates that computerNames is computed as computerNamePrefix, if computernamePrefix is specified', () => {
                settings.computerNamePrefix = 'temp';
                settings.scaleSetSettings = {};
                let processedParam = virtualMachineSettings.process({ settings: settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].scaleSets[0].properties.virtualMachineProfile.osProfile.computerNamePrefix).toEqual('temp');
            });
            it('validates that vm size is added to the hardwareProfile in the output', () => {

                let processedParam = virtualMachineSettings.process({ settings: testSettings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.hardwareProfile.vmSize).toEqual(testSettings.size);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.hardwareProfile.vmSize).toEqual(testSettings.size);
            });
            it('validates that vm adminUsername is added to the osProfile in the output', () => {

                let processedParam = virtualMachineSettings.process({ settings: testSettings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.adminUsername).toEqual('testadminuser');
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.adminUsername).toEqual('testadminuser');
            });
            it('validates that when createOption property of osDisk is set to attach, vhd.uri property is set', () => {
                let settings = _.cloneDeep(testSettings);
                delete settings.imageReference;
                settings.osDisk.createOption = 'attach';
                settings.osDisk.images = ['http://testimageuri', 'http://testimageuri2'];
                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.vhd.uri).toEqual(settings.osDisk.images[0]);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.vhd.uri).toEqual(settings.osDisk.images[1]);
            });
            it('validates that when createOption property of osDisk is set to attach, imageReference cannot be set', () => {
                let settings = _.cloneDeep(testSettings);

                settings.osDisk.createOption = 'attach';
                settings.osDisk.images = ['http://testimageuri'];
                expect(() => virtualMachineSettings.process({ settings, buildingBlockSettings })).toThrowError(Error);
            });
            it('validates that when createOption property of osDisk is set to attach, images has a size of vmCount', () => {
                let settings = _.cloneDeep(testSettings);

                settings.osDisk.createOption = 'attach';
                settings.osDisk.images = ['http://testimageuri'];
                expect(() => virtualMachineSettings.process({ settings, buildingBlockSettings })).toThrowError(Error);
            });
            it('validates that when createOption property of dataDisk is set to attach, image property is set and vhd is not available', () => {
                let settings = _.cloneDeep(testSettings);

                //settings.dataDisks.createOption = 'attach';
                settings.dataDisks.disks = [
                    {
                        createOption: 'attach',
                        images: [
                            [
                                'http://testimageuri'
                            ],
                            [
                                'http://testimageuri2'
                            ]
                        ]
                    }
                ];

                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(
                    settings.dataDisks.disks[0].images[0][0]);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(
                    settings.dataDisks.disks[0].images[1][0]);
            });
            it('validates that dataDisks property has right number of disks as per the count property', () => {
                let settings = _.cloneDeep(testSettings);

                settings.dataDisks.count = 5;
                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks.length).toEqual(5);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks.length).toEqual(5);
            });
            it('validates that diskSizeGB property is correctly set in the osdisk', () => {
                let settings = _.cloneDeep(testSettings);

                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.hasOwnProperty('diskSizeGB')).toEqual(false);

                settings.osDisk.diskSizeGB = 500;
                processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.diskSizeGB).toEqual(500);
            });
            it('validates that plan property is correctly set', () => {
                let settings = _.cloneDeep(testSettings);
                settings.usePlan = true;

                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].plan.name).toEqual(testSettings.imageReference.sku);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].plan.publisher).toEqual(testSettings.imageReference.publisher);
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].plan.product).toEqual(testSettings.imageReference.offer);
            });
            it('For VMs, validates that customData is correctly set', () => {
                let settings = _.cloneDeep(testSettings);
                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.customData).toEqual(
                    testSettings.customData);
            });
            it('For ScaleSets, validates that customData is correctly set', () => {
                let settings = _.cloneDeep(testSettings);
                settings.scaleSetSettings = {};
                let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                expect(processedParam.parameters.virtualMachines[0].scaleSets[0].properties.virtualMachineProfile.osProfile.customData).toEqual(
                    testSettings.customData);
            });
            // TODO dataDisk property is computed per the rp schema
            // TODO osDisk property is computed per the rp schema
            // TODO osDisk encryptionSettings
            describe('AvailabilitySet:', () => {
                it('validate that avSet reference is correctly computed and set in vm stamps', () => {
                    let settings = _.cloneDeep(testSettings);

                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                });
                it('validates that if name is not present in avSet & vmCount < 2, no avSet resource is created and no reference is added to vms', () => {
                    let settings = _.cloneDeep(testSettings);
                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    settings.vmCount = 1;
                    settings.availabilitySet = {
                        platformFaultDomainCount: 100,
                        platformUpdateDomainCount: 100
                    };
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet.length).toEqual(0);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.availabilitySet).toEqual(null);
                });
                it('validates that if name is not present in avSet & vmCount > 2, avSet resource is created and reference is added to vms', () => {
                    let settings = _.cloneDeep(testSettings);
                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    settings.availabilitySet = {
                        platformFaultDomainCount: 3,
                        platformUpdateDomainCount: 5
                    };
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet.length).toEqual(1);
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].name).toEqual(`${settings.namePrefix}-as`);
                });
                it('validates that if avSet has a name specified then irrespective of the vmCount (<2), avSet resource is created and reference is added to vms', () => {
                    let settings = _.cloneDeep(testSettings);
                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    settings.vmCount = 1;
                    settings.availabilitySet = {
                        name: 'test-as',
                        platformFaultDomainCount: 3,
                        platformUpdateDomainCount: 5
                    };
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet.length).toEqual(1);
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].name).toEqual('test-as');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                });
                it('validates that if avSet has a name specified then irrespective of the vmCount (>1), avSet resource is created and reference is added to vms', () => {
                    let settings = _.cloneDeep(testSettings);
                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    settings.vmCount = 3;
                    settings.availabilitySet = {
                        name: 'test-as',
                        platformFaultDomainCount: 3,
                        platformUpdateDomainCount: 5
                    };
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet.length).toEqual(1);
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].name).toEqual('test-as');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.availabilitySet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/availabilitySets/test-as');
                });
            });
            describe('storageAccounts:', () => {
                it('validates that correct number of storage stamps are created based on the storageAccount.count property', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 5;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].storageAccounts.length).toEqual(5);
                });
                it('validates that number of storage stamps created are based on the storageAccount.count & existing accounts provided', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 5;
                    settings.storageAccounts.accounts = ['a', 'b'];

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].storageAccounts.length).toEqual(3);
                });
                it('validates that sku is correctly assigned in the storage stamps', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].storageAccounts[0].sku.name).toEqual('Premium_LRS');
                    expect(processedParam.parameters.virtualMachines[0].storageAccounts[1].sku.name).toEqual('Premium_LRS');
                });
                it('validates that kind property is correctly assigned in the storage stamps', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].storageAccounts[0].kind).toEqual('Storage');
                    expect(processedParam.parameters.virtualMachines[0].storageAccounts[1].kind).toEqual('Storage');
                });
                it('validates that vhd property is correctly updated in the storageprofile.osDisk', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 2;
                    settings.vmCount = 5;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm1-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm2-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm3-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm4-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm5-os.vhd`);
                });
                it('validates that vhd property is correctly updated in the storageprofile.osDisk when existing accounts are provided', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 4;
                    settings.storageAccounts.accounts = ['A', 'B'];
                    settings.vmCount = 8;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[0]}.blob.core.windows.net/vhds/test-vm1-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[1]}.blob.core.windows.net/vhds/test-vm2-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm3-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm4-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[0]}.blob.core.windows.net/vhds/test-vm5-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[5].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[1]}.blob.core.windows.net/vhds/test-vm6-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[6].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm7-os.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[7].properties.storageProfile.osDisk.vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm8-os.vhd`);
                });
                it('validates that vhd property is correctly updated in the storageprofile.dataDisk', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 2;
                    settings.vmCount = 5;
                    settings.dataDisks.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm1-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm2-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm3-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm4-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm5-dataDisk1.vhd`);

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[1].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm1-dataDisk2.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[1].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm2-dataDisk2.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.storageProfile.dataDisks[1].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm3-dataDisk2.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.storageProfile.dataDisks[1].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm4-dataDisk2.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.storageProfile.dataDisks[1].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm5-dataDisk2.vhd`);
                });
                it('validates that vhd property is correctly updated in the storageprofile.osDisk when existing accounts are provided', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.count = 4;
                    settings.storageAccounts.accounts = ['A', 'B'];
                    settings.vmCount = 8;
                    settings.dataDisks.count = 1;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[0]}.blob.core.windows.net/vhds/test-vm1-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[1]}.blob.core.windows.net/vhds/test-vm2-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm3-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm4-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[0]}.blob.core.windows.net/vhds/test-vm5-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[5].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${settings.storageAccounts.accounts[1]}.blob.core.windows.net/vhds/test-vm6-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[6].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[0].name}.blob.core.windows.net/vhds/test-vm7-dataDisk1.vhd`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[7].properties.storageProfile.dataDisks[0].vhd.uri).toEqual(`http://${processedParam.parameters.virtualMachines[0].storageAccounts[1].name}.blob.core.windows.net/vhds/test-vm8-dataDisk1.vhd`);
                });
                it('validates that when managed property is set to true, the storageProfile.osDisk is correctly updated', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.managed = true;


                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.hasOwnProperty('managedDisk')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.managedDisk.hasOwnProperty('storageAccountType')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.hasOwnProperty('managedDisk')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.managedDisk.hasOwnProperty('storageAccountType')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);
                });
                it('validates that when managed property is set to true, the storageProfile.dataDisks is correctly updated', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.managed = true;
                    settings.dataDisks.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[0].managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[1].managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[0].managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[1].managedDisk.storageAccountType).toEqual(settings.storageAccounts.skuType);

                });
                it('validates that when managed property is set to true, the storageProfile.osDisk does not include vhd property', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.managed = true;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.osDisk.hasOwnProperty('vhd')).toEqual(false);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.osDisk.hasOwnProperty('vhd')).toEqual(false);
                });
                it('validates that when managed property is set to true, the storageProfile.dataDisks does not include vhd property', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.storageAccounts.managed = true;
                    settings.dataDisks.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[0].hasOwnProperty('vhd')).toEqual(false);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.storageProfile.dataDisks[1].hasOwnProperty('vhd')).toEqual(false);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[0].hasOwnProperty('vhd')).toEqual(false);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.storageProfile.dataDisks[1].hasOwnProperty('vhd')).toEqual(false);
                });
                it('validates that when managed property is set to true, the availabilitySet resource stamp include managed property as well', () => {
                    let settings = _.cloneDeep(testSettings);
                    // No Availability Zones are available in westus for our default sku, so an Availability Set will be used.
                    settings.location = 'westus';
                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].properties.hasOwnProperty('managed')).toEqual(false);

                    settings.storageAccounts.managed = true;
                    processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].properties.hasOwnProperty('managed')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].availabilitySet[0].properties.managed).toEqual(true);
                });
            });
            describe('diagnosticStorageAccounts:', () => {
                it('validates that correct number of diag storage stamps are created based on the diagnosticStorageAccounts.count property', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 5;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts.length).toEqual(5);
                });
                it('validates that number of diag storage stamps created are based on the diagnosticStorageAccounts.count & existing accounts provided', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 5;
                    settings.diagnosticStorageAccounts.accounts = ['a', 'b'];

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts.length).toEqual(3);
                });
                it('validates that sku is correctly assigned in the storage stamps', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].sku.name).toEqual('Standard_LRS');
                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].sku.name).toEqual('Standard_LRS');
                });
                it('validates that kind property is correctly assigned in the storage stamps', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 2;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].kind).toEqual('Storage');
                    expect(processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].kind).toEqual('Storage');
                });
                it('validates that storageUri property is correctly updated in the diagnosticsProfile', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 2;
                    settings.vmCount = 5;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].name}.blob.core.windows.net`);
                });
                it('validates that storageUri property is correctly updated in the diagnosticsProfile when existing accounts are provided', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.diagnosticStorageAccounts.count = 4;
                    settings.diagnosticStorageAccounts.accounts = ['A', 'B'];
                    settings.vmCount = 8;

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${settings.diagnosticStorageAccounts.accounts[0]}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${settings.diagnosticStorageAccounts.accounts[1]}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[2].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[3].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[4].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${settings.diagnosticStorageAccounts.accounts[0]}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[5].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${settings.diagnosticStorageAccounts.accounts[1]}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[6].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[0].name}.blob.core.windows.net`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[7].properties.diagnosticsProfile.bootDiagnostics.storageUri).toEqual(`http://${processedParam.parameters.virtualMachines[0].diagnosticStorageAccounts[1].name}.blob.core.windows.net`);
                });

            });
            describe('nics', () => {
                it('validate that names for nic is correctly applied', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces.length).toEqual(4);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[0].name).toEqual('test-vm1-nic1');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[1].name).toEqual('test-vm1-nic2');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[2].name).toEqual('test-vm2-nic1');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[3].name).toEqual('test-vm2-nic2');
                });
                it('validate that references for subnets are correctly computed and applied', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces.length).toEqual(4);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[0].properties.ipConfigurations[0].properties.subnet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/web');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[1].properties.ipConfigurations[0].properties.subnet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/biz');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[2].properties.ipConfigurations[0].properties.subnet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/web');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[3].properties.ipConfigurations[0].properties.subnet.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/biz');
                });
                it('validate that pips are created for public nics', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses.length).toEqual(2);
                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses[0].name).toEqual('test-vm1-nic1-pip');
                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses[1].name).toEqual('test-vm2-nic1-pip');
                });
                it('validate that pips are created with domainNameLabel for public nics', () => {
                    let settings = _.cloneDeep(testSettings);
                    settings.nics[0].domainNameLabelPrefix = 'mydomain-vm';

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses.length).toEqual(2);
                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses[0].properties.dnsSettings.domainNameLabel).toEqual('mydomain-vm11');
                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses[1].properties.dnsSettings.domainNameLabel).toEqual('mydomain-vm21');
                });
                it('validate that references for pips are correctly computed and applied', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].publicIpAddresses.length).toEqual(2);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[0].properties.ipConfigurations[0].properties.publicIPAddress.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/publicIPAddresses/test-vm1-nic1-pip');
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[2].properties.ipConfigurations[0].properties.publicIPAddress.id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/publicIPAddresses/test-vm2-nic1-pip');

                });
                it('validate that nic references are correctly computed and applied in vm stamps', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm1-nic1');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm1-nic2');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm2-nic1');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm2-nic2');
                });
                it('validate that primary property is correctly applied in nic stamps', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces.length).toEqual(4);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[0].properties.primary).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[1].properties.primary).toEqual(false);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[2].properties.primary).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].networkInterfaces[3].properties.primary).toEqual(false);
                });
                it('validate that nic property is created as per RP schema in the vm stamp', () => {
                    let settings = _.cloneDeep(testSettings);

                    let processedParam = virtualMachineSettings.process({ settings, buildingBlockSettings });

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.hasOwnProperty('networkProfile')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.hasOwnProperty('networkInterfaces')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces.length).toEqual(2);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].hasOwnProperty('id')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm1-nic1');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].hasOwnProperty('properties')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].properties.hasOwnProperty('primary')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[0].properties.primary).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].hasOwnProperty('id')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm1-nic2');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].hasOwnProperty('properties')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].properties.hasOwnProperty('primary')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.networkProfile.networkInterfaces[1].properties.primary).toEqual(false);

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.hasOwnProperty('networkProfile')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.hasOwnProperty('networkInterfaces')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces.length).toEqual(2);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].hasOwnProperty('id')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm2-nic1');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].hasOwnProperty('properties')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].properties.hasOwnProperty('primary')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[0].properties.primary).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].hasOwnProperty('id')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].id).toEqual('/subscriptions/00000000-0000-1000-A000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/networkInterfaces/test-vm2-nic2');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].hasOwnProperty('properties')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].properties.hasOwnProperty('primary')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.networkProfile.networkInterfaces[1].properties.primary).toEqual(false);
                });
            });
            describe('windows:', () => {
                it('validates that for password AuthenticationType, windowsConfiguration is added to the osProfile', () => {
                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'windows';

                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.hasOwnProperty('windowsConfiguration')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.hasOwnProperty('windowsConfiguration')).toEqual(true);
                });
                it('validates that for password AuthenticationType, vmAgent is configured in windowsConfiguration', () => {
                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'windows';

                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.windowsConfiguration.provisionVmAgent).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.windowsConfiguration.provisionVmAgent).toEqual(true);
                });
                it('validates that for password AuthenticationType, adminPassword is set in the osProfile', () => {
                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'windows';

                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.adminPassword).toEqual('$AUTHENTICATION$');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.adminPassword).toEqual('$AUTHENTICATION$');
                    expect(processedParam.parameters.secrets.secrets[0].authentication.value).toEqual(windowsSettings.adminPassword);
                });
                it('validates that existingWindowsServerlicense is correctly set', () => {

                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'windows';

                    windowsSettings.existingWindowsServerlicense = true;
                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.licenseType).toEqual('Windows_Server');

                    windowsSettings.existingWindowsServerlicense = false;
                    processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.hasOwnProperty('licenseType')).toEqual(false);
                });
                it('validates secrets are correctly set', () => {
                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'windows';
                    windowsSettings.secrets = [
                        {
                            keyVault: {
                                name: 'test-keyvault'
                            },
                            certificates: [
                                {
                                    certificateUrl: 'https://test-keyvault.vault.azure.net/secrets/testcertificate/9223ee75894147d58032693d64d304d6'
                                }
                            ]
                        }
                    ];

                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].sourceVault.id.endsWith(
                        windowsSettings.secrets[0].keyVault.name)).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].vaultCertificates[0].certificateUrl)
                        .toEqual(windowsSettings.secrets[0].certificates[0].certificateUrl);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].vaultCertificates[0].certificateStore)
                        .toEqual('My');
                });
            });
            describe('linux:', () => {
                it('validates that for password AuthenticationType, linuxConfiguration in osProfile is set to null', () => {
                    let linuxSettings = _.cloneDeep(testSettings);
                    linuxSettings.osType = 'linux';

                    let processedParam = virtualMachineSettings.process({ settings: linuxSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.hasOwnProperty('linuxConfiguration')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.linuxConfiguration).toEqual(null);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.hasOwnProperty('linuxConfiguration')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.linuxConfiguration).toEqual(null);
                });
                it('validates that for password AuthenticationType, adminPassword is set in the osProfile', () => {
                    let linuxSettings = _.cloneDeep(testSettings);
                    linuxSettings.osType = 'linux';

                    let processedParam = virtualMachineSettings.process({ settings: linuxSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.adminPassword).toEqual('$AUTHENTICATION$');
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.adminPassword).toEqual('$AUTHENTICATION$');
                    expect(processedParam.parameters.secrets.secrets[0].authentication.value).toEqual(linuxSettings.adminPassword);
                });
                it('validates that for ssh AuthenticationType, linuxConfiguration is correctly added to the osProfile', () => {
                    let linuxSettings = _.cloneDeep(testSettings);
                    linuxSettings.osType = 'linux';
                    linuxSettings.sshPublicKey = 'testKey';
                    linuxSettings.adminPassword = null;

                    let processedParam = virtualMachineSettings.process({ settings: linuxSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.hasOwnProperty('linuxConfiguration')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.linuxConfiguration.disablePasswordAuthentication).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.linuxConfiguration.ssh.publicKeys[0].path).toEqual(`/home/${linuxSettings.adminUsername}/.ssh/authorized_keys`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.linuxConfiguration.ssh.publicKeys[0].keyData).toEqual('$AUTHENTICATION$');

                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.hasOwnProperty('linuxConfiguration')).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.linuxConfiguration.disablePasswordAuthentication).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.linuxConfiguration.ssh.publicKeys[0].path).toEqual(`/home/${linuxSettings.adminUsername}/.ssh/authorized_keys`);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.linuxConfiguration.ssh.publicKeys[0].keyData).toEqual('$AUTHENTICATION$');
                });
                it('validates that for ssh AuthenticationType, adminPassword is set to null', () => {
                    let linuxSettings = _.cloneDeep(testSettings);
                    linuxSettings.osType = 'linux';
                    linuxSettings.sshPublicKey = 'testKey';
                    linuxSettings.adminPassword = null;

                    let processedParam = virtualMachineSettings.process({ settings: linuxSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.adminPassword).toEqual(null);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[1].properties.osProfile.adminPassword).toEqual(null);
                });
                it('validates secrets are correctly set', () => {
                    let windowsSettings = _.cloneDeep(testSettings);
                    windowsSettings.osType = 'linux';
                    windowsSettings.secrets = [
                        {
                            keyVault: {
                                name: 'test-keyvault'
                            },
                            certificates: [
                                {
                                    certificateUrl: 'https://test-keyvault.vault.azure.net/secrets/testcertificate/9223ee75894147d58032693d64d304d6'
                                }
                            ]
                        }
                    ];

                    let processedParam = virtualMachineSettings.process({ settings: windowsSettings, buildingBlockSettings });
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].sourceVault.id.endsWith(
                        windowsSettings.secrets[0].keyVault.name)).toEqual(true);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].vaultCertificates[0].certificateUrl)
                        .toEqual(windowsSettings.secrets[0].certificates[0].certificateUrl);
                    expect(processedParam.parameters.virtualMachines[0].virtualMachines[0].properties.osProfile.secrets[0].vaultCertificates[0].certificateStore)
                        .toBeUndefined();
                });
            });
        });
    }
});
