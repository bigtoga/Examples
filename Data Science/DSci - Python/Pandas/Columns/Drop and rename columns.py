temp = temp.drop(columns = ["Number", "Nickname"])

df = df.drop(df.columns[[0, 1, 2, 4, 5]], axis=1)

# *Note: If you don’t find what you need here, check out the pandas cookbook
# https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html

dfChild = dfTemp[(dfTemp["Work Item Type"] == "Task")]
dfChild = dfChild.drop(columns = ["Title 1", "State", "Work Item Type", "Tags"])
dfChild.rename(columns = {'Title 2':'Task'}, inplace = True)
