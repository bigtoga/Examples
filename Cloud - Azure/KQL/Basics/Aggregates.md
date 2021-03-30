
```kql
// =~ is for case-insentive matches
// extend or alias will work too: summarize count() by OS = properties.storageProfile.osDisk.osType
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend OS = properties.storageProfile.osDisk.osType
| summarize VMs = count() by tostring(OS)
```
