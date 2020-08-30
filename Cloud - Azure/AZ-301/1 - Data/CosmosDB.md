<details>
  <summary>Basics</summary>
  
</details>  

<details>
  <summary>Pricing & SKUs</summary>
  
</details>  

<details>
  <summary>High Availability/DR/BC</summary>

**SLA: 99.99%**

**Latency** 
- Reads and writes - single-digit latency
- Worldwide replication - <10ms read, <15ms write

</details>  

<details>
  <summary>Monitoring & Alerting</summary>

**How to get alert for 40 units occuring 10 times in a 10-minute window?**
- Log Analytics query
- Query #1 - `requestCharge_s > 40`
- Query #2 - `period = 10` and `frequency = 10`
- Azure Monitor is alerting mechanism
- https://docs.microsoft.com/en-us/azure/cosmos-db/monitor-cosmos-db

</details>  


<details>
  <summary>Web Apps and CosmosDB</summary>

# Scenario: Web App service connects to CosmosDB

CosmosDB uses two types of keys: master keys and resource tokens. 
- Master keys are for administratrive actions
- Resource tokens provide access to resources

### Design pattern
A mid-tier service is set up to serve a mobile application to share user photos.
- The mid-tier service possesses the master key of the Cosmos DB account.
- The photo app is installed on end-user mobile devices.
- On login, the photo app establishes the identity of the user with the mid-tier service. This mechanism of identity establishment is purely up to the application.
- Once the identity is established, the mid-tier service requests permissions based on the identity.
- The mid-tier service sends a resource token back to the phone app.
- The phone app can continue to use the resource token to directly access Cosmos DB resources with the permissions defined by the resource token and for the interval allowed by the resource token.
- When the resource token expires, subsequent requests receive a 401 unauthorized exception. At this point, the phone app re-establishes the identity and requests a new resource token.

Missing step is that, b/c the mid tier app knows the master key, it creates a user on cosmosdb dynamically. Creating a user automatically creates a hash resource token.
</details>  


<details>
  <summary>Migrations</summary>

## From MongoDB 

https://docs.microsoft.com/en-us/azure/dms/tutorial-mongodb-cosmos-db?toc=/azure/cosmos-db/toc.json

- Option 1: use Azure Database Migration Service to perform an offline (one-time) migration of databases from an on-premises or cloud instance of MongoDB to Azure Cosmos DB's API for MongoDB

- Option 2: Use mongorestore
  
**MongoDB migration - what has most compatibility?** - "Database", not API or Collection


## SQL Server 

**How to migrate data from SQL Server into CosmosDB?** 
- https://docs.microsoft.com/en-us/azure/cosmos-db/import-data#SQL
- Run the DocumentDB Data Migration Tool

**Want to get a notification everytime data is received?**
- Deploy a Logic App that has the Azure CosmosDB connector
- Ensure the Logic App uses a SendGrid action

</details>  

<details>
  <summary>Permissions</summary>

**What roles exist and what do they do??** 
- DocumentDB Account Contributor - manage CosmosDB accounts
- Cosmos DB Account Reader - read account data
- Cosmos Backup Operator - can submit restore request for db or container for account
- Cosmos DB Operator - manage accounts but not access them. Prevents access to account keys and connection strings

</details>  

<details>
  <summary>Misc</summary>

**How to migrate data from SQL Server into CosmosDB?** 
- https://docs.microsoft.com/en-us/azure/cosmos-db/import-data#SQL
- Run the DocumentDB Data Migration Tool

**Want to get a notification everytime data is received?**
- Deploy a Logic App that has the Azure CosmosDB connector
- Ensure the Logic App uses a SendGrid action

</details>  
