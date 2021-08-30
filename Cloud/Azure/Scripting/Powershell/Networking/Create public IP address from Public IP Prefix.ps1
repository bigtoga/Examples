$prefix = Get-AzPublicIpPrefix | Where {$_.Name -eq "mypipprefix"}	

$publicIp = New-AzPublicIpAddress -Name "mypip" -ResourceGroupName "rg1" -AllocationMethod Static -Location "eastus2" -PublicIpPrefix $prefix -Sku Standard
