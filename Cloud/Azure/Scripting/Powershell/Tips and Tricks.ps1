# Create a storage account w a unique name
New-AzStorageAccount -ResourceGroupName AZ500LAB03 -Name (Get-Random -Maximum 999999999999999) -Location  EastUS -SkuName Standard_LRS -Kind StorageV2

# Set the default respurce group name to save time
Set-AzDefault -ResourceGroupName [sandbox resource group name]