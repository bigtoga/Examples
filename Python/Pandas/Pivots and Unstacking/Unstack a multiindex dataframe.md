# https://stackoverflow.com/questions/31845258/pandas-multi-index-plotting

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
|val|Group|Sex|Mean|Group 1|Male|Low|High|Female|Low|High|Group 2|Male|Low|
|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|25|
|54|
|52|
|57|
|83|

```python
# unstack last level to plot two separate columns
unstacked = data.unstack(level=-1)
unstacked.head()
```
|val|Mean|High|Low|Group|Sex|Group 1|Female|Male|Group 2|Female|Male|
|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|57|52|
|54|25|
|36|74|
|50|83|
