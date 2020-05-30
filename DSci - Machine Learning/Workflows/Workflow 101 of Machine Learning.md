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

# Phase 2: EDA for FEEE
1. ETL the data into a staging area
2. EDA to analyze most important features, collinearity issues

# Phase 3: Prep for ML
1. Impute or remove missing data
1. Label or one-hot encoding for categorical data
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
