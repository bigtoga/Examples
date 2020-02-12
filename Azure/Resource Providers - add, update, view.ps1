# List all resource providers
Get-AzResourceProvider -ListAvailable | Select-Object ProviderNamespace, RegistrationState

# List Microsoft resources that are not yet registered for your subscription:
Get-AzResourceProvider -ListAvailable | Select-Object ProviderNamespace, RegistrationState `
  | Where {$_.RegistrationState -eq "NotRegistered" -and $_.ProviderNamespace -like "Microsoft.*"} `
  | Sort -Property ProviderNamespace

# Get a specific resource provider
Get-AzResourceProvider -ProviderNamespace Microsoft.Batch

# Want to add something to your subscription? 
Register-AzResourceProvider -ProviderNamespace Microsoft.Batch

# 
(Get-AzResourceProvider -ProviderNamespace Microsoft.Batch).ResourceTypes.ResourceTypeName

# You can't unregister a resource provider when you still have resource types from that resource provider in your subscription.

