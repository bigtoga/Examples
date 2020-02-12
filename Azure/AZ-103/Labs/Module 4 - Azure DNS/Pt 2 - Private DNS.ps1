####################################################################
# Ctrl+S to save and Ctrl + Q to quit
# Part 2: Private Domains
# 
####################################################################
$rg1 = Get-AzResourceGroup -Name 'az1000401b-RG'

# Create a new resource group
$rg2 = New-AzResourceGroup -Name 'az1000402b-RG' -Location $rg1.Location

# Create two new vnets/subnets
# vnet1
$subnet1 = New-AzVirtualNetworkSubnetConfig -Name subnet1 -AddressPrefix '10.104.0.0/24'
$vnet1 = New-AzVirtualNetwork -ResourceGroupName $rg2.ResourceGroupName -Location $rg2.Location `
  -Name az1000402b-vnet1 -AddressPrefix 10.104.0.0/16 -Subnet $subnet1
$vnet1 = Get-AzVirtualNetwork -Name az1000402b-vnet1

# vnet2
$subnet2 = New-AzVirtualNetworkSubnetConfig -Name subnet1 -AddressPrefix '10.204.0.0/24'
$vnet2 = New-AzVirtualNetwork -ResourceGroupName $rg2.ResourceGroupName -Location $rg2.Location `
  -Name az1000402b-vnet2 -AddressPrefix 10.204.0.0/16 -Subnet $subnet2
$vnet2 = Get-AzVirtualNetwork -name az1000402b-vnet2

# Create a new private DNS zone
$zone = New-AzPrivateDnsZone -Name adatum.corp -ResourceGroupName $rg2.ResourceGroupName

$vnet1link = New-AzPrivateDnsVirtualNetworkLink -ZoneName $zone.Name -ResourceGroupName $rg2.ResourceGroupName `
  -Name "vnet1Link" -VirtualNetworkId $vnet1.id -EnableRegistration

$vnet2link = New-AzPrivateDnsVirtualNetworkLink -ZoneName $zone.Name -ResourceGroupName $rg2.ResourceGroupName `
  -Name "vnet2Link" -VirtualNetworkId $vnet2.id
  
Get-AzPrivateDnsZone -ResourceGroupName $rg2.ResourceGroupName
