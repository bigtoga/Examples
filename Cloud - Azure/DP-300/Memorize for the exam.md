

<details><summary>Indexing</summary>

# Indexing

From [the documentation], Microsoft classes tables in 2 ways:
    - rowstore tables and indexes
    - columnstore tables and indexes
    - "*SQL Server 2019 (15.x) and Azure SQL Database support row and page compression for rowstore tables and indexes, and supports columnstore and columnstore archival compression for columnstore tables and indexes.*"

## Microsoft Guidance

### Columnstore Guidance

Columnstore - [MSFT Guidance for Indexes](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-design-guidance)

**Should I use rowstore or columnstore for XYZ table?**
- [Answers from Microsoft](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-design-guidance)
- Does the table contain `varchar(max)`, `nvarchar(max)`, or `varbinary(max)`? - Use rowstore or design a 1:1 lookup rowstore table for strings w a columnstore table for numerics
- Does this data have > 10% of writes are `UPDATE` and `DELETE` statements? - Use rowstore
- Is this a long-term/permanent table? 
    - Yes 
        - Use columnstore
    - No 
        - Use rowstore
- Does the table need partitioning? 
    - Yes
        - Will there be > 1,000,000 rows per partition? 
            - Yes - use columnstore
            - No - use rowstore
    - No
        - Use rowstore

**Step 1: Clustered columnstore index on all OLAP/data warehouse tables**
- Star schema tables
- Snowflake tables
- Fact tables
- Dimension tables

**Step 2: Non-clustered columnstore indexes for all keys (PK, FK for lookups)**
- Enforce PKs with NCI
- Enable fast lookups w NCI on FKs

| Use case  | Recommendation  | Compression ratio  | Notes  	|
|---	|---	|---	|---	|
| Star and Snowflake tables (fact, dimension) 	| Clustered columnstore index  	| 10x  	|   	|
| Star and Snowflake tables (fact, dimension) 	| Non-clustered columnstore index on PKs 	| 10x  	|   	|
| Star and Snowflake tables (fact, dimension) 	| Non-clustered columnstore index on FKs 	| 10x  	|   	|
| HTAP and OLTP-like tables	| Drop rowstore NCI indexes and replace with columnstore NCI	| -10%  	| Swapping NCI rowstore to NCI columnstore is actually going to [take up ~10% more space](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-design-guidance)  	|
| IoT insert tables  	| Clustered columnstore index  	| 10x  	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|

- Fact tables = columnstore table

</details>

<details><summary>Compression</summary>

# Compression

Three options:
- Rowstore tables and indexes = row and page compression are options
- Columnstore tables and indexes = columnstore compression and columnstore archival compression
- TSQL `COMPRESS` function = GZIP compression
    - Inputs: strings, varbinary
    - Compression: GZIP
    - Compatibility: Rowstore and columnstore
    - Use case: archival data
    - https://docs.microsoft.com/en-us/sql/t-sql/functions/compress-transact-sql?view=sql-server-ver15

Rowstore table profiles:
- A whole table that is stored as a heap
- A whole table that is stored as a clustered index
- A whole nonclustered index
- A whole indexed view (materialized index)
- For partitioned tables and indexes, you can configure the compression option for each partition, and the various partitions of an object do not have to have the same compression setting

Columnstore table profiles 
- A whole table that is stored with columnstore compression 
- A whole table that is stored as a clustered columnstore index with columnstore compression 
- A whole nonclustered columnstore index
- A whole table that is stored with columnstore archival compression 
- A whole table that is stored as a clustered columnstore index with columnstore archival compression 
- A whole nonclustered columnstore archival index
- For partitioned columnstore tables and columnstore indexes, you can configure the archival compression option for each partition, and the various partitions do not have to have the same archival compression setting

**Compression is always enabled for columnstore tables and can't be turned off** 

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
