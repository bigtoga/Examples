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
Result is similar to a pandas groupby result 
![x](https://i.imgur.com/hiCyvSe.png)

```python
# unstack last level to plot two separate columns
unstacked = data.unstack(level=-1)
unstacked.head()
```
![x](https://i.imgur.com/PIlJTaM.png)

# Plotting 
```python
# Create methods to dynamically plot
def add_line(ax, xpos, ypos):
    line = plt.Line2D([xpos, xpos], [ypos + .1, ypos],
                      transform=ax.transAxes, color='gray')
    line.set_clip_on(False)
    ax.add_line(line)

def label_len(my_index,level):
    labels = my_index.get_level_values(level)
    return [(k, sum(1 for i in g)) for k,g in groupby(labels)]

def label_group_bar_table(ax, df):
    ypos = -.1
    scale = 1./df.index.size
    for level in range(df.index.nlevels)[::-1]:
        pos = 0
        for label, rpos in label_len(df.index,level):
            lxpos = (pos + .5 * rpos)*scale
            ax.text(lxpos, ypos, label, ha='center', transform=ax.transAxes)
            add_line(ax, pos*scale, ypos)
            pos += rpos
        add_line(ax, pos*scale , ypos)
        ypos -= .1
```

## Plot the original `data` dataframe
```python
ax = data['val'].plot(kind='bar')
#Below 2 lines remove default labels
ax.set_xticklabels('')
ax.set_xlabel('')
label_group_bar_table(ax, data)
```
![x](https://i.imgur.com/hCFIt6m.png)


## Plot the new `unstacked` dataframe
```python
ax = unstacked['val'].plot(kind='bar')
ax.set_xticklabels('')
ax.set_xlabel('')
label_group_bar_table(ax, data)
```
![x](https://i.imgur.com/ZojCwVr.png)
