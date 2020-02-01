### Import dependencies
~~~
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import requests

# Import statistic library
import scipy.stats as stats
import scipy.stats as stats
from scipy.stats import linregress

# Import seaborn library to create figure
import seaborn as sns

import pprint
import json
from time import sleep
from datetime import date
import zipfile
~~~
### Load the dataset
~~~
csvpath = os.path.join("..", "source_data", "detail_listings.zip")
zf = zipfile.ZipFile(csvpath);
df = pd.read_csv(zf.open('detail_listings.csv'), low_memory=False)
~~~
### Metadata about the data (rows, columns, data types, etc)
~~~
df.info() # Columns, metadata, memory usage

df.isnull().values.any()
df.hist()
df.describe()
df.describe(include='all') # entire dataframe
df['Price'].describe() # one column only

stats_float = df['Price'].describe()
stats_numeric = df['Price'].describe().astype (int)

# Number of rows and columns
df.shape
~~~
### Start looking at the data itself 
~~~
df.head()
df.tail()

df.sort_values(by="column_name", ascending = True)

df = df.rename
~~~
### Look at statistical summary of the data
~~~
df['DataFrame Column'].quantile(q=0.50)
df['DataFrame Column'].quartile(q=0.50)

df.plot(figsize=(18,d5))

# Group data by seasons and summarize precip 
# "Group by 'seasons' and calculate the basic aggregates against 'precip' column"
df.groupby(["seasons"])[["precip"]].describe()
~~~
|   	|precip   	|   	|   	|   	|   	|   	|   	|   	|
|---	|---	|---	|---	|---	|---	|---	|---	|---	|
|1   	|1   	|1   	|1   	|1   	|1   	|1   	|1   	|1   	|1
|month  |count  |mean   |std   	|min   	|max   	|25%   	|50%   	|75%
|Jan   	|17.04 	|58  	|7.15  	| 1 	| 857  	| 14.56  | 23.85 	|256.34
|Feb   	|23.84	|48  	|5.43 	| 545 	| 454  	| 14.56  | 23.85 	|256.34
|...   	|   	|   	|   	|   	|   	|   	|   	|   	|
|Dec   	|67.34  |45 	|23.43 	|123	| 3454 	|314.56  | 23.85 	|256.34

| |precip| | | | | | | | 
|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- 
|month  |count  |mean   |std   	|min   	|max   	|25%   	|50%   	|75%
|Jan   	|17.04 	|58  	|7.15  	| 1 	| 857  	| 14.56  | 23.85 	|256.34
|Feb   	|23.84	|48  	|5.43 	| 545 	| 454  	| 14.56  | 23.85 	|256.34
|...   	|   	|   	|   	|   	|   	|   	|   	|   	|
|Dec   	|67.34  |45 	|23.43 	|123	| 3454 	|314.56  | 23.85 	|256.34


### Print a diagonal correlation matrix with seaborn
~~~
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

# Create data frame correlation
corr = df.corr()

# Generate a mask for the upper triangle
mask = np.triu(np.ones_like(corr, dtype=np.bool))

# Set up the matplotlib figure
f, ax = plt.subplots(figsize=(11, 9))

# Generate a custom diverging colormap
#cmap = sns.diverging_palette(220, 10, as_cmap=True)
cmap='coolwarm'

# Labels
ax.set_title('Diagonal Correlation Matrix Using Seaborn')

# Draw the heatmap with the mask and correct aspect ratio
sns.heatmap(
    corr, 
    mask=mask, 
    cmap=cmap, 
    vmax=.3, 
    center=0,
    square=True, 
    linewidths=.5, 
    cbar_kws={"shrink": .5}
) #.get_figure().savefig('correlation_matrix.png') # to save to a file

plt.show()

~~~

~~~
# Drop all data outside 3 standard deviations from the mean:
from scipy import stats
std_dev = 3
df = df[(np.abs(stats.zscore(df)) < float(std_dev)).all(axis=1)]
df.plot(figsize=(18,5))

# Can you validate a linear relationship?
plt.scatter(df[‘OAT (F)’], df[‘Power (kW)’])

~~~
# Look at the column relationships - find the hot red and cold blue:
~~~
import seaborn as sns
# https://seaborn.pydata.org/examples/many_pairwise_correlations.html
corr = df.corr()

# Generate a mask for the upper triangle
mask = np.triu(np.ones_like(corr, dtype=np.bool))

# Set up the matplotlib figure
f, ax = plt.subplots(figsize=(11, 9))

# Generate a custom diverging colormap
cmap = sns.diverging_palette(220, 10, as_cmap=True)

# Draw the heatmap with the mask and correct aspect ratio
sns.heatmap(
    corr, 
    mask=mask, 
    cmap=cmap, 
    vmax=.3, 
    center=0,
    square=True, 
    linewidths=.5, 
    cbar_kws={"shrink": .5}
)
~~~~
# Find the pairwise relationships in a dataset
~~~
iris = sns.load_dataset("iris")
sns.pairplot(iris);
~~~
