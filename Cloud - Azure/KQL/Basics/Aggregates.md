
** Group by
```kql
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend OS = properties.storageProfile.osDisk.osType
| summarize VMs = count() by tostring(OS)
```

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
