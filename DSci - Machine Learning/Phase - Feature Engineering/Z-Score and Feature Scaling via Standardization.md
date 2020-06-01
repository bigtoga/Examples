[Feature selection with sklearn](https://scikit-learn.org/stable/modules/feature_selection.html) -> [Importance of Feature Scaling](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html) -> [StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html#sklearn.preprocessing.StandardScaler) -> Centering and Scaling

**Standardization** involves rescaling the features such that they have the properties of a standard normal distribution with a mean of zero and a standard deviation of one.

Certain algorithms require standardized data:
- KNN
- Logistic Regression 
- SVM
- PCA

# PCA and Standardization 
When we use PCA, we are interested in finding the “components that maximize the variance”. 

Example: given a dataset of human height (feet), weight (pounds), and age (years), predict diabetes onset age. 
- Without standardization, PCA would seek out the combinations of data that result in the largest variance 
- An increase of “1” for weight would be treated the same as an increase of “1” for age and a “1” for height
- There will be more changes in weight than age and height in the dataset which will lead PCA to overly rely on weight as its dominant “max variance” feature
- In other words, a change in "age" or "height" of +1 has far more impact on predicting onset of diabetes than a +1 on "weight"
- Standardization helps even out this problem

The UCI Wine dataset has two features, "alcohol content" and "malic acid". If left unscaled, the "malic acid" feature looks to have the most variance and would be favored heavily by PCA. However, if you run the dataset through sklearn's `StandardScaler`, 
StandardScaler will center and scale both features to create a common "standardized" way of looking at the data. Example:

![V](https://i.imgur.com/roPbp8a.png)
Source: https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html

## The effects of standardization
For the UCI Wine dataset example, the prediction accuracy for the "normal" test dataset with PCA was 81.48% but rose to 98.15% for the standardized test dataset.

