Note: `quantile` and `percentile` are both available yet both use numpy.percentile begins the scenes

In quantiles:
- There is always one fewer quantile than the number of groups created
- The numbers passed in to create the groups are called `cut points`
- A quartile would have three cut points: .25, .5, .75
- A decile would have nine cut points and create ten groups: .1, .2, etc

# Basic quantile 
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

# Parameters 
**`interpolation`**
- Optional; defaults to `linear`
- Defines how the algorithm calculates the quantile value when the default computed value lies between two data points
- linear uses a calculation to define the edge: `i + (j - i) * fraction` where `i` is the current cell value, `j` is the next cell’s value, and `fraction` is the “fractional part of the index” (whatever that means).. [numpy documentation](https://numpy.org/doc/stable/reference/generated/numpy.quantile.html)

# When to use
Typically these will be used to identify outliers and be used in conjunction with inter-quartile range (IQR) and box plots

# Finding outliers 
Love this example of [how to find outliers using pandas](https://www.back2code.me/2017/08/outliers/):

```python   
import pandas as pd
import numpy as np
%matplotlib inline

# Some test data
np.random.seed(33454)
df = (
    # A standard distribution
    pd.DataFrame({‘nb’: np.random.randint(0, 100, 20)})
        # Adding some outliers
        .append(pd.DataFrame({‘nb’: np.random.randint(100, 200, 2)}))
        # Reseting the index
        .reset_index(drop=True)
    )

# Compute the IQR by calculating the first quartile and third quartiles,
# then subtracting the first from the third
Q1 = df[‘nb’].quantile(0.25)
Q3 = df[‘nb’].quantile(0.75)
IQR = Q3 - Q1

# Find outliers using common cookie cutter code
# 
# This will remove rows for which the column value are 
# less than Q1-1.5IQR or greater than Q3+1.5IQR
filtered = df.query(‘(@Q1 - 1.5 * @IQR) <= nb <= (@Q3 + 1.5 * @IQR)’)

# Plot!
df.join(filtered, rsuffix=‘_filtered’).boxplot()

``` 
The left box plot shows the original dataset with an outlier at 183 (the “+”). The right boxplot shows the filtered dataset which has removed any values outside the IQR 

![?](https://i.imgur.com/CBWSWgQ_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Note that `whisker_width = 1.5 is standard practice`

# Alternately you can use a function
From [this post on SO](https://stackoverflow.com/questions/34782063/how-to-use-pandas-filter-with-iqr)

```python   
def subset_by_iqr(df, column, whisker_width=1.5):
    “””Remove outliers from a dataframe by column, including optional 
       whiskers, removing rows for which the column value are 
       less than Q1-1.5IQR or greater than Q3+1.5IQR.
    Args:
        df (`:obj:pd.DataFrame`): A pandas dataframe to subset
        column (str): Name of the column to calculate the subset from.
        whisker_width (float): Optional, loosen the IQR filter by a
                               factor of `whisker_width` * IQR.
    Returns:
        (`:obj:pd.DataFrame`): Filtered dataframe
    “””
    # Calculate Q1, Q2 and IQR
    q1 = df[column].quantile(0.25)                 
    q3 = df[column].quantile(0.75)
    iqr = q3 - q1
    # Apply filter with respect to IQR, including optional whiskers
    filter = (df[column] >= q1 - whisker_width*iqr) & (df[column] <= q3 + whisker_width*iqr)
    return df.loc[filter]                                                     

df_filtered = subset_by_iqr(
   df
   , ‘column_name’
   , whisker_width=1.5
)
``` 




