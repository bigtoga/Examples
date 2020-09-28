New-AzResourceGroup -Name AZ500LAB03 -Location 'EastUS'

New-AzStorageAccount -ResourceGroupName AZ500LAB03 -Name (Get-Random -Maximum 999999999999999) -Location  EastUS -SkuName Standard_LRS -Kind StorageV2 

