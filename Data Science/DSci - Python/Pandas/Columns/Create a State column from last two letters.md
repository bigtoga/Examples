*Note: If you don’t find what you need here, check out [the pandas cookbook](https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html)*

You have a column that has both City and State and want the state abbreviation in a separate column (Dallas, TX”):

```python   
df[‘State’] = df[‘City’].str[-2:]
```

If you had data that was “City, State Abbreviation, 3 character country abbreviation” (“Dallas, TX, USA”) and wanted to get just “Dallas, TX”), exclude the last four characters 
```
df[‘State’] = df[‘Province’].str[:-4]
```

