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
