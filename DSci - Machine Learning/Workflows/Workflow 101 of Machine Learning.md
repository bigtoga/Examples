# Scenario: Given a dataset of historical mortgage data, we want to predict whether a loan will default or not
Using the Fannie Mae mortgage data for single-family homes, our typical steps to solve would be:

# Phase 1: Defining the problem
1. Define what you want to predict (i.e. numeric or categorical)
   - Classification problem (i.e. "... predict whether a loan will default or not")
1. Define which metrics matter for your situation
   - Classification: is Accuracy important for you? Recall more important than Precision for you? etc
   - Because we have anomaly detection and cost of a False Positive is low, Recall is our #1 most important
1. Identify the data sources
1. Agree on granularity

# Phase 2: EDA 
1. ETL the data into a staging area
1. Identify the column you want to predict (a.k.a. your **target** or y axis). Everything else are your **potential predictor variables** (a.k.a. x axis features)
1. Target: identify missing, bad data and document it
1. Target: remove and/or impute according to your documentation from previous step
1. Predictors: For every column:
   - identify missing, bad data and document it
   - remove and/or impute missing data according to your documentation from previous step

# Phase 3: Feature Selection
EDA to analyze most important features, collinearity issues, non-correlated features, etc. FEEI = **F**eature **E**xtraction, **E**limination, **I**mportance
1. Identify linear dependencies between your predictors
   - PyCaret's `findLinearCombos()` - https://topepo.github.io/caret/pre-processing.html#lindep
1. All predictor variables:
   - Can you eliminate any Zero- and Near Zero-Variance Predictors?
   - Can RandomForest show you the best features?
1. Numeric features: Use Backward Elimination to identify the best features
   - 

# Phase 4: Data Preprocessing 
[sci-kit learn has a good breakdown here](http://scikit-learn.org/stable/modules/preprocessing.html)

1. Standardization using a scaled of some type (StandardScaler, MinMaxScaler, etc)
1. Transforms
1. Normalization so that all values have a unit norm
1. Get the data into Tidy Data format
1. Identify your categorical features 
   - Which are ordinal?
   - Which are nominal?
   - Do you need to create any hierarchies?
1. Label or one-hot encoding for any nominal categorical features
1. Label encoding for any ordinal categorical features
1. Evaluate whether you want to implement `discretization` (creating bins for the categorical feature classes) using `K-bins discretization` ([more details at sci-kit learn site](http://scikit-learn.org/stable/auto_examples/preprocessing/plot_discretization_classification.html))
1. Decide whether you want to implement any `feature binarization` (i.e. re-classifying Feature class values into 1 or 0 based on a threshold
   - `Affairs` dataset - converting continuous `number_of_affairs` Feature into new feature `had_affair` that is True/False based on whether original column is > 0
1. Imputation of Missing Values [full discussion here](http://scikit-learn.org/stable/modules/impute.html)
1. Consider creating `polynomial features` to add complexity to the model
1. Export "machine learning ready" csv file of the data

# Phase 4: Compare/Test/Train/Holdout
1. Create train/test/holdout sets
   - Step 1: Add an index column into your "machine learning ready" dataset: `df['id'] = df.index`
   - Step 2: Randomly sample 20% into a new dataframe: `dfHoldout = df.sample(frac=0.2, replace=True, random_state=1).copy()`
   - Step 3: Remove the random samples from the original dataset: `dfTrainTest = df[~df.id.isin(dfHoldout.id)].copy()`
   - Step 4: Run sklearn's `train_test_split` against `dfTrainTest` to create your test and training dataset (which is now 80% of your overall data)
   - If you do this first, it reduces the time spent running ML compare_models()
1. Decide on which model algorithm by passing your training data into PyCaret's compare_models()
   - PyCaret's `compare_models()` will show you up to 16 classification modules' results
1. Train / test the model
1. Check model against the holdout data - rinse/repeat until you have acceptable metrics

# Phase 5: Deploy and Integrate
1. Deploy trained model
1. Integrate into application

The above works great for balanced datasets but, for unbalanced, you have to make choices. In our case, the Fannie Mae data has only about 6-7% "bad mortgages" so it's definitely unbalanced. This will cause problems - we will see models that have high Accuracy but poor recall. There are several options for fixing.
