$location = "eastus"
$rg1 = Get-AzResourceGroup -Name 'az1010301b-RG' -Location $location

# Powershell Documentation: https://docs.microsoft.com/en-us/powershell/module/az.network/?view=azps-3.4.0#network_watcher

# List all network Watchers regardless of location, rg, or status
# Get-AzNetworkWatcher -Name NetworkWatcher*

# Not needed - Network Watcher is automatically enabled for a region when a vnet is created
# New-AzNetworkWatcher -Name NetworkWatcher_eastus -ResourceGroup NetworkWatcherRG -Location $location
# az network watcher configure --resource-group NetworkWatcherRG --locations westcentralus --enabled

# To remove a Network Watcher:
# Remove-AzNetworkWatcher -Name NetworkWatcher_westcentralus -ResourceGroup NetworkWatcherRG
