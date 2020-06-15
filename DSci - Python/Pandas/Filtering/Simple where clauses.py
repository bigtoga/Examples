# https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html

# Single column
df[df["type"] == "Confirmed"]

# Multiple filters

dfOptimized = dfOptimized[(dfOptimized['origYear'] == 2011) | (dfOptimized['origYear'] == 2012)].copy()
dfOptimized.head()
