<details>
    <summary>If you want to just show the value from a query, use `--output tsv`</summary>
    
```powershell
az account show --query 'user.name' 
```
>>> "scott@scott.com"

```powershell
az account show --query 'user.name' --output tsv
```
>>> scott@scott.com

</details>

<details>
   <summary>`--output JSON` shows all, others do not</summary>

$subscription = "My subscription"

```powershell
# If ddosProtectionPlan is null, JSON shows it
az network vnet list --subscription $subscription --query `
    "[0].{vnet:name, cidr_Range:addressSpace.addressPrefixes[0], DDOS_Enabled:[?not_null(ddosProtectionPlan)]}" `
    -o json
```
```json
[
  {
    "DDOS_Enabled": null,
    "cidr_Range": "10.25.0.0/16",
    "vnet": "devvnet01"
  }
]
```
Tables do not show null output
```powershell
az network vnet list --subscription $subscription --query `
    "[*].{vnet:name, cidr_Range:addressSpace.addressPrefixes[0], DDOS_Enabled:ddosProtectionPlan}" `
    -o table
```
<pre>
Vnet           Cidr_Range
-------------  -------------
devvnet01  10.25.0.0/16
</pre>
</details>
