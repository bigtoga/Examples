# Single column using name
df.rename(columns = {'colA':'MyColumn'}, inplace = True) 

# Single column using positional reference

df.rename(columns = {[0]:'MyColumn'}, inplace = True) 

# Multiple columns using name
df.rename(columns = {'colA':'MyColumn'}, inplace = True) 

# Multiple columns using position

# Manual
df.columns = ["Col1", "Col2", "Col3"];
