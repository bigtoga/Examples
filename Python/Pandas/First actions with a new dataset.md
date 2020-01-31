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
