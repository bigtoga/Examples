SELECT 
	[Queue] 			= ssq.name 
	, [schema] 			= ss.name
	, rows_in_queue		= sp.rows
	, internal_table 	= sit.name
	, index_id			= si.index_id
	, index_name		= si.name
	, queue_id 			= ssq.object_id
FROM sys.partitions sp
JOIN sys.internal_tables sit
	ON sit.object_id = sp.object_id
JOIN  sys.indexes si  
	ON sit.object_id = si.object_id
JOIN  sys.service_queues ssq
	ON sit.parent_object_id = ssq.object_id
JOIN  sys.schemas ss
	ON sit.schema_id = ss.schema_id
