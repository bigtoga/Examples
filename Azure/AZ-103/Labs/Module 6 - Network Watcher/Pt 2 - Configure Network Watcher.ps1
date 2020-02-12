$location = "eastus"
$rg1 = Get-AzResourceGroup -Name 'az1010301b-RG' -Location $location

# Powershell Documentation: https://docs.microsoft.com/en-us/powershell/module/az.network/?view=azps-3.4.0#network_watcher

# List all network Watchers regardless of location, rg, or status
Get-AzNetworkWatcher -Name NetworkWatcher*
