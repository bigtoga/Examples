Note: `quantile` and `percentile` are both available yet both use numpy.percentile begins the scenes

In quantiles:
- There is always one fewer quantile than the number of groups created
- The numbers passed in to create the groups are called `cut points`
- A quartile would have three cut points: .25, .5, .75
- A decile would have nine cut points and create ten groups: .1, .2, etc

```python   
import pandas as pd 

df = pd.DataFrame({
   “A”:[1, 5, 3, 4, 2]
   , “B”:[3, 2, 4, 3, 4]
   , “C”:[2, 2, 7, 3, 4]
   , “D”:[4, 3, 6, 12, 7]
}) 
  
# Compute the quantile over the index axis
# Pandas will create 4 groups 
df.quantile(.2, axis = 0) 

# You can force a specific number of groups also
df.quantile([.1, .25, .5, .75], axis = 0) 


```
