https://pycaret.org/setup/

```
models=setup(
    data60
    , target = 'iRate-T+60'
    , ignore_features = ['origDate']
    , session_id = 11
    , silent = True
    , profile = False
    , remove_outliers = False
)

# If the R2 line is flat, that's saying "any sample size will yield you the same results"
# Normally you will see the R2 increase as you do more rows
```
