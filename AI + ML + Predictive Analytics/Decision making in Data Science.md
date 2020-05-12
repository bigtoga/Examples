https://www.kaggle.com/scottwhigham/league-of-legends-win-prediction-using-pycaret/edit

1. Load data
2. Review types, columns
3. Split into categorical, numerical
```python
#Dividing features into numerical and categorical features
categorical=[]
numerical=[]
for col in list(data):
    if(len(data[col].unique())<=30):
        categorical.append(col)
    else:
        numerical.append(col)
```

``` mermaid
graph TD;
  q1{Is most of the data categorical?}
  q1-->q1Yes;
  q1-->q1No;
  B-->D;
  C-->D;
```

If the majority of the features in the data are categorical and the target feature is categorical, we can use Chi-Square test for to get the feature importance.
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
