New-AzResourceGroup -Name AZ500LAB03 -Location 'EastUS'

New-AzStorageAccount -ResourceGroupName AZ500LAB03 -Name (Get-Random -Maximum 999999999999999) -Location  EastUS -SkuName Standard_LRS -Kind StorageV2 

$storageaccountname = (Get-AzStorageAccount -ResourceGroupName AZ500LAB03).StorageAccountName

$lockName = (Get-AzResourceLock -ResourceGroupName AZ500LAB03 -ResourceName $storageAccountName -ResourceType Microsoft.Storage/storageAccounts).Name

Remove-AzResourceLock -LockName $lockName -ResourceName $storageAccountName  -ResourceGroupName AZ500LAB03 -ResourceType Microsoft.Storage/storageAccounts -Force


