# distinct 

# Return the unique values found in different columns as one series
df = pd.DataFrame({
    'Col1': ['Bob', 'Joe', 'Bill', 'Mary', 'Joe']
    , 'Col2': ['Joe', 'Steve', 'Bob', 'Bob', 'Steve']
    , 'Col3': np.random.random(5)}
)

pd.unique(df[['Col1', 'Col2']].values.ravel('K'))


##############################################################
# This might also work:
pd.concat([df['Col1'], df['Col2']]).unique()

##############################################################
set(df.Col1).union(set(df.Col2))

##############################################################
np.unique(df[['col1', 'col2']], axis=0)
