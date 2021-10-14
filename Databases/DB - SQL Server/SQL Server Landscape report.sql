SET NOCOUNT ON;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
GO

DROP TABLE IF EXISTS #Configurations, #Results;
GO

BEGIN -- Setup
	-- Makes coding easier later
	SELECT name, value = CAST(value AS INT)
	INTO #Configurations
	FROM sys.configurations

	CREATE TABLE #Results (
		ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY
		, Scope VARCHAR(25) NOT NULL
		, Category VARCHAR(25) NOT NULL
		, Item VARCHAR(128) NOT NULL
		, ShouldBe VARCHAR(128) NOT NULL
		, Actual VARCHAR(128) NOT NULL
		, IsCorrect BIT NOT NULL
		, Notes VARCHAR(MAX) NULL
	)
END
GO

BEGIN -- Landscape

	BEGIN -- CPU 

		-- https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-os-sys-info-transact-sql
		SELECT
			[Sockets]						= cpu_count / hyperthread_ratio
			, [Logical CPUs (Total)]		= cpu_count
			, [Logical CPUs per Socket]		= hyperthread_ratio
			, [Is VM?]						= CASE(virtual_machine_type) WHEN 0 THEN 'No' ELSE 'Yes' END
			, [Schedulers (Total)]			= scheduler_total_count
			, [Schedulers (User)]			= scheduler_count
		FROM sys.dm_os_sys_info
	END

	BEGIN -- Server Features, Edition, Levels
		SELECT SERVERPROPERTY('MachineName') AS [MachineName], 
			SERVERPROPERTY('ServerName') AS [ServerName],  
			SERVERPROPERTY('InstanceName') AS [Instance], 
			SERVERPROPERTY('IsClustered') AS [IsClustered], 
			SERVERPROPERTY('ComputerNamePhysicalNetBIOS') AS [ComputerNamePhysicalNetBIOS], 
			SERVERPROPERTY('Edition') AS [Edition], 
			SERVERPROPERTY('ProductLevel') AS [ProductLevel],				-- What servicing branch (RTM/SP/CU)
			SERVERPROPERTY('ProductUpdateLevel') AS [ProductUpdateLevel],	-- Within a servicing branch, what CU# is applied
			SERVERPROPERTY('ProductVersion') AS [ProductVersion],
			SERVERPROPERTY('ProductMajorVersion') AS [ProductMajorVersion], 
			SERVERPROPERTY('ProductMinorVersion') AS [ProductMinorVersion], 
			SERVERPROPERTY('ProductBuild') AS [ProductBuild], 
			SERVERPROPERTY('ProductBuildType') AS [ProductBuildType],			  -- Is this a GDR or OD hotfix (NULL if on a CU build)
			SERVERPROPERTY('ProductUpdateReference') AS [ProductUpdateReference], -- KB article number that is applicable for this build
			SERVERPROPERTY('ProcessID') AS [ProcessID],
			SERVERPROPERTY('Collation') AS [Collation], 
			SERVERPROPERTY('IsFullTextInstalled') AS [IsFullTextInstalled], 
			SERVERPROPERTY('IsIntegratedSecurityOnly') AS [IsIntegratedSecurityOnly],
			SERVERPROPERTY('FilestreamConfiguredLevel') AS [FilestreamConfiguredLevel],
			SERVERPROPERTY('IsHadrEnabled') AS [IsHadrEnabled], 
			SERVERPROPERTY('HadrManagerStatus') AS [HadrManagerStatus],
			SERVERPROPERTY('InstanceDefaultDataPath') AS [InstanceDefaultDataPath],
			SERVERPROPERTY('InstanceDefaultLogPath') AS [InstanceDefaultLogPath],
			SERVERPROPERTY('ErrorLogFileName') AS [ErrorLogFileName],
			SERVERPROPERTY('BuildClrVersion') AS [Build CLR Version],
			SERVERPROPERTY('IsXTPSupported') AS [IsXTPSupported],
			SERVERPROPERTY('IsPolybaseInstalled') AS [IsPolybaseInstalled],				
			SERVERPROPERTY('IsAdvancedAnalyticsInstalled') AS [IsRServicesInstalled],
			SERVERPROPERTY('IsTempdbMetadataMemoryOptimized') AS [IsTempdbMetadataMemoryOptimized]
	END
END
GO

