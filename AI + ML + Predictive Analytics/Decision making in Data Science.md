https://www.kaggle.com/scottwhigham/league-of-legends-win-prediction-using-pycaret/edit

## Step 1. Load data
## Step 2: Review types, columns
## Step 3: Identify the `target` - the column you want to predict based on the other features
## Step 4: Split the data into categorical, numerical
```python
# Dividing features into numerical and categorical features
categorical=[]
numerical=[]
for col in list(data):
    if(len(data[col].unique())<=30):
        categorical.append(col)
    else:
        numerical.append(col)
```
## Step 5: Define which of the categorical features are "important"
``` mermaid
graph TD;
  q1{Is most of the data categorical?}
  q1-->q1Yes(Yes);
  q1Yes-->q2{Is your target feature also categorical?}
  q2-->q2Yes(Yes)
  q2-->q2No(No)
  q2Yes-->q2Done[Use a chi-square test]
  q2No-->q2NoDone[TBD]
```

If the majority of the features in the data are categorical and the target feature is categorical, we can use Chi-Square test for to get the feature importance.
* Categorical features are < 30 values in entire column
* p values <= 0.05 are "important"
```python
def Chi_square(col_1,col_2):
    X=data[col_1].astype('str')
    Y=data[col_2].astype('str')
    observed_values=pd.crosstab(Y,X)
    chi2, p, dof, expected = ss.chi2_contingency(observed_values)
    if(p>0.05):
        print(col_1," is not required")
    else:
        print(col_1," is required")
        
for col in categorical:
    Chi_square(col,"blueWins")
```

## Step 6: Use Backward Elimination for Numerical Features
**Backward Elimination** is going to just return a list of the best feautures to use with no other info
```python
X=data[numerical]
y=le.fit_transform(data["blueWins"])

import statsmodels.api as sm
cols = list(X.columns)
pmax = 1
while (pmax>0.05):
    p=[]
    X_1 = X[cols]
    X_1 = sm.add_constant(X_1)
    model = sm.OLS(y,X_1).fit()
    p = pd.Series(model.pvalues.values[1:],index = cols)      
    pmax = max(p)
    feature_with_p_max = p.idxmax()
    if(pmax>0.05):
        cols.remove(feature_with_p_max)
    else:
        breakselected_features_BE = cols
print("Best features using Backward Elimination: ",cols)
```
## Step 7: Try Random forests - different/better results?
Random Forest is considered to be one of the most unbiased model. As it creates multiple Decision Trees taking into account Random Features for each Decision Tree. Because of this randomness the Random Forest Classifier considerd to be giving most unbiased Feature Importance

Random forest classifier will return details about each feature, enough to plot
```python
X_rfc=data.drop(["blueWins"],1)
y_rfc=data["blueWins"]

rfc=RandomForestClassifier(criterion='entropy',random_state=0,n_estimators=300)
rfc.fit(X_rfc,y_rfc)

plt.figure(figsize=(10,10))
plt.barh(list(X_rfc),rfc.feature_importances_)
plt.title("Feature Imporatance using Random Forest Classifier")
plt.ylabel("Features")
plt.xlabel('Feature Importance Value')
```
