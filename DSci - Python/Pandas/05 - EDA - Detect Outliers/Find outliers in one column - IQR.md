# Drop all values +3 or -3 standard deviations away from the mean

Source: [The second highest voted answer from this thread on SO](https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame)
```python   
# example dataset of normally distributed data. 
df = pd.DataFrame({‘Data’:np.random.normal(size=200)})

# keep only the ones that are within +3 to -3 
# standard deviations in the column ‘Data’.
df[np.abs(df.Data-df.Data.mean()) <= (3*df.Data.std())]

# Same as above just using “not()” (~)
df[~(np.abs(df.Data-df.Data.mean()) > (3*df.Data.std()))]
```

```python   
# For a series it is similar:

S = pd.Series(np.random.normal(size=200))
S[~((S-S.mean()).abs() > 3*S.std())]
``` 

# Lambda expressions are alternate from same thread
```python   
# Remove outliers from column named “B”
df[((df.B - df.B.mean()) / df.B.std()).abs() < 3]
```


# Find outliers using 99th percentile 
Same thread - https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame
```python   
q = df[“col”].quantile(0.99)

# Filter out anything higher than the 99th percentile value
df[df[“col”] < q]
``` 

# Find outliers below 1% and above 99%
Same thread, same author as above
```python   
q_low = df[“col”].quantile(0.01)
q_hi  = df[“col”].quantile(0.99)

df_filtered = df[(df[“col”] < q_hi) & (df[“col”] > q_low)]
```

# Finding outliers using IQR
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

# If you only want the values between Q1 and Q3
```python   
iqr = df[‘col’][df[‘col’].between(df[‘col’].quantile(.25), df[‘col’].quantile(.75), inclusive=True)]

# Or a more verbose way of doing the same thing:
q1 = df[‘col’].quantile(.25)
q3 = df[‘col’].quantile(.75)
mask = d[‘col’].between(q1, q2, inclusive=True)
iqr = d.loc[mask, ‘col’]
``` 

# A generic function that can handle any dataframe you pass to it
Also from same SO post: https://stackoverflow.com/questions/34782063/how-to-use-pandas-filter-with-iqr

```python   
def mod_outlier(df):
        df1 = df.copy()
        df = df._get_numeric_data()


        q1 = df.quantile(0.25)
        q3 = df.quantile(0.75)

        iqr = q3 - q1

        lower_bound = q1 -(1.5 * iqr) 
        upper_bound = q3 +(1.5 * iqr)


        for col in col_vals:
            for i in range(0,len(df[col])):
                if df[col][i] < lower_bound[col]:            
                    df[col][i] = lower_bound[col]

                if df[col][i] > upper_bound[col]:            
                    df[col][i] = upper_bound[col]    


        for col in col_vals:
            df1[col] = df[col]

        return(df1)

df = mod_outlier(df)

``` 



