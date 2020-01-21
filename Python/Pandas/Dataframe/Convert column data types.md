
### Convert all columns of DataFrame
Multiple options: 

df = df.apply(pd.to_numeric) 

pd.to_numeric(df)

### Convert specific columns:
Multiple options:

df[["a", "b"]] = df[["a", "b"]].apply(pd.to_numeric)

df["a"] = pd.to_numeric(df["a"])
