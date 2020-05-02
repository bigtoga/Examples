Dan - this is my favorite and almost always beats out everything including keras / tensorflow. If I couldn't use Data Robot, I'll use this most likely next. 

https://xgboost.readthedocs.io/en/latest/
> XGBoost is an **optimized distributed gradient boosting library** designed to be highly efficient, flexible and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost provides a parallel tree boosting (also known as GBDT, GBM) that solve many data science problems in a fast and accurate way. The same code runs on major distributed environment (Hadoop, SGE, MPI) and can solve problems beyond billions of examples.

## XGBoost notes:
1. **Categorical features not supported** - no surprise there. "If your data contains categorical features, load it as a NumPy array first and then perform corresponding preprocessing steps like one-hot encoding."
2. XGBoost cannot load CSV files that have headers. Load your CSV into pandas first, then pass to XGBoost

https://xgboost.readthedocs.io/en/latest/python/python_intro.html

~~~
conda install xgboost
pip install xgboost

import xgboost as xgb 

# load your dataframe/CSV/etc into a "DMatrix"
data = dfFourColumns.reshape((4,3)))
label = pandas.DataFrame(np.random.randint(2, size=4))
dtrain = xgb.DMatrix(data, label=label)

# Saving DMatrix into a XGBoost binary file will make loading faster:
dtrain = xgb.DMatrix('train.svm.txt')
dtrain.save_binary('train.buffer')

# Replace missing values
dtrain = xgb.DMatrix(data, label=label, missing=-999.0)

# Can assign weights
w = np.random.rand(5, 1)
dtrain = xgb.DMatrix(data, label=label, missing=-999.0, weight=w)

~~~
