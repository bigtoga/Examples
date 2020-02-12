Get-AzComputeResourceSku | where {$_.Locations -icontains "eastus"} | Where-Object {($_.ResourceType -ilike "virtualMachines")}

# Can you run SQL Database in a given region or sku?
Get-AzSqlCapability -LocationName "eastus"
