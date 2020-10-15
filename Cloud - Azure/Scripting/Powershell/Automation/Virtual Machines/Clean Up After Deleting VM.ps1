$rg = "sqltest"

# Delete the unused NICs
Get-AzNetworkInterface -ResourceGroupName $rg | Where {$_.VirtualMachine -eq $null} | Remove-AzNetworkInterface -Force 

# Delete the unattached disks
Get-AzDisk -ResourceGroupName $rg | Where {$_.DiskState -eq "Unattached"} | Select ResourceGroupName, Name, OsType, DiskSizeGB, TimeCreated | Format-Table -AutoSize
