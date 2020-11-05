USE tempdb
GO
-- sys. dm_db_session_space_usage - only applies to tempdb
-- https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-db-session-space-usage-transact-sql
/* 
	user_objects_alloc_page_count
	user_objects_dealloc_page_count	
	internal_objects_alloc_page_count
	internal_objects_dealloc_page_count
	user_objects_deferred_dealloc_page_count

	IAM pages are not included in any of the allocation or deallocation counts reported by this view.

	Page counters are initialized to zero (0) at the start of a session. The counters track the total number of pages that
		have been allocated or deallocated for tasks that are already completed in the session
		The counters are updated only when a task ends; they do not reflect running tasks

	User objects in this view:
		- User-defined tables and indexes
		- System tables and indexes
		- Global temporary tables and indexes
		- Local temporary tables and indexes
		- Table variables
		- Tables returned in the table-valued functions

	Internal objects are only in tempdb. The following objects are included in the internal object page counters:
		- Work tables for cursor or spool operations and temporary large object (LOB) storage
		- Work files for operations such as a hash join
		- Sort runs

	To find usage, subtract the internal objects and focus on user queries/objects

*/
SELECT * 
FROM (
	SELECT  ss.session_id
		, connect_time								= cn.connect_time
		, user_name									= es.login_name
		, host										= es.host_name
		, app										= es.program_name
		, [Database]								= DB_NAME(ss.database_id)
		, [Total Allocation MB]						= CAST((ss.user_objects_alloc_page_count + internal_objects_alloc_page_count) / 128 AS DECIMAL(15, 2))
		, [Net Allocation MB]						= CAST((ss.user_objects_alloc_page_count
															   + ss.internal_objects_alloc_page_count
															   - ss.internal_objects_dealloc_page_count
															   - ss.user_objects_dealloc_page_count) / 128 AS DECIMAL(15, 2))
		, [Total Allocation User Objects MB]		= CAST(ss.user_objects_alloc_page_count / 128 AS DECIMAL(15, 2))
		, [Net Allocation User Objects MB]			= CAST((ss.user_objects_alloc_page_count - ss.user_objects_dealloc_page_count) / 128 AS DECIMAL(15, 2)) 
		, [Total Allocation Internal Objects MB]	= CAST(ss.internal_objects_alloc_page_count / 128 AS DECIMAL(15, 2))
		, [Net Allocation Internal Objects MB]		= CAST((ss.internal_objects_alloc_page_count - ss.internal_objects_dealloc_page_count) / 128 AS DECIMAL(15, 2))
		, T.text [Query Text]
	FROM sys.dm_db_session_space_usage ss
	JOIN sys.dm_exec_sessions es
		ON ss.session_id = es.session_id
	LEFT JOIN sys.dm_exec_connections cn
		ON cn.session_id = es.session_id
	OUTER APPLY sys.dm_exec_sql_text(cn.most_recent_sql_handle) t
) x
WHERE [Net Allocation MB] > 0
