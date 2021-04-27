# distinct

~~~
# Set ipython's max row display
pd.set_option('display.max_row', 1000)

# Set iPython's max column width to 50
pd.set_option('display.max_columns', 50)

# Count of unique values:
df['ClosedWeek'].nunique();
~~~

```diff
- df.sort_values(by="ClosedWeek", ascending = True)['ClosedWeek'].unique
+ df.sort_values(by="ClosedWeek", ascending = True)['ClosedWeek'].unique()

dfAgg = pd.DataFrame(df.sort_values(by="ClosedWeek", ascending = True)[['ClosedWeek'].unique())
dfAgg.columns = ['ClosedWeek']
dfAgg.head()
```
```shell
<PeriodArray>
['2019-12-30/2020-01-05', '2020-01-06/2020-01-12', '2020-01-13/2020-01-19'...]
Length: 18, dtype: period[W-SUN]
```

### Another option is using ravel():
```shell
df = df.sort_values(by="ClosedWeekNumber", ascending = True);
pd.unique(df[['ClosedWeek', 'ClosedWeekNumber']].values.ravel('K'))
```

https://chrisalbon.com/python/data_wrangling/pandas_list_unique_values_in_column/

