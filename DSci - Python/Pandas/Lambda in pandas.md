# Transform and pandas

Simple example of performing an operation over each row using `lambda` with `transform`:
```python   
import pandas as pd
import numpy as np 

df = pd.DataFrame(np.array([
      [1, 2, 3]
      , [4, 5, 6]
      , [7, 8, 9]
   ])
   , columns=[‘a’, ‘b’, ‘c’]
) 

# Multiply each value times 10
df.transform(func = lambda x : x * 10)
```

Larger dataset example using random generated data:
```python   
import pandas as pd 
import random

data = pd.DataFrame({
    ‘C’ : [random.choice((‘a’,’b’,’c’)) for i in range(1000000)],
    ‘A’ : [random.randint(1,10) for i in range(1000000)],
    ‘B’ : [random.randint(1,10) for i in range(1000000)]
})

# Create a new feature “by hand” using groupby()
%%timeit

data.groupby(‘C’)[“A”].mean()
mean =data.groupby(‘C’)[“A”].mean().rename(“N”).reset_index()
df_1 = data.merge(mean)
``` 
>> 230ms per loop

Now create the same feature using transform:
```python   
%%timeit

data[‘N3’] = data.groupby([‘C’])[‘A’].transform(‘mean’)
```
>> 35.1 ms per loop

# When to use `transform()` instead of `apply()`
* `apply()` processes a set (a.k.a. the entire Dataframe at once)
* `transform` processes an entire row or entire series; it can process the entire dataframe at once

Example of “something apply() can do that transform() cannot”:
```python   
import pandas as pd
import numpy as np 

df = pd.DataFrame(np.array([
      [1, 2, 3]
      , [4, 5, 6]
      , [7, 8, 9]
   ])
   , columns=[‘a’, ‘b’, ‘c’]
) 

df[‘d’] = df.apply(lambda row: row.a + row.b + row.c, axis=1)
``` 
