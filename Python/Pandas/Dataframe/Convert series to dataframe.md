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
