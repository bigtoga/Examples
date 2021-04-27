### Shift is the function
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.shift.html

## Step 1: sort the dataframe first
## Step 2: Then you can use shift

~~~
df['Data_lagged'] = df.groupby(['Group'])['Data'].shift(1)
~~~

~~~
df = pd.DataFrame({'Col1': [10, 20, 15, 30, 45],
                    'Col2': [13, 23, 18, 33, 48],
                    'Col3': [17, 27, 22, 37, 52]})
df["Col4"] = ''
df.reset_index().sort_values("Col1")
df['Col4'] = df['Col3'].shift(periods=1)
df.head()
~~~
