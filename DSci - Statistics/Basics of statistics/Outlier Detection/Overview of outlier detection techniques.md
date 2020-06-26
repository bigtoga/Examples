# Distance-based outlier defection techniques 
Note that all `k` based supervised learners suffer from same problems: 
- if anomaly is larger or same size as ``k, forget it...
- In high dimensionality space, every data point is equi-distant from the other data points making distance-based groupings hard or impossible 

- k-means clustering
- ORCA
- LOF
   - Performance: High computational complexity
- RF
   - Performance: High memory usage

# Other detection algorithms 
- Consistent Data Selection
   - Paper: https://arxiv.org/pdf/1712.04129.pdf
   - Debuted: 2018
- Isolation Forest (iForest)
   - Performance: computational complexity and low memory 
   - When to use: unsupervised ML
   - Unique characteristics: since you don’t pass in `k`, it can handle datasets with larger than normal anomalies 

# How to compare
1. AUC and processing time
1. How quickly AUC converges 
1. Whether the model “works” when the training data has no anomalies but the test data does