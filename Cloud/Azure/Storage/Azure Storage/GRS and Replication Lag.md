Scenario: Either enabled GRS for an existing LRS volume, or manual failover from GRS primary to secondary region

**Can I query how much more replication remains before everything is in sync?** - No. As of June, 2021, there is no way to view replication percentage

**What info can I see from Azure portal?** - Go to the storage account, to Geo Replication blade, and look. 
- If it has not finished replication, it will show something like `Failover cannot yet be initiated since initial synchronization to the secondary region is not yet complete`

**What SLA does MSFT have for geo replication?**
- [SLA for Azure Storage](https://www.azure.cn/en-us/support/sla/storage/)

>> “Geo Replication Lag” for GRS and RA-GRS Accounts is the time it takes for data stored in the Primary Region of the storage account to replicate to the Secondary Region of the storage account. Because GRS and RA-GRS Accounts are replicated asynchronously to the Secondary Region, data written to the Primary Region of the storage account will not be immediately available in the Secondary Region. You can query the Geo Replication Lag for a storage account, but 21Vianet **does not provide any guarantees as to the length of any Geo Replication Lag under this SLA.**

FYI - they mention that you can "query the Geo Replication Lag for a storage account" but I cannot find out how

Good resources:
- [Get Last Sync time in Powershell](https://alexandrebrisebois.wordpress.com/2016/02/21/get-last-sync-time-for-read-access-geo-redundant-azure-storage/)
