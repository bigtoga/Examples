sklearn has a great page that shows different techniques - 
http://scikit-learn.org/stable/modules/outlier_detection.html

![?](https://i.imgur.com/LiWHrgd_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Impact of a single outlier on linear regression graphic from [here](https://link.medium.com/FPjMFAlEE7)

![?](https://i.imgur.com/4ItbWVG_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Now the regression line will have accuracy issues for future unseen data. 

# Distance-based outlier defection techniques 
Note that all `k` based supervised learners suffer from same problems: 
- if anomaly is larger or same size as ``k, forget it...
- In high dimensionality space, every data point is equi-distant from the other data points making distance-based groupings hard or impossible 

- k-means clustering
- ORCA
- LOF (Local Outlier Factor)
   - Performance: High computational complexity
- RF
   - Performance: High memory usage
- hdbscan clustering 
   - Docs: https://hdbscan.readthedocs.io/en/latest/

# Other detection algorithms 
- Consistent Data Selection
   - Paper: https://arxiv.org/pdf/1712.04129.pdf
   - Debuted: 2018
- Isolation Forest (iForest)
   - Performance: computational complexity and low memory 
   - When to use: unsupervised ML
   - Unique characteristics: since you don’t pass in `k`, it can handle datasets with larger than normal anomalies 
   - sklearn: http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html
- angle-based outlier detection (ABOD)
   - Useful in high dimensionality
- Lowest Correlation Integral (LOCI)
   - When to use: looking for outliers within your outliers
   
# How to compare
1. AUC and processing time
1. How quickly AUC converges 
1. Whether the model “works” when the training data has no anomalies but the test data does

# Old school statistical tests for outliers
Most of these are no longer used but you will see references to them from time to time. Some common problems with the below would be things like they are meant to uncover only a single anomaly per test, or they were meant to handle only a 1-dimensional space, or that they assume a normal or near normal distribution 
- Dixon Q-test
- Bartlett test 
- Grubb’s test