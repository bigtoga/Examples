Regression doesn't know what to do with categorical data. To convert that to a numeric, use pd.get_dummies()

df2 = pd.get_dummies(df) generates binary encoded data from a Dataframe (aka 1s or 0s)
* It is smart enough to only detect the categorical columns 
![x](https://i.imgur.com/4kXVRPi.png)

data_binary_encoded = pd.get_dummies(data, columns=["gender"])
data_binary_encoded.head()

