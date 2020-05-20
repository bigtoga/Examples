# Favorites
<details>
   <summary></summary>
   
</details>

# Sessions

<details>
   <summary>Infrastructure as code - build Azure applications with ARM templates
</summary>
Neil Peterson - https://github.com/neilpeterson, author of [ARM Templates extension for VS Code](https://github.com/neilpeterson/vscode-azurearmtools)

> Description: Get best practices for deploying/maintaining infrastructure with ARM templates–includes template authoring tooling 
enhancements, What-IF, Azure Blueprints, Azure DevOps integrations and investments in the deployment platform.

## What-if? 
The `-c` parameter is shortcut for `confirm-with-what-if` and will **check** Azure before/after simulating the change and allow you to 
continue forward if you are happy with them.

## New: "Template Specs"
Previously with Azure ARM templates, if you wanted to share them, you had to put them in a public endpoint - blob storage w a SAS key, 
for ex. Today, **Azure Template Specs** now allow you to privately share these:
1. Package your template and/or supporting files (Powershell, bash, etc)
2. Publish to **ARM Template Private Registry**
   - Private
   - Versioning built in
   - Deployable standalone or as part of a more complex deployment

Once published in the `ARM Template Private Registry`, you will get a `TEMPLATEID`. You can now use the `TEMPLATEID` in Azure 
CLI/bash/Powershell
   

## Questions
* How to validate ARM templates in any IDE? 
   - ARM Tools extenson for VS Code. It validates both template structure and also validates resource configuration against Azure schemas.

* Best practices? 
   - just announced [Azure Resource Manager Template Toolkit](https://samcogan.com/azure-resource-manager-template-tool-kit/) should be able to help here too - it doesn't validate, but covers other syntax errors and practices.
</details>






<details>
   <summary></summary>
   
</details>
