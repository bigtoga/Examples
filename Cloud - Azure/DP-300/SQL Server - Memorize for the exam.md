<details><summary></summary>

# 

## 
</details>

<details><summary>Auditing</summary>

# Auditing

### Scope: Azure SQL Database or Synapse

**How to audit whenever a user selects rows/columns that have sensitive data?**
- Use Azure SQL Database or Synapse
- Create a Storage account
- Enable SQL Auditing and configure it to write to the storage account
- Turn on Advanced Data Security
- Apply sensitivity labels named "Highly Confidential" to the columns
- Can do either **Server level** (a SQL Server audit) or **Database level**

**How to enable automatic tuning in Azure SQL Database?**
- `ALTER DATABASE DB1 SET AUTOMATIC_TUNING = AUTO`
- `ALTER DATABASE DB1 SET AUTOMATIC_TUNING (FORCE_LAST_GOOD_PLAN = ON)`

According to https://docs.microsoft.com/en-us/azure/azure-sql/database/automatic-tuning-enable
> "As of March, 2020 new Azure defaults for automatic tuning are as follows:
>> FORCE_LAST_GOOD_PLAN = enabled, CREATE_INDEX = disabled, and DROP_INDEX = disabled.
>> Existing servers with no automatic tuning preferences configured are automatically configured to INHERIT the Azure defaults. This applies to all customers currently having server settings for automatic tuning in an undefined state.
>> New servers created will automatically be configured to INHERIT the Azure defaults (unlike earlier when automatic tuning configuration was in an undefined state upon new server creation).

### Scope: Azure VM running SQL Server

**How to audit whenever a user selects rows/columns that have sensitive data?**
- Create a SQL Server Audit
- Create a database audit specification

Example from [Microsoft documentation](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/create-a-server-audit-and-database-audit-specification?view=sql-server-ver15
)
```sql

USE master 
GO

-- Create the server audit.
CREATE SERVER AUDIT Payrole_Security_Audit
TO FILE ( FILEPATH =
'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA' ) 
GO

-- Enable the server audit.
ALTER SERVER AUDIT Payrole_Security_Audit WITH (STATE = ON) 

USE AdventureWorks2012 ;
GO
-- Create the database audit specification.
CREATE DATABASE AUDIT SPECIFICATION Audit_Pay_Tables
FOR SERVER AUDIT Payrole_Security_Audit
ADD (SELECT , INSERT
ON HumanResources.EmployeePayHistory BY dbo )
WITH (STATE = ON) 
GO
```
</details>

<details><summary>Cost Optimization</summary>

# Cost Optimization

## vCores

**Scenario: Have 20 Azure SQL Databases using vCore pricing and want to know if converting to Elastic Pool will save money. What should you monitor to determine whether pricing is better/worse?**
1. MAX(<Total number of DBs X average vCore utilization per DB>, <Number of concurrently peaking DBs X Peak vCore utilization per DB>)
2. Estimate the storage space needed for the pool by adding the **number of bytes needed for all the databases in the pool**. Then determine the eDTU pool size that provides this amount of storage
- Total size of all databases
- Number of concurrently peaking databases * peak CPU utilization per database
- Total # of DBs * Avg(CPU utilization per DB)
- https://docs.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview#how-do-i-choose-the-correct-pool-size

For vCore-based purchasing model: MAX(<Total number of DBs X average vCore utilization per DB>, <Number of concurrently peaking DBs X Peak vCore utilization per DB)
</details>
	
<details><summary>Dynamic Data Masking</summary>

# Dynamic Data Masking

**Scenario: `Customer_Phone` column and you want to mask (a) first 6 numbers, and (b) hypens should be preserved and displayed. How?**
- Exposed Prefix: 0
- Padding String: "XXX-XXX"
- Exposed Suffix: 5 

