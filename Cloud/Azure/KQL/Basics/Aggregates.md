
** Group by
```kql
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend OS = properties.storageProfile.osDisk.osType
| summarize VMs = count() by tostring(OS)
```

**Get the most recent rows only**
```kql

// from https://squaredup.com/blog/aggregating-and-visualizing-data-with-kusto/
UpdateSummary
| summarize arg_max(TimeGenerated, TotalUpdatesMissing) by Computer 
| project Computer, TotalUpdatesMissing 
```

The `arg_max` function is tricky - 
- `arg_max()` gets the *maximum TimeGenerated value in each group* (i.e the latest record for that computer since you included `by Computer`) 
- It also returns the `TotalUpdatesMissing` column's value from the same row - that's something `max()` could not do 
- If you want more columns in your result set you can add them in, separated by a comma.  If you want all the columns, just use `*` instead of listing all the column names

