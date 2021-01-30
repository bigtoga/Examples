# Azure SQL Database for SQL Server

<details>
  <summary>Alerting</summary>
  
# Alerting

**Azure SQL Server with 5 Azure SQL databases - can you get alert for overall CPU consumption?** - Yes, monitor the resource group
- https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-overview


</details>

<details>
  <summary>Backup & Restore</summary>
  
# Backup & Restore

**Can you backup with Azure Backup?** - yes

**Can Azure Backup restore a database backup to another server?** - yes

</details>

<details>
  <summary>Defaults</summary>
  
# Defaults

**FORCE_PLAN?** - ON

**CREATE_INDEX** - OFF

**DROP_INDEX** - OFF

  </summary>
</details>

<details>
  <summary>Disaster Recovery and High Availability</summary>
  
# Disaster Recovery and High Availability

### Scenario: Goal 1: Want at least 2 readable copies of `Sales` database. Goal 2: Ensure that `Sales` remains available if a datacenter fails. How?

**Use Business Critical tier with Availability Zone**
- Premium or Business Critical tiers both leverage the **Premium availability model**
- "Premium availability" integrates compute resources (sqlservr.exe process) and storage (locally attached SSD) on a single node
- High availability is achieved by replicating both compute and storage to additional nodes creating a three to four-node cluster
- By default, the cluster of nodes for the premium availability model is created in the same datacenter
- Azure SQL Database can place different replicas of the Business Critical database to different availability zones in the same region
- To eliminate a single point of failure, the control ring is also duplicated across multiple zones as three gateway rings (GW)
- Reference: https://docs.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla

**Want auto failover without data loss if data center fails - how?**
- Azure SQL Database Premium with Zone Redundancy

  </summary>
</details>

<details>
  <summary>Encryption</summary>
  
# Encryption

**How to set correct Azure Key Vault policy for column encryption and Always Encrypted?**
- `Set-AzKeyVaultAccessPolicy ... -PermissionsToKeys create,get,wrapKey,unwrapKey,sign,verify,list`
- https://docs.microsoft.com/en-us/azure/azure-sql/database/always-encrypted-azure-key-vault-configure?tabs=azure-powershell
- https://www.testpreptraining.com/tutorial/configuring-always-encrypted-by-using-azure-key-vault/

  </summary>
</details>

<details>
  <summary>Logging</summary>
  
# Logging 

### Log retention - Storage Accounts

**Default for SQL Insights for storage account?**

**What if you put a specific value in for SQL Insights retention?** - this will override the default

### Log retention - Log Analytics Workspace retention

**Configured as part of the workspace or as SQL server config?** - LAW

  </summary>
</details>


<details>
  <summary>Migration Related</summary>
  
# Migration Related

**SQL on local VM - how to assess compatibility with Azure SQL Database?** - Azure Database Migration **Assistant**

  </summary>
</details>

<details>
  <summary>Performance Monitoring, Configurations, and Troubleshooting</summary>
  
# Performance Monitoring, Configurations, and Troubleshooting

**Long running query - how to view execution plan?** - Live Query Statistics

**What DMV to see resource utilization?**
- `sys.resource_stats` returns CPU usage and storage data for an Azure SQL Database. It has database_name and start_time columns.
- https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-resource-stats-azure-sql-database


  </summary>
</details> 



<details>
  <summary>Pricing & Cost Management</summary>
  
# Pricing & Cost Management

**Need 50,000 IOPs - what tier?**
- Business Critical or Hyperscale

### Serverless

**When to use?** - unpredictable usage pattern

**Can you pause databases due to inactivity?**
- Yes, Azure has an inactivity "Pause" option **for serverless**
- When the next user hits the database, it will be availabile within one minute if it is in a paused state
- https://docs.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview

  </summary>
</details> 
