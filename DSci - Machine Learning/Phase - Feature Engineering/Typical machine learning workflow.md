# One-Time steps
1. Define your target variable (a.k.a. output variable, response variable, what are you trying to predict?)
1. Determine whether your problem is Classification, Regression, or Time Series Forecasting
1. Get it into Tidy Data format
1. Dimensionality Reduction
1. Perform Feature Engineering:
    - Feature Elimination
    - Feature Selection 
1. Begin to experiment with the various models + settings (hyperparameters, folds, boosting, bagging, stacking, ensembles, etc)
1. Train/test until your model metrics are good/bad
    - `PyCaret` and others make this easy
1. After you have your model decided, export a .pkl file (pickle file)    
1. Import the .pkl into your app, pass in new inputs, and get prediction
1. Register and deploy the model