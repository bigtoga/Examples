# Best option - just reset the index:
~~~
avgs = cap.groupby("Weight (g)")[aggColumn].mean().round(2)
avgs.reset_index(name="AvgTumorVol")
~~~

# Option 1
~~~
pd.DataFrame({'email':sf.index, 'list':sf.values})
~~~

# Option 2: 
~~~
df = df.rename(columns= {0: 'list'})
df.index.name = 'index'
~~~

# Option 3:
~~~
myseries.to_frame(name='my_column_name')
myseries.reset_index(drop=True, inplace=True)  # As needed
~~~

## Option 4: 
~~~
s = pd.Series([1, 2, 3], index=['a', 'b', 'c']).rename_axis('A')
s
~~~
