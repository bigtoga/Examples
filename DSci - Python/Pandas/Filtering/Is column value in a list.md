Use `isin()` just like you would use SQL IN() function
```python    
myList = ["Capomulin", "Ramicane", "Infubinol", "Ceftamin"]

dfSubset = df[df[“Drug Regimen”].isin(myList)]

dfSubset.head()
```

If you want equivalent to SQL’s NOT IN(), use a tilde prefix
```python   
dfSubset = df[~df[“Drug Regimen”].isin(myList)]

dfSubset.head()

```
