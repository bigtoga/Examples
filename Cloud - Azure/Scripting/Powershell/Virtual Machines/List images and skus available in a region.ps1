$location = "eastus"
    
Get-AzVMImagePublisher -Location $location | Select PublisherName
$publisherName = 'MicrosoftWindowsServer'

Get-AzVMImageOffer -Location $location -PublisherName $publisherName | Select Offer

$offerName = 'WindowsServer'

Get-AzVMImageSku -Location $location -PublisherName $publisherName -Offer $offerName | Select Skus | Where {$_.Skus -like "2019*"}

$skuName = '2019-Datacenter-gensecond'
