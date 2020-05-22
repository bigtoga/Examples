~~~
# Just the columns:
df.dtypes

# Columns along w nullability
df.info()

# Also np.float64 np.int64
if df.dtypes['Name'] == np.object:
  print "oops!"
~~~   

[Best answer I've seen - covers many scenarios](https://stackoverflow.com/questions/15891038/change-data-type-of-columns-in-pandas)

### Have pandas soft convert all columns automatically
df = df.infer_objects()

### Convert all columns of DataFrame

~~~
# Convert all to string
dfn = df.convert_dtypes()
pd.to_numeric(df)

# Convert all to numbers
df = df.apply(pd.to_numeric) 
~~~

### Convert specific columns:
~~~
df[["a", "b"]] = df[["a", "b"]].apply(pd.to_numeric)

df["a"] = pd.to_numeric(df["a"])

df = df.astype({"a": int, "b": complex})
~~~

### Another option:
~~~
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

is_string_dtype(df['price'])
is_numeric_dtype(df['price'])
df["price"]
~~~
### Erratic results w astype() but sometimes works
~~~
# df = df.astype({"a": int, "b": complex})
df = df.astype({
    'SR #': str
    , 'Owner': str
    , 'Area': str
    , 'Status': str
    , 'Urgency': str
    , 'Requestor Last Name': str
})
~~~
