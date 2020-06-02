System of Engagement -> ETL -> ROLAP -> Data Warehouse -> OLAP Dim Fact -> **Data Preprocessing** -> Model Training and Validation -> Model Deploy -> Model Automation

http://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html
[Feature selection with sklearn](https://scikit-learn.org/stable/modules/feature_selection.html) -> [Importance of Feature Scaling](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html) -> multiple scalers are available to perform centering and scaling:
- [StandardScaler is the most commonly used](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html#sklearn.preprocessing.StandardScaler) 
- [Excellent walkthrough of every scaler sklearn offers](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_all_scaling.html#sphx-glr-auto-examples-preprocessing-plot-all-scaling-py)

**Standardization** involves rescaling the features such that they have the properties of a standard normal distribution with a mean of zero and a standard deviation of one.

Certain algorithms require standardized data (b/c they assume all features are centered around 0 and have variance in the same order):
- KNN
- Logistic Regression 
- SVM
- SVM RBF (kernel)
- Linear regression L1 and L2
- PCA

# PCA and Standardization 
When we use PCA, we are interested in finding the “components that maximize the variance”. If a feature has a variance that is orders of magnitude larger that others, it might dominate the objective function and make the estimator unable to learn from other features correctly as expected.

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

# StandardScaler
sklearn's way of applying automatic standardization to a dataset. **Centering** and **scaling** happen independently on each feature by computing the relevant statistics on the samples in the training set. Mean and standard deviation are then stored to be used on later data using transform.
If a feature has a variance that is orders of magnitude larger that others, it might dominate the objective function and make the estimator unable to learn from other features correctly as expected.
