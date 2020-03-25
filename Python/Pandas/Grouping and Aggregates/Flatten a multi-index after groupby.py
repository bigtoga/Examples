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
