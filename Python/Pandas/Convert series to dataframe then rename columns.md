# x is a series
df = pd.DataFrame(x).reset_index()
df.columns = ['Drug Regimen', 'Data Points']
df
