[Best answer I've seen](https://stackoverflow.com/questions/15891038/change-data-type-of-columns-in-pandas)

### Convert all columns of DataFrame
Multiple options: 

df = df.apply(pd.to_numeric) 

pd.to_numeric(df)



### Convert specific columns:
Multiple options:

df[["a", "b"]] = df[["a", "b"]].apply(pd.to_numeric)

df["a"] = pd.to_numeric(df["a"])

df = df.astype({"a": int, "b": complex})

df = s.astype(str)

