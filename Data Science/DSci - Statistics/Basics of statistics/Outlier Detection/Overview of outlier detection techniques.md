sklearn has a great page that shows different techniques - 
http://scikit-learn.org/stable/modules/outlier_detection.html

![?](https://i.imgur.com/LiWHrgd_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Impact of a single outlier on linear regression graphic from [here](https://link.medium.com/FPjMFAlEE7)

![?](https://i.imgur.com/4ItbWVG_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Now the regression line will have accuracy issues for future unseen data. 

# Related
- Anomaly detection
- Extreme value analysis (EVA) 
   - https://manuals.mikepoweredbydhi.help/2017/General/EVA_SciDoc.pdf
   - https://www.ncl.ucar.edu/Applications/extreme_value.shtml (Extreme value statistics and Extreme Value Theory - EVT)

# Distance-based outlier defection techniques 
Note that all `k` based supervised learners suffer from same problems: 
- if anomaly is larger or same size as ``k, forget it...
- In high dimensionality space, every data point is equi-distant from the other data points making distance-based groupings hard or impossible 

- k-means clustering
   - Probably most common clustering algorithm 
   - Why not use it: 
      - it puts every data point in a cluster. This can result in skewing centroids thus making test data or unseen data not or less accurate
      - You have to know `k` before you start
- k nearest neighbor (kNN)
- ORCA
- LOF (Local Outlier Factor)
   - Performance: High computational complexity
- RF
   - Performance: High memory usage
- DBSCAN clustering 
- HDBSCAN clustering 
   - Docs: https://hdbscan.readthedocs.io/en/latest/

# Other detection algorithms 
- Consistent Data Selection
   - Paper: https://arxiv.org/pdf/1712.04129.pdf
   - Debuted: 2018
- Isolation Forest (iForest)
   - One-lone description: Decision Trees + Random Forests
   - Performance: computational complexity and low memory 
   - When to use: unsupervised ML
   - Unique characteristics: since you don’t pass in `k`, it can handle datasets with larger than normal anomalies 
   - sklearn: http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html
- angle-based outlier detection (ABOD)
   - Useful in high dimensionality
- Lowest Correlation Integral (LOCI)
   - When to use: looking for outliers within your outliers
- Gaussian Mixture Models
- Variational Bayesian Gaussian Mixture

   
# How to compare
1. AUC and processing time
1. How quickly AUC converges 
1. Whether the model “works” when the training data has no anomalies but the test data does

# Old school statistical tests for outliers
Most of these are no longer used but you will see references to them from time to time. Some common problems with the below would be things like they are meant to uncover only a single anomaly per test, or they were meant to handle only a 1-dimensional space, or that they assume a normal or near normal distribution 
- Dixon Q-test
- Bartlett test 
- Grubb’s test