Just a “you can also do feature engineering and both label encoding and one-hot encoding by hand” example using python dictionaries 
```python   
# Create dicts for your classes:
gender_dict = {‘F’:0, ‘M’:1}
age_dict = {‘0-17’:0, ‘18-25’:1, ‘26-35’:2, ‘36-45’:3, ‘46-50’:4, ‘51-55’:5, ‘55+’:6}
city_dict = {‘A’:0, ‘B’:1, ‘C’:2}
stay_dict = {‘0’:0, ‘1’:1, ‘2’:2, ‘3’:3, ‘4+’:4}
 
# Replace source data w new class data
train[“Gender”] = train[“Gender”].apply(lambda x: gender_dict[x])
test[“Gender”] = test[“Gender”].apply(lambda x: gender_dict[x])
 
train[“Age”] = train[“Age”].apply(lambda x: age_dict[x])
test[“Age”] = test[“Age”].apply(lambda x: age_dict[x])
 
train[“City_Category”] = train[“City_Category”].apply(lambda x: city_dict[x])
test[“City_Category”] = test[“City_Category”].apply(lambda x: city_dict[x])
 
train[“Stay_In_Current_City_Years”] = train[“Stay_In_Current_City_Years”].apply(lambda x: stay_dict[x])
test[“Stay_In_Current_City_Years”] = test[“Stay_In_Current_City_Years”].apply(lambda x: stay_dict[x])

# Opt for automation for features w more than xyz classes:
from sklearn.preprocessing import LabelEncoder
columns_list = [“User_ID”, “Product_ID”]
for var in columns_list:
   lb = LabelEncoder()
   
   full_var_data = pd.concat((train[var], test[var]), axis=0).astype(‘str’)
   
   temp = lb.fit_transform(np.array(full_var_data))
   
   list(lb.classes_)
   
   train[var] = lb.transform(np.array(train[var] ).astype(‘str’))
   
   test[var] = lb.transform(np.array(test[var] ).astype(‘str’))

```
