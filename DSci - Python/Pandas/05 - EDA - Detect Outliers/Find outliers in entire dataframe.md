[This was a very highly voted thread on SO](https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame)

# The highest voted solution
Originally found here: https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame/23202269#23202269

This solution:
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

