# Favorite parts
<details>
   <summary>Data Science / Data Warehouse: Azure Synapse Link</summary>
   - Able to support Azure Cosmos DB integration to skip ETL and provide Azure Synapse with real time access to Azure Cosmos DB operational data in seconds and without impacting source system
   - [TechCrunch write-up about Azure Synapse Link](https://techcrunch.com/2020/05/19/microsoft-launches-azure-synapse-link-to-help-enterprises-get-faster-insights-from-their-data/)
</details>

<details>
   <summary>Storage | Azure Storage Explorer is now in Preview in the portal</summary>
   - Same benefits as Azure File Explorer download without the need to download the tool
</details>

* Windows Terminal 1.0 released which means it is enterprise ready

# Sessions
<details>
   <summary>Azure: Invent with Purpose with Scott Guthrie</summary>

## Azure Kubernetes
* ak8s now "enterprise grade" according to MSFT
* General Availability of Container Services

## Cosmos DB
* Free tier announced - 1st 400 RUs of throughput and x GB free
* Serverless pricing
* Auto-scale to maintain single digit ms
* **Capable of trillions of events per second**

## Azure Cognitive Services
* Vision, Speech, Search, Language, Decision
* Pre-built models you can use with zero knowledge of ML
* Enhanced container support
* "Personalizer" is the only AI unsupervised model
* "Personalizer Apprentice" is a new mode

## Power Platform
* Allows developers to blend Microsoft 365 + Dynamics 365 + Azure

## Power Apps - low/no code tool for "citizen developers"
https://github.com/jeffhollan

Demo: Power App in Teams -> API Mgmt servioce -> Azure k8s -> Azure Cosmos DB. Showed an app on mobile 
* Cosmos DB
* VS2019 - connected to Cosmos DB
   - Add a dependency --> Cosmos DB and VS2019 brings in connections
   - VS2019 gives you GUI option to use Azure Key Vault so you never ever need to see a pssword
   - Cosmos DB SDK installed
* New tool: **HttpRepl** - allows you to browse and work with your local API development using command line
   - ls - lists the endpoints
   - get - runs a get
   - [download HttpRepl](https://github.com/dotnet/HttpRepl)
* Deploy API to Azure Kubernetes Services
* Configure API Management to serve
* Launch Power Apps and build your tool
* Publish to Microsoft Teams
   - You can instantly add any Power App to Teams

---
# Rohan Kumar - VP of Data Engineering
## Anure Analytics 
What they are calling Azure Synapse + Azure ML + PowerBI

# NEW: Azure Synapse Link
Links your existing **Cosmos DB** operational databases to Synapse automatically - "in mere seconds" - and without any code.
* No ETL needed
* Real time data analytics
* No performance impact on the database

"Will add to other relational databases in the future"

### How it works
Single click inside the Cosmos DB portal enables it. Holy moly. This is absolutely a game changer

</details>

<details>
   <summary>Building the tools to work and learn</summary>
   
</details>

<details>
   <summary>Fairness in Machine Learning</summary>
   
# Fairlearn - new open source toolkit from Microsoft
[Fairlearn](https://github.com/fairlearn/fairlearn) - 
* Integrated within Azure Machine Learning in future
* Helps determine "Is my model fair?"
* Helps teams mitigate fairness issues

Input: Sensitive attribute, Performance Metric

From github page:
> An AI system can behave unfairly for a variety of reasons. In Fairlearn, we define whether an AI system is behaving unfairly in terms of its impact on people – i.e., in terms of harms. We focus on two kinds of harms:
* *Allocation harms*. These harms can occur when AI systems extend or withhold opportunities, resources, or information. Some of the key applications are in hiring, school admissions, and lending.
*Quality-of-service harms*. Quality of service refers to whether a system works as well for one person as it does for another, even if no opportunities, resources, or information are extended or withheld.
>We follow the approach known as *group fairness*, which asks: Which groups of individuals are at risk for experiencing harms? The relevant groups need to be specified by the data scientist and are application specific.

## Interpretability techniques

## InterpretML
Microsoft has open sourced [InterpretML](https://github.com/interpretml/interpret) - blackbox and glassbox modes, Interpret-text tools
* Glass box models - models that are designed to be inherently interpretable. Lossless explainability
   - Decision trees
* Black box models - I can't inspect it, nor can I explain how it works. Approximate explainability - shap, lime, partial dependence, sensitivity analysis

## Fairness Mitigation

Select `Fairness Criteria` - Democratic Partiy or Equalized Odds?
Then Select `Mitigation`

Responsible ML / Responsible Machine Learning



</details>
