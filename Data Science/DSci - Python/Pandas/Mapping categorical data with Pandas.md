https://benalexkeen.com/mapping-categorical-data-in-pandas/

https://pbpython.com/pandas_dtypes_cat.html
> The category data type in pandas is a hybrid data type. It looks and behaves like a string in many instances but internally is represented by an array of integers. This allows the data to be sorted in a custom order and to more efficiently store the data.

> In python, unlike R, there is no option to represent categorical data as factors. Factors in R are stored as vectors of integer values and can be labelled.

* Any missing categories in this case will be represented by -1
```python
df = pd.DataFrame({'vertebrates': ['Bird', 'Bird', 'Mammal', 'Fish', 'Amphibian', 'Reptile', 'Mammal']})
df.vertebrates.astype("category").cat.codes
```

If you want to separate the distinct variables out into booleans for linear regression: 
```python
pd.get_dummies(df, columns=['vertebrates'])
```

## For ordered categories
```python
ordered_satisfaction = ['Very Unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very Happy']
df = pd.DataFrame({'satisfaction':['Mad', 'Happy', 'Unhappy', 'Neutral']})

df.satisfaction.astype("category",
  ordered=True,
  categories=ordered_satisfaction
)
```

You can even output the categories as numbers that map to the ordered categories:
```python
df.satisfaction.astype("category",
  ordered=True,
  categories=ordered_satisfaction
).cat.codes
```

From [documentation](https://pandas.pydata.org/pandas-docs/stable/user_guide/categorical.html):
>Categoricals are a pandas data type corresponding to categorical variables in statistics. A categorical 
variable takes on a limited, and usually fixed, number of possible values (categories; levels in R). 
Examples are gender, social class, blood type, country affiliation, observation time or rating via Likert scales.

```python
data['propState'] = data['propState'].astype('category')
data['stateCat'] = data['propState'].cat.codes
```
