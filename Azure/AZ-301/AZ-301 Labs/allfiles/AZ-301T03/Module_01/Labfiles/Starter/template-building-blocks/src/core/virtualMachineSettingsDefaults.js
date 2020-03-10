'use strict';

const VIRTUALMACHINE_SETTINGS_DEFAULTS_WINDOWS = {
    vmCount: 1,
    namePrefix: 'default',
    size: 'Standard_DS2_v2',
    osType: 'windows',
    osDisk: {
        caching: 'ReadWrite',
        createOption: 'fromImage',
        encryptionSettings: {
            volumeType: 'All'
        }
    },
    adminUsername: 'adminUser',
    storageAccounts: {},
    diagnosticStorageAccounts: {},
    nics: [],
    imageReference: {
        publisher: 'MicrosoftWindowsServer',
        offer: 'WindowsServer',
        sku: '2016-Datacenter',
        version: 'latest'
    },
    dataDisks: {
        count: 0,
        diskSizeGB: 127,
        caching: 'None',
        createOption: 'empty',
        disks: []
    },
    extensions: [],
    existingWindowsServerlicense: false,
    availabilitySet: {},
    virtualNetwork: {},
    applicationGatewaySettings: {},
    loadBalancerSettings: {
        backendPools: [],
        inboundNatRules: [],
        inboundNatPools: [],
        loadBalancingRules: []
    },
    scaleSetSettings: {},
    tags: {},
    secrets: [
        {
            certificates: {
                certificateStore: 'My'
            }
        }
    ],
    usePlan: false,
    zones: []
};

const VIRTUALMACHINE_SETTINGS_DEFAULTS_LINUX = {
    vmCount: 1,
    namePrefix: 'default',
    size: 'Standard_DS2_v2',
    osType: 'linux',
    osDisk: {
        caching: 'ReadWrite',
        createOption: 'fromImage'
    },
    adminUsername: 'adminUser',
    storageAccounts: {},
    diagnosticStorageAccounts: {},
    nics: [],
    imageReference: {
        publisher: 'Canonical',
        offer: 'UbuntuServer',
        sku: '16.04-LTS',
        version: 'latest'
    },
    dataDisks: {
        count: 0,
        diskSizeGB: 127,
        caching: 'None',
        createOption: 'empty',
        disks: []
    },
    extensions: [],
    availabilitySet: {},
    virtualNetwork: {},
    applicationGatewaySettings: {},
    loadBalancerSettings: {
        backendPools: [],
        inboundNatRules: [],
        inboundNatPools: [],
        loadBalancingRules: []
    },
    scaleSetSettings: {},
    tags: {},
    secrets: [],
    usePlan: false,
    zones: []
};

exports.defaultWindowsSettings = VIRTUALMACHINE_SETTINGS_DEFAULTS_WINDOWS;
exports.defaultLinuxSettings = VIRTUALMACHINE_SETTINGS_DEFAULTS_LINUX;