# List all resource providers
Get-AzResourceProvider -ListAvailable | Select-Object ProviderNamespace, RegistrationState

# Want to add something to your subscription? 
# Register-AzResourceProvider -ProviderNamespace Microsoft.Batch


Get-AzComputeResourceSku | where {$_.Locations -icontains "eastus"} | Where-Object {($_.ResourceType -ilike "virtualMachines")}

# Can you run SQL Database in a given region or sku?
# https://docs.microsoft.com/en-us/powershell/module/az.sql/get-azsqlcapability?view=azps-3.4.0

# What are the defaults?
Get-AzSqlCapability -LocationName "eastus" -Defaults

# 
Get-AzSqlCapability -LocationName "eastus" -ServiceObjectiveName "S1"
