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
# Values between Q1-1.5IQR and Q3+1.5IQR
filtered = df.query(‘(@Q1 - 1.5 * @IQR) <= nb <= (@Q3 + 1.5 * @IQR)’)

# Plot!
df.join(filtered, rsuffix=‘_filtered’).boxplot()

``` 
![?](https://i.imgur.com/CBWSWgQ_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)




