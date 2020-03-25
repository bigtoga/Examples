~~~
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

is_string_dtype(df['price'])
is_numeric_dtype(df['price'])
df["price"]

df['Date']= pd.to_datetime(df['Date']) 

~~~~
