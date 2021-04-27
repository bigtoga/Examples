# What is Azure Data Explorer?

Azure Data Explorer (ADE) is a fully PaaS analytics and reporting engine built on Kusto / KQL

From MSFT: *Azure Data Explorer is a fast, fully managed data analytics service for real-time analysis on large volumes of data streaming from applications, websites, IoT devices, and more. You can use Azure Data Explorer to collect, store, and analyze diverse data to improve products, enhance customer experiences, monitor devices, and boost operations.*

- [Sales slick](https://azure.microsoft.com/en-us/services/data-explorer/)
- [Documentation](https://docs.microsoft.com/en-us/azure/data-explorer/)
- [Quickstart - create a cluster ](https://docs.microsoft.com/en-us/azure/data-explorer/create-cluster-database-portal)
- [Quickstart - wire it up to Event Hubs](https://docs.microsoft.com/en-us/azure/data-explorer/ingest-data-event-hub)

# Workflow 

**Step 1: Create a new ADE cluster**

1. In the portal, search for “Data Explorer”, select it, then click “Add” to create a new cluster
1. Create a new database 
   - This is where you define retention period and cache period
1. Once the database is created, at the cluster, select “Query”
   - `.show databases` will list out your database
   - `.show tables`
   
   
**Step 2: Wire it up to Event Hub**

1.  Create an event hub
1.  Create a table in ADE 

```sql
create table TestTable (
   TimeStamp: datetime
   , Name: string
   , Metric: int
   , Source:string
)
```

3.  Create another table to map the incoming JSON data to the column names and data types of the table you just created

```json
create table TestTable ingestion json mapping ‘TestMapping’ ‘[
   {“column”:”TimeStamp”, “Properties”: {“Path”: “$.timeStamp”}}
   , {“column”:”Name”, “Properties”: {“Path”:”$.name”}}
   , {“column”:”Metric”, “Properties”: {“Path”:”$.metric”}}
   , {“column”:”Source”, “Properties”: {“Path”:”$.source”}}
]’
```

4.  In the ADE cluster, enter the database you created earlier
5.  Click **Data Ingestion -> Add data connection**
6.  Connect it to the Event Hub created and map ingestion to the table you created
7. Configure your app to write to the Event Hub




