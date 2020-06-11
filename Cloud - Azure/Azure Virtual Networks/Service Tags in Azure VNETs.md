Similar / related to service endpoints

https://docs.microsoft.com/en-us/azure/virtual-network/service-tags-overview

> A service tag represents a group of IP address prefixes from a given Azure service. Microsoft manages the address prefixes encompassed by the service tag and automatically updates the service tag as addresses change, minimizing the complexity of frequent updates to network security rules.

> **You can use service tags to define network access controls on network security groups or Azure Firewall** 
- Use service tags in place of specific IP addresses when you create security rules. By specifying the service tag name (for example, `ApiManagement`) in the appropriate source or destination field of a rule, you can allow or deny the traffic for the corresponding service.

# Use the Service Tag Discovery API to programmatically retrieve the current list of service tags
Bash using Azure CLI:
```shell
# List available
az network list-service-tags --location eastus2

# List those in use
az network list-usages --location eastus -o table
```
Powershell [documentation is very robust](https://docs.microsoft.com/en-us/powershell/module/az.network/Get-AzNetworkServiceTag?view=azps-2.8.0&viewFallbackFrom=azps-2.3.2)
```powershell
Get-AzNetworkServiceTag -Location eastus2

$serviceTags = Get-AzNetworkServiceTag -Location eastus2
$sql = $serviceTags.Values | Where-Object { $_.Name -eq "Sql" }
$sql

$sql.Properties.AddressPrefixes.Count
$sql.Properties.AddressPrefixes
```
