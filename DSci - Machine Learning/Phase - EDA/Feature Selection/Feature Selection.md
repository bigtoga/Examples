# Feature Selection 
Central idea: your data likely contains one or more features that are either:
- Has low variance
- Irrelevant to the prediction you are aiming for
- Partially relevant
- Redundant
   - Note that if you have two independent features that are **strongly correlated**, you should investigate whether one can be dropped as redundant
   
## Background needed
* Columns are variables a.k.a. features
* Two categories of variable datatypes: 
   - Numeric: integer, decimal
   - Categorical: boolean (dichotomous), ordinal (ranking), nominal (named)
* **Input variables** are the features (a.k.a. independent variables or columns)
* **Output variable** is what you are  trying to predict (a.k.a. dependent variable or response or target)
* If your output variable (i.e. what you want to predict) is numeric, use regression
* If your output variable is categorical, use classification
   
# When do I perform feature selection?
- Step 1: Dimensionality reduction
- Step 2: Feature selection
- Step 3: Feature importance
   
**Feature selection is an alternate to dimensionality reduction** - they are different
- Feature selection decides what to keep or remove
- dimensionality reduction creates a 'projection' of the data (new dataframe) containing new/munged features
- Dimensionality reduction comes before feature selection 
   
## Why do we go through feature selection?
1. To simplify models to make them easier to interpret (by developers, researchers, and users)
1. To decrease the costs of training (compute, time)
1. to avoid the curse of dimensionality
1. enhanced generalization by reducing overfitting a.k.a.reduction of variance
1. to gain deep understanding of the data and its repationships, context

# When to use
Perform Feature Selection before test/train to:
1. Decrease cost of test/train (compute/time)
1. Increase accuracy by removing potentially misleading data
1. Reduce overfitting - less redundant data means fewer chances for the machine to make decisions based on noise

**Suggest you stop here and use Jason’s flowcharts - https://machinelearningmastery.com/feature-selection-with-real-and-categorical-data/**
![x](https://i.imgur.com/BqfMDjM_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Key Concept: Which of the four possible options are you solving for?
## Option 1: Numeric input variable, numeric output variable
This is a regression problem 
* Use Pearson’s correlation coefficient for **linear** relationships 
* Use Spearman’s rank coefficient for nonlinear 

## Option 2: Numeric input variable, Categorical output variable
Classification problem. Probably most common type we do
* Use ANOVA correlation coefficient (linear)
* Use Kendall’s rank coefficient (nonlinear)
   - Note that Kendall assumes the categorical variable is *ordinal*

## Option 3: Categorical input variable, Numeric output variable
doubt you will see these as they are rare. This is a regression problem. Note that the use cases below are the opposite of Option 2!
* Use ANOVA correlation coefficient (nonlinear)
* Use Kendall’s rank coefficient (linear)

## Option 4: Categorical input  variable, Categorical output variable
Classification problem 
* most common correlation measure for categorical data is the **chi-squared test** (contingency tables)
* Alternative is **mutual information** (information gain) from the field of information theory
   - It is possible that “mutual information” may prove useful for both categorical and numeric

# Supervised Learning Feature Selection
Feature selection for Supervised learning compares the features to the target variable in order to identify and **remove irrelevant data**
Three types:
- **Wrapper** feature selection searches for well performing subsets of features using RFE
- **Filtered** feature selection methods use statistical models (such as Pearnson's coefficient) to score the correlation or dependence between input variables that can be filtered to choose the most relevant features
   - Univariate and low variance happens here
   - Feature Importance methods can also be performed here
- **Intrinsic** feature selection is when the model has built-in feature selection (and the data scientist does not have to do this)
   - Regession models that penalize low variance automatically: Lasso, all tree-based models (decision trees, ensembles of decision trees such as random forest)

# Unsupervised learning feature selection
Feature selection for unsupervised learning only looks at the features and attempts to **remove redundant data** using correlation

# Steps in feature selection process
First off, don't even attenpt this "by hand". There are better ways - use automatic feature selection tools like:
1 scikit-learn's [feature selection class](http://scikit-learn.org/stable/modules/classes.html)
   - `SelectKBest` for Univariate feature selection - sorts the features using a function (`chi2` for regression problems, `f_classif` for classification problems) by feature score (aka ANOVA F value, F1, F-score, F-test) and returns the **k** best (like TOP in SQL)
   
## Step 1: Remove features with low variance using scikit-learn's [VarianceThreshold](http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.VarianceThreshold.html)
* Only looks at features (X), not the desired outputs (y) (which makes it also useful for unsupervised machine learning)
* Automatically removes zero-variance features (those that have exact same data as another feature)
* default is to keep all features with non-zero variance
* Allows you to set a threshold of variance that must be met 
   - Low-variance features are generally noise to models

```python   
import sklearn.feature_selection

X = [[0, 2, 0, 3], [0, 1, 4, 3], [0, 1, 1, 3]]
selector = VarianceThreshold()
``` 
```shell 
array([[2, 0],
       [1, 4],
       [1, 1]])
``` 
VarianceThreshold() auto removed column[0] and column[3] because they had zero variance

   
## How to decide which type of feature selection to use?
- I want to know which single columns can be removed because of low variance
   - VarianceThreshold() and Univariate
   
- I want to know which columns can be removed as irrelevant or partially irrelevant
   - Univariate
   
- I want to know which columns might be redundant because of a strong correlation with another column
   - Multivariate
   

# Types of Feature Selection
## Univariate feature selection
Compares each feature with the response (dependent) variable and calvulates a `p-value` ([Pearson's Correlation coefficient](http://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient)) for each feature. 
- `p-value` is in the range of -1 to +1 
   - -1 means "perfect negative correlation" which means as the independent feature moves, the dependent feature moves in the exact opposite linearly
   - +1 means "perfect positive correlation" which means the dependent variable moves exactpy with the independent variable
   - 0 means no relationship
- Remember that coefficient only correlates linear relationships and ignores non-linear

# Resources
* [How to choose a feature selection method](https://machinelearningmastery.com/feature-selection-with-real-and-categorical-data/)
[scikit-learn](http://scikit-learn.org/stable/modules/feature_selection.html)
* [DataDive - Univariate](https://blog.datadive.net/selecting-good-features-part-i-univariate-selection/)
* [Wikipedia](https://en.wikipedia.org/wiki/Feature_selection)
