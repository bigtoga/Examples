$location = "eastus"
$rg1 = Get-AzResourceGroup -Name 'az1010301b-RG' -Location $location
$rg2 = Get-AzResourceGroup -Name 'az1010302b-RG' -Location $location

$vnet_rg1 = Get-AzVirtualNetwork -Name "az1010301b-vnet1" -ResourceGroupName $rg1 
$vnet_rg2 = Get-AzVirtualNetwork -Name "az1010302b-vnet1" -ResourceGroupName $rg2 

# From vnet_rg1 side: 
$peering_name_rg1 = "az1010301b-vnet1-to-az1010302b-vnet2"

Add-AzVirtualNetworkPeering `
  -Name $peering_name_rg1 `
  -VirtualNetwork $vnet_rg1 `
  -RemoteVirtualNetworkId $vnet_rg2.Id
  
# PeeringState is now "Initiated" and will stay that way until you pair from the other side
Get-AzVirtualNetworkPeering -Name $peering_name_rg1 -VirtualNetwork $vnet_rg1  -ResourceGroupName $rg1

# Powershell Documentation: https://docs.microsoft.com/en-us/powershell/module/az.network/?view=azps-3.4.0#network_watcher

# List all network Watchers regardless of location, rg, or status
# Get-AzNetworkWatcher -Name NetworkWatcher*

# Not needed - Network Watcher is automatically enabled for a region when a vnet is created
# New-AzNetworkWatcher -Name NetworkWatcher_eastus -ResourceGroup NetworkWatcherRG -Location $location
# az network watcher configure --resource-group NetworkWatcherRG --locations westcentralus --enabled

# To remove a Network Watcher:
# Remove-AzNetworkWatcher -Name NetworkWatcher_westcentralus -ResourceGroup NetworkWatcherRG
