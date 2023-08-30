SELECT count(*) AS Txacts, min(timestamp) as Earliest, max(timestamp) as Latest from Transaction WHERE dateOf(timestamp) = 'August 15, 2023' and host = 'myVm' SINCE 30 days ago
