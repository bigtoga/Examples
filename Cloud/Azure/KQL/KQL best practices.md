Stay on top of info on [this documentation page](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/best-practices)

# How to speed up KQL queries 

1. Write your time filters first 
   - Kusto is highly optimized around time-based queries so leverage that by putting your time filters first
   - “Why does this work?” Internally, Kusto stores physical data in extents. The data in those extents is is ordered by ingestion date/time
   - If you use a time filter, Kusto can only query a subset of extents
   - If you use another type of filter, Kusto has to scam all extents
2. For joins, put the table with the fewest rows first (left-most query)
2. Know when to use `has` instead of `contains`
   - `has` is a full token match and therefore will perform better 
3. Use the case-sensitive operators
  - `==` is faster than `=~`
  - `in` is faster than `n~`
  - `contains_cs` is faster than `contains`
4. Search using specific columns
   - Don’t use * as it performs a full text search across all columns 
5. Project the fewest columns possible
6. Know your SQL query best practices because they also apply here
   - Don’t apply functions to a column before search:
      - Bad: `tolower(MyCol) == “myvalue”`
      - Good: Use the case-insensitive versions instead: `myCol =~ “myvalue”`
   - Use `limit` to reduce the rows returned 
   - Filter on table columns only, not on calculated fields
   
      

# Ingest Best Practices 

1. Materialize any needed computed fields during ingestion 
1. Leverage caching 
   - Use `materialize()` with `let` for reusable queries and faster performance 
   - https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/materializefunction
