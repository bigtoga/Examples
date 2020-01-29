[Best answer I've seen - covers many scenarios](https://stackoverflow.com/questions/15891038/change-data-type-of-columns-in-pandas)

### Have pandas soft convert all columns automatically
df = df.infer_objects()

### Convert all columns of DataFrame

~~~
df = df.apply(pd.to_numeric) 
pd.to_numeric(df)
df = df.astype(str)

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
