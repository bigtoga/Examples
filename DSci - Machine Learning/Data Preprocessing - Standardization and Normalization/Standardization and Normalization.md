For all numeric features, we will *standardize* **or** *normalize* each feature using a set of *transforms*. 
- Normalization: scaling a dataset so that its minimum is 0 and its maximum 1. The goal is to generate a *normalized distribution* (a.k.a. a Gaussian bell curve distribution)
- Standardization: center the data around 0 and to scale the Data so that all data points are within one standard deviation
- [scikit-learn documentation](http://scikit-learn.org/stable/modules/classes.html)
- Python script to [compare each individual scaling/centering options in sklearn](http://scikit-learn.org/stable/auto_examples/preprocessing/plot_all_scaling.html) to see how each deals with outliers in the [California housing dataset](https://www.dcc.fc.up.pt/~ltorgo/Regression/cal_housing.html)

The goal of the above is to **center** the dataset around “0” as well as **scale** the data so that all data features use the same range of data. This is especially important for models such as K Nearest Neighbors (knn) that use “distance between data points in a feature” as their primary method of determining whether a given feature is important in predicting a target variable. 
- **Centering** works by subtracting the mean of the variable from each data point so that the new variable’s mean is 0
- **Scaling** works by multiplying each data point by a constant in order to alter the range of the data
- If one feature has a range of 100,000 - 100,000,000 while another feature has a range of 1 to 10, KNN would see “the feature with the most variance” as more important in predicting the outcome
- If a feature has a variance that is orders of magnitude larger that others, it might dominate the *objective function of the learning algorithm* and make the estimator unable to learn from other features correctly as expected
- Standardization/normalization both scale the feature’s data points such that all features use the same numeric range 
- A [spider chart / radar chart](https://plotly.com/python/radar-chart/) is a good visual explanation - standardizing or normalizing the data simply gets all features into “the same scale” such that you could create a spider chart with each and have a single x axis of each using a “0 to 5” scale. Using this newly plotted scale would show you in one chart the distribution of the entire dataset

Many other models expect/assume that (a) all features are centered around 0, and (b) all have variance in the same order. Other learning algorithms include 
RBF kernel of Support Vector Machines and the L1 and L2 regularizers of linear regression. 
- metric-based and gradient-based estimators often assume approximately standardized data (centered features with unit variances)
- A notable exception are decision tree-based estimators that are robust to arbitrary scaling of the data

# Why scale the data?
The two main reasons for scaling your data are:
1.  Your predictor variables may have significantly different ranges and, in certain situations, such as when implementing k-NN, this needs to be mitigated so that certain features do not dominate the algorithm
2. You want your features to be unit-independent, that is, not reliant on the scale of the measurement involved: for example, you could have a measured feature expressed in `feet` and I could have the same feature expressed in `inches`. If we both scale our respective features, both  will be seen as identical by the algorithm: they will have the exact same values and variance 

[The UCI Wine dataset](http://archive.ics.uci.edu/ml/datasets/Wine+Quality) is a nice, labeled set of data that we can use for supervised machine learning:
```python   
import pandas as pd
%matplotlib inline
import matplotlib.pyplot as plt
plt.style.use(‘ggplot’)

# Import the wine dataset
df = pd.read_csv(‘http://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv ‘ , sep = ‘;’)

# drop target variable
X = df.drop(‘quality’ , 1).values 
y = df[‘quality’].values
pd.DataFrame.hist(df, figsize = [15,15]);
 
# Forget it - todo copy/paste bottom example from here: https://www.datacamp.com/community/tutorials/preprocessing-in-data-science-part-1-centering-scaling-and-knn
``` 
Formula for normalization:
![?](https://i.imgur.com/6ZUSzyR_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Let’s notice the range of the predictor variables: 
- ‘free sulfur dioxide’ ranges from 0 to ~70
- ‘volatile acidity’ from ~0 to ~1.2

More specifically, the former has a range 2 orders of magnitude larger than that of the latter. Any algorithm, such as K nearest neighbors (kNN), which cares about the *distance between data points*, may thus focus unfairly on variables with a larger range, such as ‘free sulfur dioxide’, even if this feature/variable is not predictive. To prevent this problem, we use **scaling**. 




