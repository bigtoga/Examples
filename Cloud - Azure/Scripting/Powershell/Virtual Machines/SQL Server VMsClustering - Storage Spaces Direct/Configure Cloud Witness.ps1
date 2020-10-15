# 1. Create storage account using Standard (not Premium) performance
# Error if you try to use Premium: "Set-ClusterQuorum : An error occurred while validating access to Azure from cluster node 'clus1.mydomain.com'. Verify the Azure storage account name, storage account type, storage account key, and network connectivity over HTTPS."
Set-ClusterQuorum -CloudWitness -AccountName "sqlclust1" -AccessKey "+Pl81Q4tJuarA3vgdPqOXS5IpkBDpG3Bi+adWCiNwCOqkehzGdcqCPZykM888UQt8HFO3mRTSZ7UcJRj7uUk3A=="

