# Multiple ways to do this

# GroupBy object:
gbAggs = df_clean.groupby(['Country/Region', 'Date']).agg({
        'Confirmed': [
            np.sum
        ]
})

# 1. Convert from groupby object to dataframe:
gbAggs = gbAggs.reset_index(level=['Country/Region', 'Date'])

# 2. Flatten the index by renaming the columns (not setting the index)
gbAggs.columns = ["Country", "Date", "ConfirmedCases"];

# Now you have a single index dataframe
gbAggs.head()

########################################################
# Pandas also has .get_level_values() to allow you to address/get a specific axis' values
# https://riptutorial.com/pandas/example/13285/select-from-multiindex-by-level
df = pd.DataFrame(np.random.randn(6, 3), columns=['A', 'B', 'C'])
df.set_index(['A', 'B'], inplace=True)

# Can get by column name
df.index.get_level_values('A')

# or by index level
df.index.get_level_values(level=0)

# And even fancier
df.loc[(df.index.get_level_values('A') > 0.5) & (df.index.get_level_values('A') < 2.1)]

# To extract a specific value you can use xs (cross-section)
df.xs(key=0.9027639999999999)

df.xs(key=0.9027639999999999, drop_level=False)
