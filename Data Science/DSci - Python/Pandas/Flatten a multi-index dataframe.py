dfCombined = pd.merge(
    dfTreasury
    , df30yrFRM
    , on="Date"
    , how="left" # Treasury data goes back to 1961 but 30yr only 1971
    , suffixes=('_Treas', '_30yr')
)

dfCombined = dfCombined.drop(columns=['source'], axis=1)
dfCombined.columns = ['TreasuryYieldRate', '30yrFRMAvg']
dfCombined = dfCombined.reset_index(level=['Date'])
dfCombined.tail(250)
