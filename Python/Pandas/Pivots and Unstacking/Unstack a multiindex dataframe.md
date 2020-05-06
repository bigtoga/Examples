[Source post for the below](https://stackoverflow.com/questions/31845258/pandas-multi-index-plotting)

Search terms: Multi-index pandas pivot unpivot stack unstack flatten

```python
import pandas as pd
import matplotlib.pyplot as plt
from itertools import groupby
import numpy as np 
%matplotlib inline

groups = ('Group 1', 'Group 2')
sexes = ('Male', 'Female')
means = ('Low', 'High')
index = pd.MultiIndex.from_product(
    [groups, sexes, means], 
   names=['Group', 'Sex', 'Mean']
)

values = np.random.randint(low=20, high=100, size=len(index))
data = pd.DataFrame(data={'val': values}, index=index)
data.head()
```
![x](https://i.imgur.com/hiCyvSe.png)

```python
# unstack last level to plot two separate columns
unstacked = data.unstack(level=-1)
unstacked.head()
```
![x](https://i.imgur.com/PIlJTaM.png)
