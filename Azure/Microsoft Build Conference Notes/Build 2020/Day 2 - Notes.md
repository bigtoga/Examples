# Favorites
<details>
   <summary></summary>
* Azure ARM Template Specs with Azure ARM Private Repository
   
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
   
Everything you can do today with Azure Blue prints & ARM Templates you will also be able to do in future with Azure ARM Template Specs

## Roadmap
* 2020 H2 Preview - **"Resource Lifecycle Management"** will allow you to define a collection of resources that can be managed as a single unit
* 2020 H2 Open Source -                
   - Language Revision - simplifying; removing requirement to write json. Goal is to be a transparent abstraction of Azure

## Questions
* How to validate ARM templates in any IDE? 
   - ARM Tools extenson for VS Code. It validates both template structure and also validates resource configuration against Azure schemas.

* Best practices? 
   - just announced [Azure Resource Manager Template Toolkit](https://samcogan.com/azure-resource-manager-template-tool-kit/) should be able to help here too - it doesn't validate, but covers other syntax errors and practices.
   
* Why use ARM Template Specs vs. storing in source control?
   - Our goal was to make these available where our customers want them. Making them available in Azure removes that extra step to configure/allow access to a different resource
   - Source control has to be publicly available to your team whereas Azure ARM Template Private Registry allows you to only publish sensitive items without fear of others seeing
   
* Will we be able to write ARM templates in YAML?
   - No
   
</details>


<details>
   <summary>Expert Q&A: Cloud AI and Machine Learning</summary>
[Aaron (Ari) Bornstein](https://medium.com/@aribornstein) &bull; [twitter](https://twitter.com/pythiccoder?lang=en) &bull; [github](https://github.com/aribornstein)
   
## Questions
* Any improvements for F# and C# related to ML?
   - I would caution you to just focus on Python and the open source packages/libraries. PyTorch, tensorflow, keras, pandas
   - Look for the ONNX runtime/framework if you want to leverage this in .NET. This allows you to leverage the models built in Python in .NET
   
* What is your day like?
   - Q&As w various community spaces
   - Writing content
   - Unknown
* When to use "build my own model" vs. "out of the box model"
   -  Use 80/20 rule
   - 80% of scenarios that you want to develop can be done w out of the box AI: understanding customer sentiment
   - 20% are build your own
   - **But** the 20% tends to represent 80% of the business value of your offering
* Does Microsoft publish any open machine learning datasets and problems? 
   -  Yes
   - Also check out [Azure Team's Medium blog](https://medium.com/microsoftazure/archive)
* Use the Spark ecosystem for your data prep. Once you have your data into ML format, go to Azure Machine Learning
   -  
* Azure ML vs. Databricks?
   -  Databricks uses Spark ecosystem
   - Azure ML is not; it's built on Python and has other goals such as Auto ML
* Where to learn more? 
   -  Go to [papersincode.com](https://paperswithcode.com/) and follow 
* What will differentiate us in the future?
   -   Our domain knowledge
* Any shortcut for identifying a model / cheat sheet / quick start?
   -  Auto ML
* 
   -  
*   
* 
   -  
* 
   -  
* 
   
</details>





<details>
   <summary></summary>
   
</details>



## Questions  
* 
   -  
* 
   -  
* 
   -  
* 
   -  
* 
   -  
* 
   - 
