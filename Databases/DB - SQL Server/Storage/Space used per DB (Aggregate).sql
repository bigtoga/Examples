SELECT [Database] = DB_NAME(database_id) 
    , type_desc
	, CAST(ROUND((CAST(SUM(size) AS BIGINT) * 8 / 1024.00), 1) AS DECIMAL(18,1)) AS size_mb
FROM sys.master_files
GROUP BY DB_NAME(database_id), type_desc
ORDER BY 1, 2
