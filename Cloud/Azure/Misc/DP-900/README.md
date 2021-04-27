## Cosmos DB

**What happens when you add a new property to a JSON document that doesn't exist in any other documentm when storing in Cosmos DB?**
- You can dynamically insert a new property and the insert will succeed. Previous documents will not be updated
- NoSQL databases don't have a fixed schema so no worries
	
**You need to insert a new JSON document into a Cosmos DB database. All previous customers have a valid name but the data you need to insert does not. What happens when you try to insert a JSON document that is missing a field that all other documents have?**
- The insert will succeed
- No default value will be created
	
Sub 10ms latency 
	
## Analytics 
- What happened? 					Descriptive
- Why did it happen? 				Diagnostic
- What will happen? 				Predictive
- What should I do? 				Prescriptive 
- Learn and improve over time? 	Cognitive 
	
## Azure Data Factory
**Tumbling Window Trigger** - can run a job using data for a specific period of time and not before or after that period
	
ADF supports existing SSIS packages and can run them in the cloud
	
## Azure Data Studio, sqlcmd.exe
- Cross platform - Windows, MacOS, Linux
- Open source 
	
sqlcmd 
	Windows, Linux only - MacOS in preview 
	Can run in Docker container 

## Graph data 
Graph data stores nodes and their relationships to each other (called Edges)
	
## Azure SQL Database 
**If you set up Azure SQL Database with a public endpoint and nothing else, who can connect?**
- No one - even with a public endpoint, the SQL database still has to hae it's firewall configured to allow 
- By default, all access attempts are denied unless explicitly allowed in ACLs 

**If you set up Azure SQL networking with "no access", who can connect?**
- No one, not even admins 
		
**You have a server, Server1, with one database, db1. You add a second database (db2) - do you have to pay more?**
- Yes. 

**You have a server, Server1, and an elastic pool on it (pool1). You have one db: db1. You add a second database (db2) - do you have to pay more?**
- No
- For elastic, you pay per pool 
		
## Reporting and Data Visualization
**Example of a paginated report?** - An invoice. Something meant to be printed

**What builds paginated reports?** - Power BI Report Builder 

**Where are reports published?** -  Power BI Service 
		
## Storage 
**How much can be stored in a single Table storage account?**
- 5 PB 
- Storage accounts have a 5PB limit 
		
	
