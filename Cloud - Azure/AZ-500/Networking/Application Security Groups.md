ASGs allow "Network security micro segmentation" as per https://azure.microsoft.com/en-ca/blog/applicationsecuritygroups/

https://docs.microsoft.com/en-us/azure/virtual-network/application-security-groups

https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview

# Scope of ASGs

ASGs are scoped to a resource group
- Cannot include "things" that are not in the same resource group
- Can be applied to all subnets and vnets in the rg

Powershell resources
- [Add a NIC to an ASG](https://docs.microsoft.com/en-us/powershell/module/az.network/set-aznetworkinterfaceipconfig?view=azps-4.7.0)
- [What ASGs are available?](https://docs.microsoft.com/en-us/powershell/module/az.network/get-azapplicationsecuritygroup?view=azps-4.7.0)

```powershell
New-AzResourceGroup -Name ASG -Location canadacentral
New-AzApplicationSecurityGroup -ResourceGroupName ASG -Name AppServers -Location canadacentral
New-AzApplicationSecurityGroup -ResourceGroupName ASG -Name DbServers -Location canadacentral

$appAsg = Get-AzApplicationSecurityGroup -ResourceGroupName ASG -Name AppServers
$vmNic = Get-AzNetworkInterface -Name vm-nic01 -ResourceGroupName resourceGroup01
$vmNic.IpConfigurations[0].ApplicationSecurityGroups = $appAsg
$vmNic | Set-AzNetworkInterface
```

```powershell
$vnet = Get-AzVirtualNetwork -Name myvnet -ResourceGroupName myrg
$subnet = Get-AzVirtualNetworkSubnetConfig -Name mysubnet -VirtualNetwork $vnet
$asg = Get-ApplicationSecurityGroup -Name myasg -ResourceGroupName myrg

$nic = Get-AzNetworkInterface -Name nic1 -ResourceGroupName myrg

$nic | Set-AzNetworkInterfaceIpConfig -Name ipconfig1 -PrivateIpAddress 10.0.0.11 -Subnet $subnet -ApplicationSecurityGroup $asg
    -Primary

$nic | Set-AzNetworkInterface
```

![x](https://azurecomcdn.azureedge.net/mediahandler/acomblog/media/Default/blog/Intro.PNG)
