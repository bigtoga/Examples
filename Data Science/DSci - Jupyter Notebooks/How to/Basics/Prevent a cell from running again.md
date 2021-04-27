If you want to Restart & Run All but would prefer to skip an expensive step (such as model training or Pandas Profiling):

```python   
%%script false
model.fit(x_train, y_train)

``` 