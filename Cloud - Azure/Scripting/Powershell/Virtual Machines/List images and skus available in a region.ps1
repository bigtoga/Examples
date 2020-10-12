$location = "eastus"
    
Get-AzVMImagePublisher -Location $location | Select PublisherName
$publisherName = 'MicrosoftWindowsServer'

Get-AzVMImageOffer -Location $location -PublisherName $publisherName | Select Offer

$offerName = 'WindowsServer'

Get-AzVMImageSku -Location $location -PublisherName $publisherName -Offer $offerName | Select Skus | Where {$_.Skus -like "2019*"}

$skuName = '2019-Datacenter-gensecond'

#########################################################################
# Compute size

$all_skus = Get-AzComputeResourceSku | Where {$_.Locations -icontains $location}
$all_skus | Where {$_.ResourceType -eq "disks"}

Get-AzVMSize -Location $location | Where {$_.Name -like "Standard*"}
