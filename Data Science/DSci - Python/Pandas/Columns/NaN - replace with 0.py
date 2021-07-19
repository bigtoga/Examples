
dfChild = dfTemp[(dfTemp["Work Item Type"] == "Task")]
dfChild = dfChild.drop(columns = ["Title 1", "State", "Work Item Type", "Tags"])
dfChild.rename(columns = {'Title 2':'Task'}, inplace = True)
dfChild["Effort"] = dfChild["Effort"].fillna(0)
