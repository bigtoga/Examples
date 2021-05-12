# Azure Bicep Basics

- Released in 2021 as a simpler version of JSON templates for Azure ARM templates
- [Good Microsoft Learn module](https://docs.microsoft.com/en-us/learn/modules/introduction-to-infrastructure-as-code-using-bicep/)
- [Microsoft Learn - how to deploy ARM bicep templates with PowerShell](https://docs.microsoft.com/en-us/learn/modules/deploy-azure-resources-by-using-bicep-templates/)

## Why Bicep instead of JSON?

Few reasons:
1. Less code - [see this side by side example](https://bicepdemo.z22.web.core.windows.net/)
- Bicep has an `output` parameter that allows you to reference newly created items in a dependency fashion

Look below for `appServicePlan.Id` - this is the dependency beauty of Bicep:


`main.bicep` file (no parameters)
```json
// Define an app service plan:
resource appServicePlan ‘Microsoft.Web/serverFarms@2020-06-01’ = {
  name: ‘toy-product-launch-plan’
  location: ‘eastus’
  sku: {
    name: ‘F1’
    tier: ‘Free’
  }
}

// Now create a web app on the newly created plan 
resource appServiceApp ‘Microsoft.Web/sites@2020-06-01’ = {
  name: ‘toy-product-launch-1’
  location: ‘eastus’
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}

```

## Declarative vs. Imperative Coding

**Declarative**: Don’t care how; just want to define end result we want (i.e. outcomes)
- “I want a storage account in East US with this name and these features enabled”

**Imperative**: I want a thing, and I want it done exactly in this way with this tool
- `az group create —name rg-storage -location eastus`

## Configuring Visual Studio Code for Bicep

- Install [this extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep)
- Use this to see the various API versions and properties in JSON 

## Installing Bicep PowerShell module

- https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/bicep-install 
      - `choco` is easiest way
      
 ```powershell
 # Create the install folder
$installPath = “$env:USERPROFILE\.bicep”
$installDir = New-Item -ItemType Directory -Path $installPath -Force
$installDir.Attributes += ‘Hidden’
# Fetch the latest Bicep CLI binary
(New-Object Net.WebClient).DownloadFile(“https://github.com/Azure/bicep/releases/latest/download/bicep-win-x64.exe”, “$installPath\bicep.exe”)
# Add bicep to your PATH
$currentPath = (Get-Item -path “HKCU:\Environment” ).GetValue(‘Path’, ‘’, ‘DoNotExpandEnvironmentNames’)
if (-not $currentPath.Contains(“%USERPROFILE%\.bicep”)) { setx PATH ($currentPath + “;%USERPROFILE%\.bicep”) }
if (-not $env:path.Contains($installPath)) { $env:path += “;$installPath” }
# Verify you can now access the ‘bicep’ command.
bicep —help
# Done!
```

# Workflow

With previous JSON-based ARM templates, the process flow was:
1. Create the JSON file (declarative)
2. Create the parameters file
3. Submit a template deployment request  (imperative) using portal. azure CLI, PowerShell, etc

With Bicep, an extra hidden step is added called “transpilation”:
1. Create the Bicep JSON file
2. Create the parameters file
3. Submit a template deployment request
4. Azure Resource Manager (ARM) then *transpilates* the Bicep IaC into a JSON version for you
5. The ARM executes the JSON template

PowerShell: 
```powershell
New-AzResourceGroupDeployment -TemplateFile main.bicep

Get-AzResourceGroupDeployment -ResourceGroupName [sandbox resource group name] | Format-Table
```

# Parameters and Expressions in Bicep

## Parameters 

- No delimiter - just define with `param` declaration
- Data types: `string, int, bool, array, object`
- Implicit: use `var` instead of declaring a type and Bicep will figure it out

## Expressions

- `uniqueString()`
- Pipeline-like function `resourceGroup()` operates on whatever resource group it is called against - `param location string = resourceGroup().location`

```json
// Define the param
param location string = resourceGroup().location

// Now use it
resource appServiceApp ‘Microsoft.Web/sites@2020-06-01’ = {
  name: appServiceAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}

## Example

`main.bicep` file:

```json
param location string = resourceGroup().location
param storageAccountName string = ‘toylaunch${uniqueString(resourceGroup().id)}’

param appServiceAppName string = ‘toylaunch${uniqueString(resourceGroup().id)}’

var appServicePlanName = ‘toy-product-launch-plan’

resource storageAccount ‘Microsoft.Storage/storageAccounts@2019-06-01’ = {
  name: storageAccountName
  location: location
  sku: {
    name: ‘Standard_LRS’
  }
  kind: ‘StorageV2’
  properties: {
    accessTier: ‘Hot’
  }
}

@allowed([
 ‘nonprod’
 ‘prod’
])
param environmentType string

var storageAccountSkuName = (environmentType == ‘prod’) ? ‘Standard_GRS’ : ‘Standard_LRS’

var appServicePlanSkuName = (environmentType == ‘prod’) ? ‘P2_v3’ : ‘F1’

var appServicePlanTierName = (environmentType == ‘prod’) ? ‘PremiumV3’ : ‘Free’

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

Now deploy!

```powershell
New-AzResourceGroupDeployment `
  -TemplateFile main.bicep `
  -environmentType nonprod
``` 
