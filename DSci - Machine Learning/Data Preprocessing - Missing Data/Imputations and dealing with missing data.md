Many many many approaches to solving these. Basic principle is every “cell” in a dataset (intersection of columns and rows) should have a value. What the value should be however is dependent on the domain and the SME advice. 

# Identifying columns with missing data
Get a column-level list of any columns w missing data:

`df.isnull().sum()`

# Options
- Delete the column
- Delete the row
- Replace with 0 
- Replace with mean: `df_country[‘price’].fillna(df[‘price’].mean(),inplace = True)`
- Replace with mode
- Replace with LOCF value 
- Replace with a calculated value


Option: LOCF
**Last Observation Carried Forward** is often used when a feature’s datapoint is supplied/observed less frequently than the other features. In a dataset w features “stock_price_close”, “stock_date”, “reported_EBITDA”, two features might be updated daily but EBIDTA data may be only available quarterly or even annually. A common solution here is to apply LOCF to this data for all observations during the appropriate period. 

> Be careful here of the issue of applying “future information” to “present data”. If you apply “this quarter’s EBITDA” to “this quarter’s stock price data”, you are tainting the model by providing information that was not know at the time of observation
> Instead or apply “this quarter’s EBIDTA” to “this quarter’s stock prices”, apply the “known at the time” data (the previous quarter’s data) 