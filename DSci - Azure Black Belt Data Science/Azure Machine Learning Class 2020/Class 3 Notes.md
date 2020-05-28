# AutoML
Benefits:
1. Hyperparameter tuning is automatic
2. Automatically spins up compute clusters for you
3. Auto feature engineering
4. Will basically do what PyCaret's `compare_model()` does - compares results 

## Featurization
Can disable if you don't need it

Built off of [DP-100 Azure Data Scientist Associate certification](https://docs.microsoft.com/en-us/learn/paths/build-ai-solutions-with-azure-ml-service/)

# Questions
1. Does AutoML do PCA by default or only on request? If so, what are the options?
2. WHen I choose a compute cluster, does it auto spin down when my auto ML is done?
3. Why does it take so long to get the first result back? 45 minutes for 1,000 row file using 4 core 16GB RAM cluster
4. Compute power required for explain model - does that require same horsepower as model comparison/auto?
5. Difference between Azure's autoML and PyCaret?
