# One-Time steps
1. Define your target variable (a.k.a. output variable, response variable, what are you trying to predict?)
    - Everything else is a predictor variable (a.k.a. independent variable)
1. Determine whether your problem is Classification, Regression, NLP (Deep Learning), or Time Series Forecasting
1. Perform the Data Preprocessing steps
    1. Get it into Tidy Data format
    1. Dimensionality Reduction
    1. Feature Engineering
        - Look at [PyCaret documentation](https://topepo.github.io/caret/pre-processing.html) for great list
        - Identify the metrics you want
        - Feature Elimination
            - Strategy: eliminate data with zero to low variance (column has 100% duplicate data - "all 1s")
                - Tactic: Look at the data values of each feature independently, calculate a cardinality score, and eliminate columns with 0% cardinality
            - Strategy: eliminate redundant data 
                - Tactic: Compare each independent variable with every other independent variable. Evaluate whether you can eliminate a feature because it is strongly / highly correlated with another feature
        - Feature Selection 
            - Simple "If you were building a web page that allowed users to enter in 'the inputs so that you could predict the target variable for those values, what are those features?" Everything else is trashed
1. Begin to experiment with the various models + settings (hyperparameters, folds, boosting, bagging, stacking, ensembles, etc)
1. Train/test until your model metrics are good/bad
    - `PyCaret` and others make this easy
1. Cross-validate your model with additional holdout/test data    
1. After you have your model decided, export a .pkl file (pickle file)    
1. Import the .pkl into your app, pass in new inputs, and get prediction
1. Register and deploy the model
