https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/hadr-cluster-best-practices

# Networking 
1. Use a single NIC per cluster node and a single subnet for all nodes
2. Run cluster validation to verify all nodes can see each other

# Quorum
1. All servers in same data center? Use disk witness on Windows 2019, SQL 2019 with Azure shared disk
1. Servers distributed across multiple data centers/sites (2016+)? [Use Azure Blob Storage as a "cloud witness"](https://docs.microsoft.com/en-us/windows-server/failover-clustering/deploy-cloud-witness#CloudWitnessSetUp)
1. Can use older style file-based SMB folder share witness if needed

# Clustering
1. Use DNN clusters instead of older VNN clusters:
  - The end-to-end solution is more robust since you no longer have to maintain the load balancer resource
  - Eliminating the load balancer probes minimizes failover duration 
  - DNN simplifies provisioning and management of the failover cluster instance with SQL Server on Azure VMs
2. Use Windows 2019 with storage on Clustered Shared Volumes (CSVFS) in order to support MSDTC
