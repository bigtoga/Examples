
https://docs.microsoft.com/en-us/cli/azure/monitor

```shell
az monitor -h

# What are you monitoring?
az monitor activity-log alert list --subscription $subscription `
    --query '[].{Name: name, Location: location, Kind: kind, ResourceGroup: resourceGroup, Enabled: enabled}' `
    --output table
```
| Name  | Location | ResourceGroup | Enabled |
|---|---|---|---|
| Service Health Alert | Global | **False**  | myRG |

Uh-oh - you have no monitors.
