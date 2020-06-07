[This was a very highly voted thread on SO](https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame)

There are many options - 
- Does your Dataframe have string/datetime/Boolean data?
   - If yes, go to <a href=#strongs”>this solution</a>
   - If no (i.e. data is labeled data only), use <a href=“labeled”>this solution</a>

# The highest voted solution
Originally found here: https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame/23202269#23202269

<a name=“labeled”>This solution is for numeric data only</a>
1. Assumes all columns are numeric 
1.  May have an issue - one comment said, “This fails in the event that an entire column has the same value - in these cases zscore returns NaN and therefore the < 3 check returns False for every row **dropping every record**.”
1. For each column, first it computes the Z-score of each value in the column, relative to the column mean and standard deviation
- Then is takes the absolute of Z-score because the direction does not matter, only if it is below the threshold
- all(axis=1) ensures that for each row, all columns satisfy the constraint.
- Finally, result of this condition is used to index the dataframe
```python   
df = pd.DataFrame(np.random.randn(100, 3))

from scipy import stats

df[(np.abs(stats.zscore(df)) < 3).all(axis=1)]

```

“What is the significance of 3 in the above code?”
- “assuming distribution X with mean mu and standard deviation sigma, the z score measures how many sigmas a value is from mu. algebraically: `z-score = (x - mu) / sigma`. the 3 is the threshold in number of standard deviations away from the mean. – ”

Someone later wrote a lambda version in the same thread:
```python   
df = pd.DataFrame(np.random.randn(100, 3), columns=list(‘ABC’))

df[df.apply(lambda x: np.abs(x - x.mean()) / x.std() < 3).all(axis=1)]
``` 

# If your Dataframe has non-numeric Data
<a name=“strings”>Use this solution from same thread</a>

```python   
# Basically creates a filtered version of your Dataframe
# then applies the above algorithm to only the
# numeric columns

from scipy import stats

def drop_numerical_outliers(df, z_thresh=3):
    # Constrains will contain `True` or `False` depending on if it is a value below the threshold.
    constrains = df.select_dtypes(include=[np.number]) \
        .apply(lambda x: np.abs(stats.zscore(x)) < z_thresh, reduce=False) \
        .all(axis=1)
    # Drop (inplace) values set to be rejected
    df.drop(df.index[~constrains], inplace=True)
    
# Usage
drop_numerical_outliers(df)
    
``` 

[The original thread has a fantastic example](https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame) showing effect of removing outliers, z-scores, and great plot examples. 

Before removing outliers:

![?](https://i.stack.imgur.com/XlxOp.png)

After removing outliers:

![?](https://i.stack.imgur.com/lwxH0.png)