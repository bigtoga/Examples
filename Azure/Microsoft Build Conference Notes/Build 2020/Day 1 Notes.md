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
</details>

# NEW: Azure Synapse Link
Links your existing **Cosmos DB** operational databases to Synapse automatically - "in mere seconds" - and without any code.
* No ETL needed
* Real time data analytics
* No performance impact on the database

"Will add to other relational databases in the future"

### How it works
Single click inside the Cosmos DB portal enables it. Holy moly. This is absolutely a game changer
