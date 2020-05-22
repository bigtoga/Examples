~~~
df1.merge(df2, left_on='lkey', right_on='rkey')
~~~

### Adding suffixes to separate where each overlapping column came from
~~~
df1.merge(df2, left_on='lkey', right_on='rkey'), suffixes=('_left', '_right'))
~~~

### Joining on multiple columns 
~~~
new_df = pd.merge(A_df, B_df,  how='left', left_on=['A_c1','c2'], right_on = ['B_c1','c2'])
~~~
