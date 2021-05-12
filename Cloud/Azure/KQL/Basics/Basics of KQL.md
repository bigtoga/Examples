# Start here

1. [Example queries at MSFT documentation are great](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/tutorial?pivots=azuredataexplorer)
2. The [SQL to Kusto cheat sheet](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/sqlcheatsheet) is also great

Send a SQL query to Kusto with the word `EXPLAIN` before it:
```sql
EXPLAIN 
SELECT COUNT_BIG(*) as C FROM StormEvents
```

It will return:
```
StormEvents
| summarize C=count()
| project C
```

# Searching & Filtering

- `==` is case-sensitive; use `=~` for case-insensitive

```kql
Resources
| where type=~ 'microsoft.compute/virtualmachinescalesets'
| where name contains 'contoso'
```

**RegEx example** from [this page](https://docs.microsoft.com/en-us/azure/governance/resource-graph/samples/advanced?tabs=azure-cli#vm-regex)
- `^` - Match must start at the beginning of the string.
- `Contoso` - The case-sensitive string.
- `(.*)` - A subexpression match:
- `.` - Matches any single character (except a new line).
- `*` - Matches previous element zero or more times.
- `[0-9]` - Character group match for numbers 0 through 9.
- `+` - Matches previous element one or more times.
- `$` - Match of the previous element must occur at the end of the string.

```kql
Resources
| where type =~ 'microsoft.compute/virtualmachines' and name matches regex @'^Contoso(.*)[0-9]+$'
| project name
| order by name asc
```

# Distinct and Union
```kql
Resources
| distinct type, apiVersion
| where isnotnull(apiVersion)
| order by type asc
```

# Columns

**You can use `extend` or `alias`

- `=~` is for case-insentive matches
- `extend` or `alias` will work too: `summarize count() by OS = properties.storageProfile.osDisk.osType`

```kql
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend OS = properties.storageProfile.osDisk.osType
| summarize VMs = count() by tostring(OS)
```

**Remove a column from the results** with `project-away`:
```kql
Resources
| summarize resourceCount=count() by subscriptionId
| join (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId
| project-away subscriptionId, subscriptionId1
```
