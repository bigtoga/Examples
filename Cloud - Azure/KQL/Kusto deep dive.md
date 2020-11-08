Fantastic depth here: https://xhinker.medium.com/understand-kusto-inside-out-and-why-kusto-is-so-fast-54697e6648d7

Kusto:
- Stores data on a backend striped set of drives to allow parallel searching/writing
- Stores data as column store / columnar 
- Designed around a “write once, delete rarely “ model 
- Designed for ingestion speed, this there are no constraints applied during load

# Cluster architecture 

Kusto cluster is a collection of compute nodes built on top of Azure Virtual Machines. 
- The minimum cluster size is two nodes
- the maximum is about 500

### The four types of nodes

Each node can be one or more of the following roles. 

- **Admin Node** - responsible for maintaining the overall cluster metadata
- **Query Head** - responsible for accepting and processing Kusto queryies. This is what you interact with when you are in the portal, in Azure Data Explorer, or using the Query Planner
- **Data Node** - the most common role, like its name indicates, this node responsible for: (1) storing data; (2) contribute the CPU and memory when execute the Kusto query
- **Gateway Node** - responsible for processing external API calls, authentication, and request dispatches

#### Admin node
- Every cluster has one Admin node 
- The admin mode maintains the cluster metadata snapshot
- The Admin node loads the metadata snapshot from Azure blob storage to its memory and maintains it as immutable data structure
- If the current Admin node becomes unavailable, a new Admin is immediately elected. The new Admin then loads d the metadata snapshot, and also send a survey to the rest nodes to collect their runtime status

# Data Architecture 

```
Cluster
|___database1
|   |___table1
|   |   |___extent data
|   |   |   |___column0
|   |   |   |   |___data blocks
|   |   |   |   |___policy:authorization;data retention...
|   |   |   |___column1
|   |   |___schema,ordered list of fields
|   |   |___policy objects:authorization;data retention...
|   |___table2
|   |___policy objects:authorization;data retention...
|___database2
``` 