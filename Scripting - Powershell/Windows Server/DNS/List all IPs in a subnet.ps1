Clear-Host

##############################################
# When running locally on DC / DNS server

# Requires Run as Administrator permission
##############################################

# List all DNS zones for the DNS server
$Zone = Get-DnsServerZone -Name stg.isnforest.com 
$Zone | Format-Table

$Zone | Get-DnsServerResourceRecord | Where {$_.RecordType -eq "A" -and $_.RecordData -like "172.19.2.*"}

$Zone | Get-DnsServerResourceRecord -RRType 'A' | Where {$_.RecordData.ipv4address -like "172.19.2.*"}

# For-Each
$Zones = @(Get-DnsServerZone)
ForEach ($Zone in $Zones) {
	Write-Host "`n$($Zone.ZoneName)" -ForegroundColor "Green"
	$Zone | Get-DnsServerResourceRecord
}

# List only a specific zone's A records
Get-DnsServerResourceRecord -ZoneName local.app | Where-Object {$_.RecordType -eq "A"}

# List only a specific zone's A records that start with DEV
Get-DnsServerResourceRecord -ZoneName local.app | Where-Object {$_.RecordType -eq "A" -and $_.HostName -like "DEV*"}

# List only a specific zone's C names
Get-DnsServerResourceRecord -ZoneName local.app | Where-Object {$_.RecordType -eq "CName"}

# WMI local't any better though 
Get-WmiObject -Namespace Root\MicrosoftDNS -Query "SELECT * FROM MicrosoftDNS_AType WHERE ContainerName='local.app'" | Format-Table



##############################################
# When running remotely
##############################################
$DNSServer = "servernameOrIp"
$Zones = @(Get-DnsServerZone -ComputerName $DNSServer)
ForEach ($Zone in $Zones) {
	Write-Host "`n$($Zone.ZoneName)" -ForegroundColor "Green"
	$Zone | Get-DnsServerResourceRecord -ComputerName $DNSServer
}
