# By column number
df = df.drop(df.columns[[0, 1, 2, 4, 5]], axis=1)
df.head()

# By column name
df.drop(columns=['B', 'C'])
