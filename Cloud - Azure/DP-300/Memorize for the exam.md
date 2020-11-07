

<details><summary></summary>

# 

## 
</details>

<details><summary></summary>

# 

## 
</details>

<details><summary></summary>

# 

## 
</details>

<details><summary></summary>

# 

## 
</details>

<details><summary></summary>

# 

## 
</details>

<details><summary>Performance Monitoring & DMVs</summary>

# Performance Monitoring & DMVs

## Azure SQL Database

**What DMV to see resource utilization?**
- `sys.resource_stats` returns CPU usage and storage data for an Azure SQL Database. It has database_name and start_time columns.
- https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-resource-stats-azure-sql-database


</details>

<details><summary>Query Store</summary>

# Query Store

**How to prevent going to read only?**
- Decrease the Data Flush Interval
    - Storage size is checked when Query Store writes data to disk. This interval is set by the Data Flush Interval (Minutes) option. If Query Store has breached the maximum size limit between storage size checks, it transitions to read-only mode
    - Default is 900 seconds, which is 15 minutes


</details>

<details><summary>Tempdb</summary>

# Tempdb

**You change from 4 CPUs to 16 - how many tempdb files should you have?**
- I think answer is 8 but they said 64 
   - *As a general rule, if the number of logical processors is less than or equal to eight, use the same number of data files as logical processors*
   - *If the number of logical processors is greater than eight, use eight data files and then if contention continues, increase the number of data files by multiples of 4 until the contention is reduced to acceptable levels or make changes to the workload/code.*
   - https://docs.microsoft.com/en-us/sql/relational-databases/databases/tempdb-database



## 
</details>

<details><summary></summary>

# 

## 
</details>
