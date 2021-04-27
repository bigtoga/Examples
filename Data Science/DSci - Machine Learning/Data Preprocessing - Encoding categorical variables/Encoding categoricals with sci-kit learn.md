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
   1. aka ‘one-of-K’ or ‘dummy’ encoding scheme

# Ordinal features
To convert categorical features to such integer codes, we can use the `OrdinalEncoder` ([documentation](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html)) to perform label encoding. This estimator transforms each categorical feature to one new feature of integers (0 to n_categories - 1)


# Nominal features
Have to choose between label encoding or one-hot encoding. 
- May have to experiment w both to accurately identify which method is best
- Label encoding is generally used when there are a large number of classes for a Feature
- One-hot encoding is best when a feature has single digit number of classes

## Label encoding nominal features
Use sci-kit learn’s `LabelEncoder` ([documentation](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html))

```python   
le = preprocessing.LabelEncoder()
le.fit([“paris”, “paris”, “tokyo”, “amsterdam”])

list(le.classes_) # [‘amsterdam’, ‘paris’, ‘tokyo’]

le.transform([“tokyo”, “tokyo”, “paris”]) # array([2, 2, 1]...)

list(le.inverse_transform([2, 2, 1])) # [‘tokyo’, ‘tokyo’, ‘paris’]
``` 

## One-hot encoding for nominal features
Use sci-kit learn’s `OneHotEncoder` ([documentation](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html))
> This creates a binary column for each category and returns a sparse matrix or dense array (depending on the sparse parameter)

Note - if your y label is categorical, use sci-kit learn’s `LabelBinarizer`

```python   
enc = OneHotEncoder(handle_unknown=‘ignore’)

# OneHotEncoder(drop=‘first’).fit(X)

X = [[‘Male’, 1], [‘Female’, 3], [‘Female’, 2]]

enc.fit(X)

enc.categories_ # [array([‘Female’, ‘Male’], dtype=object), array([1, 2, 3], dtype=object)]

enc.transform([[‘Female’, 1], [‘Male’, 4]]).toarray()

# array([[1., 0., 1., 0., 0.],
#        [0., 1., 0., 0., 0.]])

enc.inverse_transform([[0, 1, 1, 0, 0], [0, 0, 0, 1, 0]])
# array([[‘Male’, 1],
#       [None, 2]], dtype=object)

enc.get_feature_names([‘gender’, ‘group’])
# array([‘gender_Female’, ‘gender_Male’, ‘group_1’, ‘group_2’, ‘group_3’],
  dtype=object)
``` 


Pandas get_dummies() is also able to do this

