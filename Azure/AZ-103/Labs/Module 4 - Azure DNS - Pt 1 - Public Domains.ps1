####################################################################
#
# Part 1: Public Domains
# 
####################################################################
# If RDP to VM in Azure, get public ip:
Invoke-RestMethod http://ipinfo.io/json | Select-Object -ExpandProperty IP

# If you want to retrieve the public IP using powershell of a specific VM:
az vm nic list --vm-name myVM --resource-group az1000401b-RG

$rg = Get-AzResourceGroup -Name az1000401b-RG

New-AzPublicIpAddress -ResourceGroupName $rg.ResourceGroupName -Sku Basic -AllocationMethod Static -Name az1000401b-pip -Location $rg.Location

# Go create the DNS entries

nslookup mylabvmpip.scottwhigham.com ns1-02.azure-dns.com
####################################################################
