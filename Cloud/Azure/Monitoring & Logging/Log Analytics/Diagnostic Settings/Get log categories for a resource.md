[Documentation page is here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories)
- [Bastion Hosts](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworkbastionhosts)
- [Network - Load Balancers](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworkloadbalancers)
- [Network - NSGs](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworknetworksecuritygroups)
- [Network - Public IPs and DDoS Mitigation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworkpublicipaddresses)
- [Network - vnet Gateways](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworkvirtualnetworkgateways)
- [Network - VPN Gateways](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories#microsoftnetworkvpngateways)

Another Option is to use the "All Resources" page in [Azure portal](https://portal.azure.com/#allservices)
1. Go to Azure Portal
2. Browse to "All Services"
3. In left menu, filter for category

If you have a resource deployed to Azure, then you can check available diagnostic settings this way:

```powershell
$kvName = 'kv-XXXX'
$resourceId = (Get-AzKeyVault -Name $kvName).ResourceId 
Get-AzDiagnosticSettingCategory -TargetResourceId $resourceId | Select-Object -Property Name, CategoryType
```

<pre>
Name                         CategoryType
----                         ------------
AuditEvent                           Logs
AzurePolicyEvaluationDetails         Logs
AllMetrics                        Metrics
</pre>

If you want to know what AllMetrics are:

```powershell
$kvName = 'kv-XXXX'
$resourceId = (Get-AzKeyVault -Name $kvName).ResourceId 
(Get-AzMetricDefinition -ResourceId $resourceId).Name
```

<pre>
Value             LocalizedValue
-----             --------------
ServiceApiHit     Total Service Api Hits
ServiceApiLatency Overall Service Api Latency
ServiceApiResult  Total Service Api Results
SaturationShoebox Overall Vault Saturation
Availability      Overall Vault Availability
</pre>

# Bash 

If you want to view this with Azure CLI:

```shell

az monitor diagnostic-settings categories list --resource "mystorageaccount/blobServices/default" \
    --resource-group "rg-myrg" \
    --resource-namespace "Microsoft.Storage" \
    --resource-type storageAccounts \
    --query 'value[?categoryType].[name]' --output tsv
