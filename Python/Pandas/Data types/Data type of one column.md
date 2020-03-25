https://stackoverflow.com/questions/15891038/change-data-type-of-columns-in-pandas

~~~
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

is_string_dtype(df['price'])
is_numeric_dtype(df['price'])
df["price"]

df['Date']= pd.to_datetime(df['Date']) 

# By default, pandas smart determines what the numeric data type should be (float or int)
# This will become a float:
gbAggs['ConfirmedCases'] = pd.to_numeric(gbAggs['ConfirmedCases'])

# If you want to make it an int, use:
gbAggs['ConfirmedCases'] = pd.to_numeric(gbAggs['ConfirmedCases'], downcast='integer')
~~~~
