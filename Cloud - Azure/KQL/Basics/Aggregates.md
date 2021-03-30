
** Group by
```kql
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend OS = properties.storageProfile.osDisk.osType
| summarize VMs = count() by tostring(OS)
```
