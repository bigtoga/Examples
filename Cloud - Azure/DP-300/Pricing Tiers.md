Easiest to [use the Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to see all of the options.

# Azure SQL Database only

## Step 1: Decide your type of deployment, your backup storage, and long term retention

There are only four "global options" that apply to "all types of deployments, all service tiers, and all pricing tiers". All others are dependent on these choices.

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Region  	| Choose wisely   	|   	|
| Type  	| `Single Database` or `Elastic Pool`   	|   	|
| Backup Storage Tier  	| Only one option today: `RA-GRS`  	|   	|
| Long Term Retention	| You must choose the options for "How big will your backups be?", "How long do you want to retain (in weeks, months, and years)?"	|   	|

## Step 2: Choose your type of deployment

### Single Database

- You have a single database
- That database needs specific DTU or vCore resources allocated to it

### Elastic Pool

- You have a set of databases
- You want to reserve DTUs or vCores for distribution across those databases
- Ideally this is an *economic choice* to save money over using "a lot of different Single Database deployments"

### Deciding / Moving Between Each

| Scenario  	| Use This  	| Why?  	|
|---	|---	|---	|
| ISV with "one database per customer"  	| Single Database  	| Some customers' use of "their database" will be higher than others. If you use Elastic Pool, you risk one customer "using up all of the other customers' DTUs"  	|
| ISV with multiple databases supporting a single application  	| Need more info - do "some" databases consume more resources? If yes, consider those to be Single Database then create an elastic pool with the remaining. Do the databases "need to be able to see the other databases" (i.e. 3-part query)? If so, then they have to be elastic pool  	|   	|
| All of our databases "peak" at the same time of day  	| Either; both Single Database and Elastic Pool support scaling up/down  	|   	|
| Have a set of DBs but 1 DB is heavily used  	| Elastic Pool for the set and Single Database for the heavy use DB *if* the app supports this  	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|

Other resources:
- https://docs.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview
      - "Pools are well suited for a large number of databases with specific utilization patterns"
      - "... multiple databases with persistent medium-high utilization should not be placed in the same elastic pool"
      - "The more databases you can add to a pool the greater your savings become"
- Good older article: https://peter.intheazuresky.com/2016/08/29/elastic-database-pools-purpose-when-and-why/ 

## Step 3: Choose Your Pricing Model (a.k.a. Purchase Model)

Both Single Database and Elastic Pool have the same way to license: either by vCore or DTU
- **vCore** - perfect if you own the licenses already and are using Azure Hybrid Use Benefits. Also perfect for "known workloads"
- **DTU** - "We don't know what the workload will be" or "It is unpredictable" or "It's so small!"
      - Microsoft's documentation on [What is a DTU?](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (a blend of CPU, memory, and I/O)

## Step 4a: "I chose vCore"

This means you want Microsoft to reserve hardware for you. They will do so by provisioning space on a set of Azure VMs running SQL Server, and on Azure Storage. Your next set of choices are:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	|  `General Purpose`, `Business Critical`, or `Hyperscale`  	| Service Tier defines the SLAs in play (if any)  	|
| Compute Tier  	|  `Provisioned` or `Serverless`   	|   	|
| Hardware Type  	| `Gen5`, `Gen4`, or `Fsv2-series`  	|   	|
| Instance  	| # of cores the node must have 	|   	|

[Microsoft's guidance on how to choose the right # of vCores](https://docs.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview#how-do-i-choose-the-correct-pool-size)
- vCores = MAX(&lt;Total number of DBs X average vCore utilization per DB&gt;, &lt;Number of concurrently peaking DBs X Peak vCore utilization per DB&gt;)

## Step 4b: "I chose DTU"

This means you want Microsoft to reserve a predefined amount of compute for you over a time period of one month. They will not provision dedicated infrastructure for you but rather your workloads will run on existing compute alongside other customers' workloads. You are billed on consumption only.


| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	| `Basic`, `Standard`, or `Premium`   	| Service Tier defines the SLAs in play (if any)   	||
| Performance Level  	| `eDTUs` are for elastic  	|   	|

[Microsoft's guidance on how to choose the right # of DTUs and eDTUs](https://docs.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview#how-do-i-choose-the-correct-pool-size)
- eDTUs = MAX(&lt;Total number of DBs X average DTU utilization per DB&gt;, &lt;Number of concurrently peaking DBs X Peak DTU utilization per DB&gt;)
