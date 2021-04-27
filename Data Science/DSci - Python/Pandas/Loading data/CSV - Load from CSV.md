Multiple options

~~~
import os
import pandas as pd

csvpath = os.path.join("..", "source_data", "detail_listings.zip")
df = pd.read_csv(csvpath, low_memory=False)
~~~

~~~
import pandas as pd
import dateutil

# Load data from csv file
data = pd.read_csv('phone_data.csv')

# Convert date from string to date times
data['date'] = data['date'].apply(dateutil.parser.parse, dayfirst=True)

# How many rows the dataset
data['item'].count()
Out[38]: 830

# What was the longest phone call / data entry?
data['duration'].max()
Out[39]: 10528.0

# How many seconds of phone calls are recorded in total?
data['duration'][data['item'] == 'call'].sum()
Out[40]: 92321.0

# How many entries are there for each month?
data['month'].value_counts()
Out[41]: 
2014-11    230
2015-01    205
2014-12    157
2015-02    137
2015-03    101
dtype: int64

# Number of non-null unique network entries
data['network'].nunique()
Out[42]: 9
~~~
