Build using Azure Files

Azure requires a little bit different connection strings - 
* On-prem: 
* Azure: Azure load balancer is required to access the clustered IPs if you are using Always On availability groups

# Resizing a node - STORAGE
1. Go to storage account -> clustered storage -> file shares
2. Go to Settings -> Properties -> **Change size and performance**
3. Resizing scales up/down IOPs also

# Resizing a VM node
1. SQL clusters have local volumes for tempdb
Azure - resizing a disk requires taking consuming services offline, then it performs the expansion.
