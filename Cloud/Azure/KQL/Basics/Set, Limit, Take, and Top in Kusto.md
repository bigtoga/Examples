https://docs.microsoft.com/en-us/azure/data-explorer/kusto/concepts/querylimits

Returns up to 10 rows:

```kusto
Table
| where clause...
| sort by clause...
| limit 10
```

Returns up to 20 rows using [set truncationmaxrecords](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/concepts/querylimits#limit-on-result-set-size-result-truncation):

```kusto
set truncationmaxrecords = 20;
let n = 100;
Table
| where clause...
| sort by clause...
| take n
```
