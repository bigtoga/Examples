~~~
df.isnull().values.any()
df.hist()
df.plot(figsize=(18,5))

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