```sql

CREATE TABLE Customers(
	ID INT PRIMARY KEY IDENTITY(1,1) NOT NULL
	, Phone NVARCHAR(100)
)
GO
INSERT Customers
VALUES
	('555-555-0173')
	, ('555-505-3124')
	, ('555-689-4321')
	
CREATE USER TestUser WITHOUT LOGIN;

GRANT SELECT ON Customers TO TestUser;

-- Test ""
EXECUTE AS USER = 'TestUser';
SELECT * FROM Customers;
REVERT;

---Now add masking
ALTER TABLE Customers
ALTER COLUMN Phone nvarchar(100) MASKED WITH (FUNCTION= 'PARTIAL(0,"xxx-xxx",5)');

-- Test "after masking"
EXECUTE AS USER = 'TestUser';
SELECT * FROM Customers;
REVERT;
```

</details>

<details><summary>Migrations</summary>

# Migrations

## DMS - Azure Database Migration Service

**Scenario: On-prem SQL DB wants to migrate to Azure SQL DB - how?**
- DMS
- Take full and log backups
- Use `WITH CHECKSUM`

</details>

<details><summary>Encryption</summary>

# Encryption

**Randomized or deterministic encryption - which to use?**
- Randomized encryption is more secure, but prevents searching, grouping, indexing, and joining on encrypted columns
- Randomized generates a random value/ciphertext each time even if the input is the same
- Deterministic allows point lookups, equality joins, grouping and indexing on encrypted columns
- Deterministic generates the same encrypted value for all rows if the input is the same

**Scenario: Want DBAs to not be able to view `Salary` column - how?**
1. Create a column master key
2. Create a column encryption key
3. Encrypt the `Salary` column using "randomized"

</details>



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

**Want to see parameters of the last query execution - how?**
- SQL 2019 - on by default
- Enable `LAST_QUERY_PLAN_STATS` and enable `LIGHTWEIGHT_QUERY_PROFILING` for the database
- `ALTER DATABASE SCOPED CONFIGURATION SET LIGHTWEIGHT_QUERY_PROFILING = ON`
- Query `sys.dm_exec_query_plan_stats`

</details>


<details><summary>SSIS</summary>

# SSIS

**Scenario: You lose `master` on an Azure SQL VM - how to restore SSISDB?**
- Restore master
- Attach SSISDB
- Turn on TRUSTWORTHY and CLR
- Open or restore the master key for the SSISDB database
- Encrypt a copy of the master key using the service master key
- Update the cleanup user

Open the master key if you know the password, then encrypt it using the service master key:
```sql
OPEN MASTER KEY DECRYPTION BY PASSWORD = 'Original password used to encrypt the master key'

ALTER MASTER KEY ADD ENCRYPTION BY SERVICE MASTER KEY
```

Restore the master key from backup, then encrypt it using the service master key:
```sql
RESTORE MASTER KEY FROM FILE = 'C:\Backups\SQL_masterkey' 
	DECRYPTION BY PASSWORD = 'Original password used to encrypt the master key during SSISDB backup'
	ENCRYPTION BY PASSWORD = 'Change to a new password' 
	FORCE
```

If you get the warning "The current master key cannot be decrypted. The error was ignored because the FORCE option was specified", you can **ignore it**

Update the cleanup user if needed:
```sql
USE SSISDB
GO

EXEC sp_change_users_login 'update_one', '##MS_SSISServerCleanupJobUser##', '##MS_SSISServerCleanupJobLogin##'
```
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

<details><summary>VMs and SQL Server</summary>

# VMs and SQL Server

**Scenario: Have a 1.2TB database that needs 10,000 IOPs. How?**
- Provision 2 1TB P30 5,000 IOPs disks
- Create a storage pool
- Create a virtual disk using striping
- Create a volume
- https://hanu.com/hanu-how-to-striping-of-disks-for-azure-sql-server/

**How to enable automatic tuning in on-prem SQL Server?**
- `ALTER DATABASE DB1 SET SET QUERY_STORE = ON (OPERATION_MODE = READ_WRITE)`
- `ALTER DATABASE DB1 SET AUTOMATIC_TUNING ( FORCE_LAST_GOOD_PLAN = ON );`

</details>
