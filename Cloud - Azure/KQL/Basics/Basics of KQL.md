# Searching & Filtering

- `==` is case-sensitive; use `=~` for case-insensitive

# Columns

**You can use `extend` or `alias`

// =~ is for case-insentive matches
// extend or alias will work too: summarize count() by OS = properties.storageProfile.osDisk.osType
** Case-insensitive search** uses `=~`

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
