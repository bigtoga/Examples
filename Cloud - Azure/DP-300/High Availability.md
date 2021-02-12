<details>
  <summary>Azure SQL Database and Managed Instance</summary>

# Azure SQL Database and Managed Instance

- [High availability documentation](https://docs.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla#basic-standard-and-general-purpose-service-tier-locally-redundant-availability)

## Known issues to design around

January 2021: 
- General Purpose with zone redundant enabled
      - > 80 vCores is a problem
      - Databases > 1TB are a problem

## SLAs, RTOs, and RPOs

In November, 2020, Microsoft moved the Managed Instance SLAs into a separate SLA
- [SLAs for Azure SQL Database](https://azure.microsoft.com/en-us/support/legal/sla/sql-database/v1_5/)
- [SLAs for Azure SQL Database Managed Instance](https://azure.microsoft.com/en-us/support/legal/sla/azure-sql-sql-managed-instance/v1_0/)

### Azure SQL Database SLA, RTO, RPO

As of January, 2021, the SLAs and RPO/RTO times are:
- Uptime: SLA of 99.995% - Business Critical configured also to be zone redundant
- Uptime: SLA of 99.99% - Business Critical but not zone redundant
- Uptime: SLA of 99.95% - Hyperscale with one replica
- Uptime: SLA of 99.90% - Hyperscale with zero replicas

- RPO: 5 seconds - Business Critical with geo-replication
- RPO: 30 seconds - Business Critical without geo-replication
- RTO: 30 seconds - Business Critical with Geo-replication

### Azure SQL Database Managed Instance SLA, RTO, RPO
- As of January, 2021, the SLAs and RPO/RTO times are:
      - Uptime: SLA of 99.99% - Business Critical and General Purpose
      - RPO: None
      - RTO: None
   
## How failover and unplanned downtime is handled 

From [the docs](https://docs.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla#basic-standard-and-general-purpose-service-tier-locally-redundant-availability): 
- **Failures should be so small that your app / you will not likely notice** - "When the underlying database in Azure SQL Database is patched or fails over, the downtime is not noticeable if you employ retry logic in your app. SQL Database and SQL Managed Instance can quickly recover even in the most critical circumstances ensuring that your data is always available."
- **Committed data will never be lost** - "The high availability solution is designed to ensure that committed data is never lost due to failures, that maintenance operations do not affect your workload, and that the database will not be a single point of failure in your software architecture. There are no maintenance windows or downtimes that should require you to stop the workload while the database is upgraded or maintained."

## The two Azure SQL Architecture Models

### "Standard availability" model

- Architecture Principal: separation of compute and storage increases reliability and availability
- Best for: budget-oriented business applications that can tolerate some performance degradation during maintenance activities
- Used by: Basic, Standard, and General Purpose pricing tiers

The standard availability model includes two layers:
- A stateless compute layer that runs the `sqlservr.exe` process and contains only transient and cached data, such as TempDB, model databases on the attached SSD, and plan cache, buffer pool, and columnstore pool in memory. This stateless node is operated by Azure Service Fabric that initializes `sqlservr.exe`, controls health of the node, and performs failover to another node if necessary
- A stateful data layer with the database files (.mdf/.ldf) that are stored in Azure Blob storage. Azure blob storage has built-in data availability and redundancy feature. It guarantees that every record in the log file or page in the data file will be preserved even if `sqlservr.exe` process crashes

How upgrades and failover are handled : "Whenever the database engine or the operating system is upgraded, or a failure is detected, Azure Service Fabric will move the stateless `sqlservr.exe` process to another stateless compute node with sufficient free capacity. Data in Azure Blob storage is not affected by the move, and the data/log files are attached to the newly initialized sqlservr.exe process. This process guarantees 99.99% availability, but a heavy workload **may experience some performance degradation during the transition** since the new `sqlservr.exe` process starts with cold cache."

### "Premium availability" model

- Architecture Principal: a cluster of database engine processes with voting by quorum offers the highest possible protection
- Best for: mission critical applications with high IO performance, high transaction rate and guarantees minimal performance impact to your workload during maintenance activities.
- Used by: Business Critical pricing tier

Azure SQL Database and SQL Managed Instance both run on the latest stable version of the SQL Server database engine and Windows operating system, and most users would not notice that upgrades are performed continuously

## Pricing tiers (Basic, Standard, General Purpose, Business Critical)

- Basic, Standard, and General Purpose use the Standard Availability model
- Business Critical uses the Premium Availability model

### Basic and Standard

Basic and Standard pricing tiers deploy their "behind the scenes VMs" to the same Azure Region
- Data and files are stored in **LRS** (locally redundant storage)
- Backups are stored in RA-GRS storage

![x](https://i.imgur.com/h2OnPem.png)

When a failure or upgrade occurs, Azure Service Fabric moves the stateless "head of the application" (a.k.a. `sqlservr.exe`) to another stateless compute node that has free capacity. The data stored in Azure Blob Storage is not affected. This architecture achieves a 99.99% SLA. There will likely be performance loss during startup of the new SQL node due to a cold cache however.

### General Purpose

General Purpose still uses the Standard Availability model but introduces zone redundant nodes for the backend cluster. This offers additional protections against catastrophic failures such as datacenter loss.
- Data and files are stored in **ZRS PFS** (zone redundant storage using an Azure Premium File Share)
- With ZRS, data and log files are copied synchronously and in real-time across 3 physically separated Azure availability zones
- Backups are stored in RA-GRS storage

![x](https://i.imgur.com/svF0RKV.png)

### Auto-Failover Groups

- Azure SQL Database and Managed Instance
- Group databases into a failover group
- Built leveraging same Always On tech (i.e. streams the transaction log from primary to secondaries)
- Secondaries are readable
- Only support one secondary server/instance 
- Secondary must be in a different region
- Uses a **Read/Write Failover Policy** - if "Automatic", then failover is auto-handled
- Each database can have a **Read/Write grace period in hours**
- You can set the failover grace period per database failover group

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
