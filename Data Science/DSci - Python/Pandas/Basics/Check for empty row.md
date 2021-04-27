### Check to see if entire dataframe row is empty
Two options: lambda or no lambda:

~~~
df2.apply(lambda x: any(x.values == {}), axis=1)
~~~

Non-lambe:
~~~
df2['c'] = np.max(df2.values == {}, 1).astype(bool)
~~~
