2024 - this works inside Log Analytics Workspace:
```kql
InsightsMetrics
| where Origin == "vm.azm.ms"
    and Namespace == "LogicalDisk"
    and Name == "FreeSpacePercentage"
    and Val <= 20
| extend Disk=tostring(todynamic(Tags)["vm.azm.ms/mountId"])
| summarize Disk_Free_Space = round(avg(Val), 2) by Computer, Disk, _ResourceId
| project Computer, Disk, Disk_Free_Space
```

2024: Not sure the below works after the Azure Monitor Agent migration
```kql
Perf
| where TimeGenerated > ago(1d)
| where ObjectName == "LogicalDisk" and CounterName == "% Free Space"
| where InstanceName != "Z:"
| summarize (TimeGenerated, Free_Space_Percent)=arg_max(TimeGenerated, CounterValue) by Server=substring(Computer, 0, indexof(Computer, ".")), InstanceName
| where strlen(InstanceName) ==2 and InstanceName contains ":"
| order by Free_Space_Percent asc 
```
