**How to log {anything related to Azure Backup, Site Recovery}?**
- Diagnostic settings
- https://docs.microsoft.com/en-us/azure/site-recovery/monitor-log-analytics

**How to monitor Azure Site Recovery?**
- Azure Monitor using Diagnostic settings logs

**Set up alerts for ASR?**
- Azure Monitor

**What is needed for ASR?**
- Recovery Services vault
- Log Analytics workspace to store Site Recovery logs

**How to store `AzureBackupReport` logs?**
- 3 options: Storage account, Event Hub, Log Analytics

## Queries for ASR

Pie chart of replication health
```
AzureDiagnostics  
| where replicationProviderName_s == "A2A"   
| where isnotempty(name_s) and isnotnull(name_s)  
| summarize hint.strategy=partitioned arg_max(TimeGenerated, *) by name_s  
| project name_s , replicationHealth_s  
| summarize count() by replicationHealth_s  
| render piechart
```

RPO time for all VMs right now 
```
AzureDiagnostics 
| where replicationProviderName_s == "A2A"   
| where isnotempty(name_s) and isnotnull(name_s)  
| extend RPO = case(rpoInSeconds_d <= 900, "<15Min",   
rpoInSeconds_d <= 1800, "15-30Min", ">30Min")  
| summarize hint.strategy=partitioned arg_max(TimeGenerated, *) by name_s  
| project name_s , RPO  
| summarize Count = count() by RPO  
| render barchart
```
