You have a column that has both City and State and want the state abbreviation in a separate column (Dallas, TX”):

```python   
df[‘State’] = df[‘City’].str[-2:]
```
