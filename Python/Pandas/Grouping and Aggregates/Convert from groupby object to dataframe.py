# Creates a groupby object
gbAggs = df_clean.groupby(['Country/Region', 'Date']).agg({
        'Confirmed': [
            np.sum
        ]
})

# Option 1: Convert from groupby object to dataframe:
gbAggs = gbAggs.reset_index(level=['Country/Region', 'Date'])
type(gbAggs); # dataframe

# Option 2: Use lambdas
dfAggs = gbAggs.apply(lambda _df: _df.sort_values(by=['Country/Region', 'Date']))
type(dfAggs); # dataframe
