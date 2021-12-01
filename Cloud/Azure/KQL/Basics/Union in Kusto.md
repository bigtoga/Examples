Documentation and resources:
- https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/unionoperator

```kusto
let T1 = range x from 1 to 3 step 1;
let T2 = range x from 11 to 13 step 1;
let _interval = 7h;
union
(T1 | where _interval < 5h),
(T2 | where _interval >= 5h)
```

```kusto
```


```kusto
```


```kusto
```


```kusto
```
