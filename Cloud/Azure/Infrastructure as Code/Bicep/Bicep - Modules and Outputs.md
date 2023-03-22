# Outputs

Outputs have a name just like a parameter
- `output ipFqdn string = publicIPAddress.properties.dnsSettings.fqdn`
- `output appServiceAppName string = appServiceAppName`

Key design concept: **never output secrets**. 

# Modules

Chunk like this:

![x](https://docs.microsoft.com/en-us/learn/bicep/deploy-azure-resources-by-using-bicep-templates/media/7-templates-modules.png)

```json
module myModule ‘modules/my-module.bicep’ = {
  name: ‘MyModule’
  params: {
    location: location
  }
}
```

# Example

File: `bicep-modules/app-services.bicep`

```json
param location string
param appServiceAppName string

@allowed([
  ‘nonprod’
  ‘prod’
])
param environmentType string

var appServicePlanName = ‘toy-product-launch-plan’
var appServicePlanSkuName = (environmentType == ‘prod’) ? ‘P2_v3’ : ‘F1’
var appServicePlanTierName = (environmentType == ‘prod’) ? ‘PremiumV3’ : ‘Free’

resource appServicePlan ‘Microsoft.Web/serverFarms@2020-06-01’ = {
  name: appServicePlanName
  location: location
  sku: {
    name: appServicePlanSkuName
    tier: appServicePlanTierName
  }
}

resource appServiceApp ‘Microsoft.Web/sites@2020-06-01’ = {
  name: appServiceAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}
```

```json

param location string = resourceGroup().location
 param storageAccountName string = ‘toylaunch${uniqueString(resourceGroup().id)}’
 param appServiceAppName string = ‘toylaunch${uniqueString(resourceGroup().id)}’

 @allowed([
   ‘nonprod’
   ‘prod’
 ])
 param environmentType string

 var storageAccountSkuName = (environmentType == ‘prod’) ? ‘Standard_GRS’ : ‘Standard_LRS’

 resource storageAccount ‘Microsoft.Storage/storageAccounts@2019-06-01’ = {
   name: storageAccountName
   location: location
   sku: {
     name: storageAccountSkuName
   }
   kind: ‘StorageV2’
   properties: {
     accessTier: ‘Hot’
   }
 }

// Modules are just executable code so reference them when it is time to execute the code
module appService ‘bicep-modules/app-services.bicep’ = {
    name: ‘appService’
    params: {
      location: location
      appServiceAppName: appServiceAppName
      environmentType: environmentType
    }
}
``` 







