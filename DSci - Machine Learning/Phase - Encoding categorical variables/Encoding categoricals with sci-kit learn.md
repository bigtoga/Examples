http://scikit-learn.org/stable/modules/preprocessing.html

# Dealing with Categorical features
Categorical Features have `classes`, the values in the column. 
- A `gender` Feature has two classes: `male`, `female`
- A `state` Feature has 50 classes: AK, AL, AR, etc

Two options:
1. Label encoding
   1. create a dict of numbers that map to the categorical values
   1. Add these to the dataset
   1. Remove the original categorical values from the dataset 
   1. Add them back on output
   
1. One-Hot Encoding
   1. Create a new column for each feature value (called a `class`)
   1. Populate the column with 0 for all except the correct class
   1. Delete the first created column

# Ordinal features
To convert categorical features to such integer codes, we can use the `OrdinalEncoder` ([documentation](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html)) to perform label encoding. This estimator transforms each categorical feature to one new feature of integers (0 to n_categories - 1)


# Nominal features
Have to choose between label encoding or one-hot encoding. 
- May have to experiment w both to accurately identify which method is best
- Label encoding is generally used when there are a large number of classes for a Feature
- One-hot encoding is best when a feature has single digit number of classes