temp = temp.drop(columns = ["Number", "Nickname"])

df = df.drop(df.columns[[0, 1, 2, 4, 5]], axis=1)
