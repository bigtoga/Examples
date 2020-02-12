# RDP to az1000402b-vm2 and run:
# This will fail from cloud shell b/c that's public cloud
nslookup az1000402b-vm1.adatum.corp

# Create www entry
New-AzPrivateDnsRecordSet -ResourceGroupName $rg2.ResourceGroupName -Name www -RecordType A `
  -ZoneName adatum.corp -Ttl 3600 -PrivateDnsRecords (New-AzPrivateDnsRecordConfig -IPv4Address "10.104.0.4")

# Verify it
nslookup www.adatum.corp
