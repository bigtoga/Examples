Scenario: Either enabled GRS for an existing LRS volume, or manual failover from GRS primary to secondary region

**Can I query how much more replication remains before everything is in sync?** - No. As of June, 2021, there is no way to view replication percentage

**What info can I see from Azure portal?** - Go to the storage account, to Geo Replication blade, and look. 
- If it has not finished replication, it will show something like `Failover cannot yet be initiated since initial synchronization to the secondary region is not yet complete`

Good resources:
- [Get Last Sync time in Powershell](https://alexandrebrisebois.wordpress.com/2016/02/21/get-last-sync-time-for-read-access-geo-redundant-azure-storage/)
