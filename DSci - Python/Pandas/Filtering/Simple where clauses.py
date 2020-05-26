# Single column
df[df["type"] == "Confirmed"]

# Multiple filters

dfOptimized = dfOptimized[(dfOptimized['origYear'] == 2011) | (dfOptimized['origYear'] == 2012)]
dfOptimized.head()
