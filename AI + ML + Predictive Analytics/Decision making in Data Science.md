https://www.kaggle.com/scottwhigham/league-of-legends-win-prediction-using-pycaret/edit

1. Load data
2. Review types, columns
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

``` mermaid
graph TD;
  q1{Is most of the data categorical?}
  q1-->q1Yes(Yes);
  q1Yes-->q2{Is your target feature also categorical?}
  q2-->q2Yes(Yes)
  q2-->q2No(No)
  q2Yes-->q2Done[Use a chi-square test to find features of importance. Features w a chi-square score < 0.5 are important]
  q2Done-->q3{Did you eliminate enough features?}
  q3-->q3Yes[Yes]
  q3-->q3No[No, I need to eliminate more!]
  q1-->q1No(No);
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