BEGIN -- Desired state configuration (DSC)
	BEGIN -- Variables
		DECLARE @max_memory_percent DECIMAL(5,2) 
		SELECT @max_memory_percent = value / 1024 / (
				SELECT CAST(physical_memory_kb /1024 / 1024 AS DECIMAL(5,2)) FROM sys.dm_os_sys_info) 
		FROM #Configurations
		WHERE name = 'max server memory (MB)'
		
		DECLARE @min_memory INT 
		SELECT @min_memory = value FROM #Configurations WHERE name = 'min server memory (MB)'
	END

	BEGIN -- Data collector - Misc
		INSERT #Results (
			Scope
			, Category
			, Item 
			, ShouldBe
			, Actual 
			, IsCorrect 
			, Notes
		)
		SELECT
			Scope = 'Instance'
			, Category = 'Configuration' 
			, Item = 'Instant File Initialization'
			, ShouldBe = 'Enabled'
			, Actual = CASE instant_file_initialization_enabled WHEN 'Y' THEN 'Enabled' ELSE 'Not enabled' END
			, IsCorrect = CASE instant_file_initialization_enabled WHEN 'Y' THEN 1 ELSE 0 END
			, Notes = NULL 
		FROM sys.dm_server_services 
		WHERE filename LIKE '%sqlservr.exe%'

		UNION ALL 
		SELECT
			Scope = 'Instance'
			, Category = 'Configuration' 
			, Item = 'Priority Boost'
			, ShouldBe = 'Disabled'
			, Actual = CASE(os_priority_class) WHEN 32 THEN 'Disabled' ELSE 'Enabled' END
			, IsCorrect = CASE(os_priority_class) WHEN 32 THEN 1 ELSE 0 END
			, Notes = NULL 
		FROM sys.dm_os_sys_info

		SELECT 
			[Priority Boost]	= CASE(os_priority_class) WHEN 32 THEN 'Correct' ELSE 'InCorrect' END
			, [CPU Affinity]	= CASE(affinity_type_desc) WHEN 'Manual' THEN 'InCorrect' ELSE 'Correct' END
			, [tempdb data files] = CASE WHEN (
				SELECT COUNT(*) FROM sys.master_files WHERE database_id = DB_ID('tempdb') AND type_desc = 'ROWS'
				) = 12 THEN 'Correct' ELSE 'Incorrect' END
			, [tempdb log file] = CASE WHEN (
				SELECT COUNT(*) FROM sys.master_files WHERE database_id = DB_ID('tempdb') AND type_desc = 'LOG'
				) = 1 THEN 'Correct' ELSE 'Incorrect' END
			, [Min Memory MB Used By SQL] = IIF(@min_memory = 20000, 'Correct', 'Incorrect')
			, [Max Memory % Used By SQL] = IIF(@max_memory_percent BETWEEN 0.8 and 0.9, 'Correct', 'Incorrect')
			, [MaxDOP] = IIF(
					(SELECT CAST(value AS INT) FROM sys.configurations WHERE name = 'max degree of parallelism')
					= 8, 'Correct', 'Incorrect'
				)
			, [Cost Threshold] = IIF(
					(SELECT CAST(value AS INT) FROM sys.configurations WHERE name = 'cost threshold for parallelism')
					= 50, 'Correct', 'Incorrect'
				)
		FROM sys.dm_os_sys_info
	END
	
	BEGIN -- Data collector - Configuration
		SELECT 
			  [Ad Hoc Distributed Queries] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'Ad Hoc Distributed Queries')
					= 1, 'Correct', 'Incorrect'
				)
			, [Allow updates] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'allow updates')
					= 0, 'Correct', 'Incorrect'
				)
			, [Auto soft NUMA] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'automatic soft-NUMA disabled')
					= 0, 'Correct', 'Incorrect'
				)
			, [Min Memory MB Used By SQL] = IIF(@min_memory = 20000, 'Correct', 'Incorrect')
			, [Max Memory % Used By SQL] = IIF(@max_memory_percent BETWEEN 0.8 and 0.9, 'Correct', 'Incorrect')
			, [MaxDOP] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'max degree of parallelism')
					= 8, 'Correct', 'Incorrect'
				)
			, [Cost Threshold] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'cost threshold for parallelism')
					= 50, 'Correct', 'Incorrect'
				)
			, [Fill Factor %] = IIF(
					(SELECT value FROM #Configurations WHERE name = 'fill factor (%)')
					= 0, 'Correct', 'Incorrect'
				)
			-- https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/hybrid-buffer-pool?view=sql-server-ver15
				-- Defaults to disabled at instance-level but enabled at database-level
			, [Memory Optimized Hybrid Buffer Pool - Enabled for Instance] = IIF(
					(SELECT TOP(1) is_enabled FROM sys.server_memory_optimized_hybrid_buffer_pool_configuration)
					= 0, 'Incorrect', 'Correct')
			, [Memory Optimized Hybrid Buffer Pool - Configured for Instance] = IIF(
					(SELECT TOP(1) is_configured FROM sys.server_memory_optimized_hybrid_buffer_pool_configuration)
					= 0, 'Incorrect', 'Correct')
			-- Best practice to enable Lock Pages in Memory with hybrid buffer pool configuration
			, [Lock Pages in Memory (LPIM)] = IIF(
					(SELECT sql_memory_model_desc FROM sys.dm_os_sys_info)
					= 'LOCK_PAGES', 'Correct', 'Incorrect')
			-- Best practice to enable in 2019: https://docs.microsoft.com/en-us/sql/relational-databases/databases/tempdb-database?view=sql-server-ver15#memory-optimized-tempdb-metadata
			, [tempdb Memory Optimized] = IIF(
				SERVERPROPERTY('IsTempdbMetadataMemoryOptimized') = 1, 'Correct', 'Incorrect')
	END
END
GO

BEGIN -- Errors / Errata
	SELECT [filename] AS [Dump File]
		, creation_time
		, size_in_bytes/1048576 AS [Size (MB)]
	FROM sys.dm_server_memory_dumps 
	ORDER BY creation_time DESC
	OPTION (RECOMPILE);
END

BEGIN -- Configuration Landscape
	SELECT * FROM sys.certificates 
	WHERE name NOT LIKE '##%'
END
GO

BEGIN -- Latency
	BEGIN -- Drive space, config		
		SELECT DISTINCT vs.volume_mount_point
			, vs.file_system_type
			, vs.logical_volume_name
			, CONVERT(DECIMAL(18,2), vs.total_bytes/1073741824.0) AS [Total Size (GB)]
			, CONVERT(DECIMAL(18,2), vs.available_bytes/1073741824.0) AS [Available Size (GB)] 
			, CONVERT(DECIMAL(18,2), vs.available_bytes * 1. / vs.total_bytes * 100.) AS [Space Free %]
			, vs.supports_compression
			, vs.is_compressed
			, vs.supports_sparse_files
			, vs.supports_alternate_streams
		FROM sys.master_files AS f
		CROSS APPLY sys.dm_os_volume_stats(f.database_id, f.[file_id]) AS vs 
		ORDER BY vs.volume_mount_point 
		OPTION (RECOMPILE);
	END

	BEGIN-- Drive level latency
		SELECT SERVERPROPERTY('InstanceName') AS Instance, tab.[Drive], tab.volume_mount_point AS [Volume Mount Point], 
			CASE
				WHEN tab.volume_mount_point LIKE '%log%' THEN 'User DB logs'
				WHEN tab.volume_mount_point LIKE '%sys%' THEN 'System DBs, logs'
				WHEN tab.volume_mount_point LIKE '%data%' THEN 'User DB MDF, NDFs'
				WHEN tab.volume_mount_point LIKE '%index%' THEN 'User DB indexes'
				WHEN tab.volume_mount_point LIKE '%tempdb%' THEN 'tempdb MDF, NDF, logs'
			END AS UsedBy,
			CASE 
				WHEN num_of_reads = 0 THEN 0 
				ELSE (io_stall_read_ms/num_of_reads) 
			END AS [Read Latency],
			CASE 
				WHEN num_of_writes = 0 THEN 0 
				ELSE (io_stall_write_ms/num_of_writes) 
			END AS [Write Latency],
			CASE 
				WHEN (num_of_reads = 0 AND num_of_writes = 0) THEN 0 
				ELSE (io_stall/(num_of_reads + num_of_writes)) 
			END AS [Overall Latency],
			CASE 
				WHEN num_of_reads = 0 THEN 0 
				ELSE (num_of_bytes_read/num_of_reads) 
			END AS [Avg Bytes/Read],
			CASE 
				WHEN num_of_writes = 0 THEN 0 
				ELSE (num_of_bytes_written/num_of_writes) 
			END AS [Avg Bytes/Write],
			CASE 
				WHEN (num_of_reads = 0 AND num_of_writes = 0) THEN 0 
				ELSE ((num_of_bytes_read + num_of_bytes_written)/(num_of_reads + num_of_writes)) 
			END AS [Avg Bytes/Transfer]
		FROM (SELECT LEFT(UPPER(mf.physical_name), 2) AS Drive, SUM(num_of_reads) AS num_of_reads,
					 SUM(io_stall_read_ms) AS io_stall_read_ms, SUM(num_of_writes) AS num_of_writes,
					 SUM(io_stall_write_ms) AS io_stall_write_ms, SUM(num_of_bytes_read) AS num_of_bytes_read,
					 SUM(num_of_bytes_written) AS num_of_bytes_written, SUM(io_stall) AS io_stall, vs.volume_mount_point 
			  FROM sys.dm_io_virtual_file_stats(NULL, NULL) AS vfs
			  INNER JOIN sys.master_files AS mf WITH (NOLOCK)
			  ON vfs.database_id = mf.database_id AND vfs.file_id = mf.file_id
			  CROSS APPLY sys.dm_os_volume_stats(mf.database_id, mf.[file_id]) AS vs 
			  GROUP BY LEFT(UPPER(mf.physical_name), 2), vs.volume_mount_point) AS tab
		ORDER BY Drive OPTION (RECOMPILE);
	END

	-- Database level latency
	SELECT SERVERPROPERTY('InstanceName') AS Instance, tab.[Drive], tab.volume_mount_point AS [Volume Mount Point], 
		[Database], [File],
		CASE 
			WHEN num_of_reads = 0 THEN 0 
			ELSE (io_stall_read_ms/num_of_reads) 
		END AS [Read Latency],
		CASE 
			WHEN num_of_writes = 0 THEN 0 
			ELSE (io_stall_write_ms/num_of_writes) 
		END AS [Write Latency],
		CASE 
			WHEN (num_of_reads = 0 AND num_of_writes = 0) THEN 0 
			ELSE (io_stall/(num_of_reads + num_of_writes)) 
		END AS [Overall Latency],
		CASE 
			WHEN num_of_reads = 0 THEN 0 
			ELSE (num_of_bytes_read/num_of_reads) 
		END AS [Avg Bytes/Read],
		CASE 
			WHEN num_of_writes = 0 THEN 0 
			ELSE (num_of_bytes_written/num_of_writes) 
		END AS [Avg Bytes/Write],
		CASE 
			WHEN (num_of_reads = 0 AND num_of_writes = 0) THEN 0 
			ELSE ((num_of_bytes_read + num_of_bytes_written)/(num_of_reads + num_of_writes)) 
		END AS [Avg Bytes/Transfer]
	FROM (
		SELECT LEFT(UPPER(mf.physical_name), 2) AS Drive, vs.volume_mount_point, DB_NAME(vfs.database_id) AS [Database], [File] = mf.physical_name,
			[Type] = CASE 
					WHEN mf.type_desc = 'ROWS' THEN 'Data File'
					WHEN mf.type_desc = 'LOG' THEN 'Xact Log'
					ELSE mf.type_desc
				END, 
			SUM(num_of_reads) AS num_of_reads,
			SUM(io_stall_read_ms) AS io_stall_read_ms, SUM(num_of_writes) AS num_of_writes,
			SUM(io_stall_write_ms) AS io_stall_write_ms, SUM(num_of_bytes_read) AS num_of_bytes_read,
			SUM(num_of_bytes_written) AS num_of_bytes_written, SUM(io_stall) AS io_stall
		  FROM sys.dm_io_virtual_file_stats(NULL, NULL) AS vfs
		  INNER JOIN sys.master_files AS mf WITH (NOLOCK)
		  ON vfs.database_id = mf.database_id AND vfs.file_id = mf.file_id
		  CROSS APPLY sys.dm_os_volume_stats(mf.database_id, mf.[file_id]) AS vs 
		  GROUP BY LEFT(UPPER(mf.physical_name), 2), vs.volume_mount_point, DB_NAME(vfs.database_id), mf.physical_name, mf.type_desc
	) AS tab
	ORDER BY Drive OPTION (RECOMPILE);
END

SELECT TOP 10 * FROM sys.dm_external_script_execution_stats
