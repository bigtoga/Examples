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

https://peter.intheazuresky.com/2016/08/29/elastic-database-pools-purpose-when-and-why/ 

**vCore** - perfect if you own the licenses already and are using Azure Hybrid Use Benefits. Also perfect for "known workloads"

**DTU** - "We don't know what the workload will be" or "It is unpredictable"
- Microsoft's documentation on [What is a DTU?](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) (a blend of CPU, memory, and I/O)



| Purchase Model	| `vCore` or `DTU`  	|   	|

## Step 2" 
For **elastic pool** deployments:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Performance Level  	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|

For **vCore** deployments:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	|  `General Purpose`, `Business Critical`, or `Hyperscale`  	|   	|
| Compute Tier  	|  `Provisioned` or `Serverless`   	|   	|
| Hardware Type  	| `Gen5`, `Gen4`, or `Fsv2-series`  	|   	|
| Instance  	| # of cores the node must have 	|   	|

For **DTU** deployments:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	| `Basic`, `Standard`, or `Premium`   	|   	|
