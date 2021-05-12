# Azure Bicep Basics

- Released in 2021 as a simpler version of JSON templates for Azure ARM templates
- [Good Microsoft Learn module](https://docs.microsoft.com/en-us/learn/modules/introduction-to-infrastructure-as-code-using-bicep/)
- [Microsoft Learn - how to deploy ARM bicep templates with PowerShell](https://docs.microsoft.com/en-us/learn/modules/deploy-azure-resources-by-using-bicep-templates/)

## Declarative vs. Imperative Coding

**Declarative**: Don’t care how; just want to define end result we want (i.e. outcomes)
- “I want a storage account in East US with this name and these features enabled”

**Imperative**: I want a thing, and I want it done exactly in this way with this tool
- `az group create —name rg-storage -location eastus`

## Configuring Visual Studio Code for Bicep

- Install [this extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep)
- Use this to see the various API versions and properties in JSON 

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
