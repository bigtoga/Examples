# lambda operations with custom functions
An easy way to apply complex logic to “all rows at once, operating over the entire set rather than RBAR using iterrows()”

Example below from https://link.medium.com/YTCq5PLw26
```python   
def custom_rating(genre, rating):
    if ‘Thriller’ in genre:
        return min(10, rating+1)
    elif ‘Comedy’ in genre:
        return max(0, rating-1)
    else:
        return rating
        
df[‘CustomRating’] = df.apply(lambda x: custom_rating(x[‘Genre’],x[‘Rating’]),axis=1)
```
# Solving a problem using lambda functions
Problem statement: filter out any movies whose title is less than 4 words long (i.e. only titles with 5 or more words should be in the final dataframe) 
One option would be to create a new column that contains `word_count`:
```python   
# This fails
new_df = df[len(df[‘Title’].split(“ “))>=4]
```
>> AttributeError: ‘Series’ object has no attribute ‘split’

```python   
# apply() works over the entire set
df[“word_count”] = df.apply(lambda x : len(x[‘Title’].split(“ “)),axis=1)

new_df = df[df[“word_count”] > 4]]
```

A superior option would be to simply have apply() execute a lambda function over the set and filter it inline:
```python   
# The lambda expression returns a Boolean value
# apply() only returns rows that return True
new_df = df[df.apply(lambda x : len(x[‘Title’].split(“ “))>=4, axis=1)]
```

# Another problem where lambda expressions make life easier
Problem statement: find movies whose revenue was less than the average revenue for the release year

```python   
# Option 1: Perform this in multiple statements by adding a new column, “avg_year_revenue” then filtering against that

# Option 2: create a lambda function and apply it to the dataset:
year_revenue_dict = df.groupby([‘Year’]).agg({‘Rev_M’: np.mean}).to_dict()[‘Rev_M’]

def bool_provider(revenue, year):
    return revenue<year_revenue_dict[year]>
    
new_df = df[df.apply(lambda x : bool_provider(x[‘Rev_M’], x[‘Year’]),axis=1)]

```
# Changing data types using lambda expressions 
Problem statement: have a column with numbers + commas but want only numbers

```python   
# ‘Price’ column is ‘str’ w commas
df[‘Price’] = df[‘Price’].astype(‘int’)
```
>> ValueError: invalid literal for long() with base 10: ‘13,000’

```python   
df[‘Price’] = df.apply(lambda x: int(x[‘Price’].replace(‘,’, ‘’)), axis=1)
```

# A note about lambda operations and large data sets
pandas apply(), while handy, can take hours to execute over large datasets. You hit run, and you get nothing back for literally hours which is frustrating. 

If you `pip install tqdm`, you can change to using `.progress_apply()` and then you get progress bars!
```python   
from tqdm import tqdm, tqdm_notebook
tqdm_notebook().pandas()

... 

df.progress_apply(lambda x: custom_rating_function(x[‘Genre’], x[‘Rating’]), axis=1)
```


# lambda operations with Transform and pandas

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
