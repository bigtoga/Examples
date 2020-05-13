https://www.kaggle.com/scottwhigham/league-of-legends-win-prediction-using-pycaret/edit

1. Load data
2. Review types, columns
3. Identify the `target` - the column you want to predict based on the other features
3. Split into categorical, numerical
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
5. Define which of the categorical features are "important"
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
