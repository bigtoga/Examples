https://stackoverflow.com/questions/53781634/aggregation-in-pandas

```python
# Sum one column
df1 = df.groupby(['A', 'B'], as_index=False)['C'].sum()

# Sum all columns
df2 = df.groupby(['A', 'B'], as_index=False).sum()

# Sum multiple columns 
df3 = df.groupby(['A', 'B'], as_index=False)['C','D'].sum()
print (df3)
```
