Basic dataframe
```python
df = pd.DataFrame({
   'A': {0: 'a', 1: 'b', 2: 'c'}
   , 'B': {0: 1, 1: 3, 2: 5}
   , 'C': {0: 2, 1: 4, 2: 6}
})
```
|   	|  A	|  B 	|   C	|
|---	|---	|---	|---	|
|  0 	|  a 	|  1 	|  2 	|
|   1	|  b 	|  3 	|  4 	|
|   2	|  c 	|  5 	|  6 	|

```python
# In Pandas melt(), you unpivot a dataframe 
# Your "identifier variables" (id_vars) remain the same/unchanged 
# The value_vars go into two new columns, "variable" and "value"
# "measured variables" (value_vars) are “unpivoted” to the row axis (axis=0)
pd.melt(df, id_vars=['A'], value_vars=['B'])
```
Because our value_vars (a) only had a single measure variable (column), and (b) because there are only 3 rows in the dataframe, we get back:
|   	|  A 	| variable | value |
|---	|---	|---	| ---	|
| 0 |   a	|   B	|   1	| 
| 1   |   b	|   B	|   3	|
| 2  |   c	|   B	|  5 	|

```python
# When you have 2 or more "measured variables", they still get added to the row axis
# In this case, Pandas will (a) generate the unpivoted data for each column in value_vars separately, 
#    then (b) essentially pd.concat() the 'B' data and the 'C' data into the same result set
#    sort of like a SQL union
pd.melt(df, id_vars=['A'], value_vars=['B', 'C'])
```
Now we have two columns in the value_vars thus "number of rows returned" is now (number of columns in value_vars) * (number of rows in the dataframe) = 6
|   	|  A 	| variable | value |
|---	|---	|---	|---	|
| 0 |   a	|   B	|   1	| 
| 1   |   b	|   B	|   3	|
| 2  |   c	|   B	|  5 	|
| 3  	|  a 	|   C	|   2	|
|  4 	|  b 	|   C	|   4	|
|  5 	|  c 	|   C	|   6	|

The names of ‘variable’ and ‘value’ columns can be customized:
```python
pd.melt(df, id_vars=['A'], value_vars=['B'], var_name='myVarname', value_name='myValname')
```
|   	|  A 	| myVarname | myValname |
|---	|---	|---	| ---	|
| 0 |   a	|   B	|   1	| 
| 1   |   b	|   B	|   3	|
| 2  |   c	|   B	|  5 	|

If you pass no `value_vars`, Pandas will automatically treat every column not in `id_vars` as a measure variable:
```python
# You can have Pandas create the variable and value columns without values
pd.melt(df, id_vars=['A'])
```
|   	|  A 	| variable | value |
|---	|---	|---	|---	|
| 0 |   a	|   B	|   1	| 
| 1   |   b	|   B	|   3	|
| 2  |   c	|   B	|  5 	|
| 3  	|  a 	|   C	|   2	|
|  4 	|  b 	|   C	|   4	|
|  5 	|  c 	|   C	|   6	|
