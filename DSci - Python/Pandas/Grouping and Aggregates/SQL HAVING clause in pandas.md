# HAVING in pandas
No exact equivalent but you can use `filter()` to simulate 

```python   
# GROUP BY Mjob 
# HAVING AVG(G1) > 12
mjob_gp = df.groupby(‘Mjob’)
mjob_gp.filter(lambda x: x[‘G1’].mean() > 12)
``` 

