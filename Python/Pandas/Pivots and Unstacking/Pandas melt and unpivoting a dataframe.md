Basic dataframe
```python
df = pd.DataFrame({
   'A': {0: 'a', 1: 'b', 2: 'c'}
   , 'B': {0: 1, 1: 3, 2: 5}
   , 'C': {0: 2, 1: 4, 2: 6}
})
```

```python
pd.melt(df, id_vars=['A'], value_vars=['B'])
```
|   	|  A 	| variable  	| value |
|---	|---	|---	| |---	|
| 0 |   a	|   B	|   1	| 
| 1   |   b	|   B	|   3	|
| 2  |   c	|   B	|  5 	|

```python
```


```python
```
