```
drop_thresh = df_raw.shape[0]*.9
df = df_raw.dropna(thresh=drop_thresh, how='all', axis='columns').copy()
```
https://stackoverflow.com/questions/49791246/drop-columns-with-more-than-60-percent-of-empty-values-in-pandas
