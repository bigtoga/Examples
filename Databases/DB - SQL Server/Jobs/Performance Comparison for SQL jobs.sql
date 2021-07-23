SET NOCOUNT ON;

BEGIN -- Setup
	DROP TABLE IF EXISTS #IgnoreCategories, #JobHistory, #JobHistory_All, #AggregateThis;
END
GO

DECLARE @NumberOfJobExecutions INT		= 50 -- Review only the past 'x' job runs
	, @OldestDateToLookBackTo DATETIME	= 'March 1, 2021'
	, @Environment VARCHAR(25)			= 'Test'
	, @DiscardSlowestAndFastest INT		= 2 -- Throw out fastest 'x' executions and the slowest 'x' executions 

BEGIN -- Date Collector
	BEGIN -- #IgnoreCategories
		SELECT category_id 
		INTO #IgnoreCategories
		FROM msdb.dbo.syscategories
		WHERE name LIKE 'REPL%'
	END

	BEGIN -- #JobHistory
		SELECT 
			[Environment]			= @Environment
			, [Server]				= h.[Server]
			, Job					= j.name 
			, Category				= c.name
			, StartTimeUTC			= msdb.dbo.agent_datetime(h.run_date, h.run_time)
			, Duration_sec			= (run_duration/10000 * 60 * 60) + (run_duration/100%100 * 60) + (run_duration%100)
			, Run					= ROW_NUMBER() OVER(PARTITION BY j.job_id ORDER BY msdb.dbo.agent_datetime(h.run_date, h.run_time) DESC)
			, j.job_id
			, j.category_id
		INTO #JobHistory_All
		FROM msdb.dbo.sysjobhistory h
		JOIN msdb.dbo.sysjobs j
			ON j.job_id = h.job_id
		JOIN msdb.dbo.syscategories c
			ON j.category_id = c.category_id
		WHERE j.enabled = 1
			AND h.step_name = '(Job outcome)'
			AND h.run_status = 1 -- Only return successful executions
			AND msdb.dbo.agent_datetime(h.run_date, h.run_time) >= @OldestDateToLookBackTo
			AND j.category_id NOT IN (SELECT x.category_id FROM #IgnoreCategories x)
		ORDER BY msdb.dbo.agent_datetime(h.run_date, h.run_time) DESC
	END

	SELECT *
		, Runs_Total = COUNT(*) OVER(PARTITION BY job_id)
		, ExecutionSpeed		= ROW_NUMBER() OVER(PARTITION BY job_id ORDER BY Duration_sec DESC)
	INTO #JobHistory
	FROM #JobHistory_All
	WHERE Run <= @NumberOfJobExecutions

	SELECT *, ExecutionsReviewed = COUNT(*) OVER(PARTITION BY job_id) 
	INTO #AggregateThis
	FROM (
		SELECT * 
		FROM #JobHistory
		WHERE ExecutionSpeed > @DiscardSlowestAndFastest
			AND ExecutionSpeed <= (@NumberOfJobExecutions - @DiscardSlowestAndFastest)
	) x
END

SELECT Environment, [Server], Category, Job
	, Fastest = MIN(Duration_sec)
	, Slowest = MAX(Duration_sec)
	, [Average] = AVG(Duration_sec)
	, ExecutionsReviewed
FROM #AggregateThis a
GROUP BY Environment, [Server], Category, Job, ExecutionsReviewed
ORDER BY Environment, [Server], Category, Job, ExecutionsReviewed
