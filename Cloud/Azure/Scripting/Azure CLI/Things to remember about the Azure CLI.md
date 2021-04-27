<details>
    <summary>Powershell has known quoting issues</summary>
    
Workaround - use `--%` to tell the parser to stop parsing Powershell code and treat everything as a literal

```az --% vm create --name xxx```

[Read all about it here](https://github.com/Azure/azure-cli/blob/dev/doc/quoting-issues-with-powershell.md)    

</details>

<details>
    <summary>How to capture result into a variable</summary>

``` running_vm_ids=$(az vm list -d -g my_rg --query "[?powerState=='VM running'].id" -o tsv)```

</details>

<details>
    <summary>Tips for searching with Azure CLI</summary>
    
[Read this over and over](https://github.com/Azure/azure-cli/blob/dev/doc/use_cli_effectively.md#argument-parsing-issue-in-powershell)

</details>

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

<details>
    <summary>"--output JSON" honors column names, others do not</summary>
    
`--output table` will capitalize your column names    

```powershell
az network vnet list --subscription $subscription --query `
    "[*].{resourceGroup:resourceGroup, vnet:name, location:location, cidr_Range:addressSpace.addressPrefixes[0], DDOS_Enabled:enableDdosProtection, DNS1:dhcpOptions.dnsServers[0], DNS2:dhcpOptions.dnsServers[1], DNS3:dhcpOptions.dnsServers[2]}" `
    -o table
```    
</details>
