<details>
  <summary>Azure SQL Database and Managed Instance</summary>

# Azure SQL Database and Managed Instance

## Terms

### Auto-Failover Groups

- Azure SQL Database and Managed Instance
- Group databases into a failover group
- Built leveraging same Always On tech (i.e. streams the transaction log from primary to secondaries)
- Secondaries are readable
- Only support one secondary server/instance 
- Secondary must be in a different region

[Microsoft docs](https://docs.microsoft.com/en-us/azure/azure-sql/database/auto-failover-group-overview?tabs=azure-powershell)

</details>


<details>
  <summary>Azure SQL Database only</summary>

# Azure SQL Database only

## Terms

### Active Geo-Replication ### 

[Microsoft docs](https://docs.microsoft.com/en-us/azure/azure-sql/database/active-geo-replication-overview)

>> Active geo-replication allows you to create readable secondary databases of individual databases on a server in the same or different data center (region)

- Only for Azure SQL Database; not for Managed Instance
- Up to four secondaries possible
- Those secondaries can be "same region", "different regions", or whatever
- Secondaries can be used for read-only queries

#### How Failover Works with Active Geo-Replication ####

- Application or a user can initiate a manual failover
- After failover, the new primary has a different connection endpoint
- When failover is activated to one of the secondary databases, all other secondaries are automatically linked to the new primary

#### How it works behind the scenes #### 

Built on top of Always On and works in a similar way by streaming the transaction log from primary to secondaries. This is not the same as transactional replication which only replicates `INSERT / UPDATE / DELETE`
- Asynchronous commit on the readable secondaries
- Secondaries use `snapshot isolation`
- This scenario means that there might be a lag at the secondaries but there will never be a partial commit shown 
- If you need to guarantee that a change has been synched before a failover, you can do **forced synchronization** using [sp_wait_for_database_copy_sync](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/active-geo-replication-sp-wait-for-database-copy-sync?view=sql-server-ver15)
- You can monitor sync progress using [sys.dm_geo_replication_link_status](https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-geo-replication-link-status-azure-sql-database?view=azuresqldb-current)

#### Misc ####

- If there is a network failure between two regions, Azure will retry every 10 seconds

![x](https://i.imgur.com/HqCRF4s.png)

## Scenarios

**Scenario: Want 2 readable copies of DB + survive data center failure. How?**
1. General Purpose tier
2. Select "Yes" for "Would you like to make this database zone redundant?"
3. Enable `active geo replication` (https://docs.microsoft.com/en-us/azure/azure-sql/database/active-geo-replication-overview)

![x](https://i.imgur.com/usZCZ4h.png)

</details>

<details>
  <summary>Managed Instance only</summary>

# Managed Instance only

## Terms

</details>
