https://learn.microsoft.com/en-us/azure/data-explorer/kusto/concepts/querylimits#limit-on-result-set-size-result-truncation

Kusto default limits: 
- 500,000 rows
- Or overall data size of 64 MB

You will get an error if you exceed either: 

`The Kusto DataEngine has failed to execute a query: 'Query result set has exceeded the internal **data size limit 67108864** (E_QUERY_RESULT_SET_TOO_LARGE).'`
`The Kusto DataEngine has failed to execute a query: 'Query result set has exceeded the internal **record count limit 500000** (E_QUERY_RESULT_SET_TOO_LARGE).'`

You can control this with the `set` command:
- `set truncationmaxrecords = 100` - limit max returned rows to 100 rows
- `set trancationmaxsize = 1000` - limit max returned size to 1000 KB

You can bypass truncation if you hate life with  `set notruncation;`
