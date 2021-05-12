# Looping

[How to loop and iterate in Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/copy-resources)
- **Remember** the defaults of ARM!
   - Parallel by default
   - No guarantee of order of execution - the “last” element in your array might be the first resource created, or the 3rd, or last
   - Use `serial` if you need a guaranteed order

<Details> 
<summary>Looping basics</summary>  

Using a loop index (`storageCount`) to create 2 mew storage accounts:

```json
param storageCount int = 2

resource storage_id ‘Microsoft.Storage/storageAccounts@2019-04-01’ = [for i in range(0, storageCount): {
  name: ‘${i}storage${uniqueString(resourceGroup().id)}’
  location: resourceGroup().location
  sku: {
    name: ‘Standard_LRS’
  }
  kind: ‘Storage’
  properties: {}
}]
``` 

Using an array, `storageNames`, to create 3 new storage accounts

```json
param storageNames array = [
  ‘contoso’
  ‘fabrikam’
  ‘coho’
]

resource storageNames_id ‘Microsoft.Storage/storageAccounts@2019-04-01’ = [for name in storageNames: {
  name: concat(name, uniqueString(resourceGroup().id))
  location: resourceGroup().location
  sku: {
    name: ‘Standard_LRS’
  }
  kind: ‘Storage’
  properties: {}
}]

``` 
</details> 

<details>
<summary>Advanced looping</summary> 

Use `batchSize` decorator to force ARM to only deploy 2 at a time

```json
@batchSize(2)
resource storage_id ‘Microsoft.Storage/storageAccounts@2019-04-01’ = [for i in range(0, 4): {
  name: ‘${i}storage${uniqueString(resourceGroup().id)}’
  location: resourceGroup().location
  sku: {
    name: ‘Standard_LRS’
  }
  kind: ‘Storage’
  properties: {}
}]
``` 



