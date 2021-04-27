# Easiest to do when you create the NIC:
# New-AzNetworkInterface -ResourceGroupName $resourceGroup -Location $location -Name $nicname -LoadBalancerBackendAddressPool $backendPoolName -Subnet $vnet.Subnets[0]

# But if you have an existing NIC...
$vm_name
$nic_name
$nic = Get-AzNetworkInterface -Name $nic_name -ResourceGroupName $name_rg

$nic.IpConfigurations[0].LoadBalancerBackendAddressPools=$lbal.BackendAddressPools[0]
Set-AzNetworkInterface -NetworkInterface $nic | Out-Null
