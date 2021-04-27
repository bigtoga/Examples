```python   
import pandas as pd
mouse_metadata = "data/Mouse_metadata.csv"
df = pd.read_csv(mouse_metadata)

# Group by
grp = "Drug Regimen"
gby = df.groupby(grp)

# List our the group values (distinct list of Drug Regimens)
gby.groups.keys()

# View one group
gby_Ibuprofen = gby.get_group(“Ibuprofen”)
print(gby_Ibuprofen.head()
```

![Pandas Group By](https://github.com/bigtoga/Examples/blob/master/Python/Assets/Images/PandasGroupBy.jpg "Logo Title Text 1")

[Lots of good examples here](https://link.medium.com/9cOvuqP056)

```python   
df.groupby(‘school’).groups

df.groupby(grouping).get_group(‘Group1’)

# For all members of a group, get the mean for all other features
mjob_gp = df.groupby(‘Mjob’)
mjob_gp.agg(‘mean’)

# For all members of a group, get the mean for one feature
mjob_gp[‘age’].agg(‘mean’)

# For all members of a group, get multiple aggregations 
# Note that this creates a multindex 
mjob_gp.agg({‘age’:[‘mean’,’max’]})

# If you do not want a multindex, use pd.NamedAgg
mjob_gp.agg(avg_age=pd.NamedAgg(column=‘age’, aggfunc=‘mean’),
            min_age=pd.NamedAgg(column=‘age’, aggfunc=‘min’),
            max_age=pd.NamedAgg(column=‘age’, aggfunc=‘max’))
            
```

# pd.NamedAgg
Two advantages:
1. Does. Or create a multindex 
2. Allows you to rename output columns inline

# HAVING in pandas
No exact equivalent but you can use `filter()` to simulate 

```python   
# GROUP BY Mjob 
# HAVING AVG(G1) > 12
mjob_gp = df.groupby(‘Mjob’)
mjob_gp.filter(lambda x: x[‘G1’].mean() > 12)
``` 

