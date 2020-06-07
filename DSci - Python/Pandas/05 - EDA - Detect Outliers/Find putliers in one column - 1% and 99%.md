
Source: https://stackoverflow.com/questions/23199796/detect-and-exclude-outliers-in-pandas-data-frame
```python 
q_low = df[“col”].quantile(0.01)
q_hi  = df[“col”].quantile(0.99)

df_filter_out_the_outliers = df[(df[“col”] < q_hi) & (df[“col”] > q_low)]

df_outliers_1p = df[df[“col”] <= q_low]

df_outliers_99p = df[df[“col”] >= q_high]
```
