temp = temp.drop(columns = ["Number", "Nickname"])

df = df.drop(df.columns[[0, 1, 2, 4, 5]], axis=1)

# *Note: If you don’t find what you need here, check out the pandas cookbook
# https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html

# Rename by name:
dfChild.rename(columns = {'Title 2':'Task'}, inplace = True)

# Rename by index: 
dfChild.rename(columns = {0:"Tag", 1:"Tags"}, inplace = True)
