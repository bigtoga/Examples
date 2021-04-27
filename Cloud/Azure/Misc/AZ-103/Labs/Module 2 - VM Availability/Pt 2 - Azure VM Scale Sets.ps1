#### Rememer to use Shift + Insert to paste into Cloud Shell

$rg = Get-AzResourceGroup -Name az1000301-RG
Test-AzDnsAvailability -DomainNameLabel MyLabel1 -Location $rg.Location
