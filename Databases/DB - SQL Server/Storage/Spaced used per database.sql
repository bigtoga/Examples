SELECT DB_NAME(database_id) AS database_name
        , database_id
        , [file_id]
    , type_desc
    , data_space_id
    , name AS logical_file_name
    , physical_name
        , (SIZE*8/1024) AS size_mb
        , CASE max_size
                WHEN -1 THEN 'unlimited'
                ELSE CAST((CAST (max_size AS BIGINT)) * 8 / 1024 AS VARCHAR(10))
        END AS max_size_mb
    , CASE is_percent_growth
                WHEN 1 THEN CAST(growth AS VARCHAR(3)) + ' %'
                WHEN 0 THEN CAST(growth*8/1024 AS VARCHAR(10)) + ' mb'
        END AS growth_increment
    , is_percent_growth
FROM sys.master_files
ORDER BY 1, type_desc DESC, [file_id];
