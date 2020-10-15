Get-AzDisk -ResourceGroupName myrg | Where {$_.DiskState -eq "Unattached"} | Select ResourceGroupName, Name, OsType, DiskSizeGB, TimeCreated | Format-Table -AutoSize
