~~~
df.head()
df.tail()

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

df['DataFrame Column'].quantile(q=0.50)
df['DataFrame Column'].quartile(q=0.50)

df.plot(figsize=(18,d5))

df.sort_values(by="column_name", ascending = True)

# Group data by seasons and summarize precip 
# "Group by 'seasons' and calculate the basic aggregates against 'precip' column"
df.groupby(["seasons"])[["precip"]].describe()

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
