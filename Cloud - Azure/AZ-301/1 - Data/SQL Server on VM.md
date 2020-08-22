# SQL VM performance 

https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices
- Disks
  - Disk type
    - Premium SSDs generally
    - Ultra Disks if you need 1ms storage latency
  - Disk caching
    - None for logs
    - ReadOnly for data
  - How many disks?
    - 2 - one each for logs, data
  - Clustering
    - Premium File Shares but note that these will be slower/worse performance thatn Premium SSDs
    - Can use Storage Spaces Direct S2D for highest performance 
  - tempdb 
    - on local premium SSD for best performance
    - 8 files
    
# Clustering and High Availability

https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/business-continuity-high-availability-disaster-recovery-hadr-overview#azure-only-high-availability-solutions

### Failover clustering

FCI - 5 options:
- Azure Shared Disks for Win2019
- S2D for Win2016+
- Premium File Share for 2012+
- 3rd Party
- ExpressRoute w iSCSI target

### DR 

3 Options:
- Availability Groups
  - Within a region, all replicas should be within the same cloud service and the same virtual network
  - [How to configure Always On across different regions](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-manually-configure-multiple-regions)
- Database Mirroring
- Backup & restore w storage blobs

![x](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/media/business-continuity-high-availability-disaster-recovery-hadr-overview/azure-only-dr-alwayson.png)

  
# FAQs
  
https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/frequently-asked-questions-faq

**Can I use a named instance of SQL Server with the IaaS extension?**
- Yes, if the named instance is the only instance on the SQL Server, and if the original default instance was uninstalled properly. If there is no default instance and there are multiple named instances on a single SQL Server VM, the SQL Server IaaS agent extension will fail to install.

**Updates and service packs?**
- Automated Patching installs any updates that are marked important, including SQL Server updates in that category.
