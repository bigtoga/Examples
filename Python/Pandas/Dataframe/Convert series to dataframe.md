# Option 1
~~~
pd.DataFrame({'email':sf.index, 'list':sf.values})
~~~

# Option 2: 
~~~
df = df.rename(columns= {0: 'list'})
df.index.name = 'index'
~~~
