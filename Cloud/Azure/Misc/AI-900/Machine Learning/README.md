Unsupervised Machine Learning tasks:
- Clustering

Supervised Machine Learning tasks:
- Literally all other types (regression, classification)

# Team Data Science Process

[Core documentation](https://docs.microsoft.com/en-us/azure/machine-learning/team-data-science-process/)

## Five lifecycle stages
1. Business understanding
1. Data acquisition and understanding
1. Modeling
1. Deployment
1. Customer acceptance

AI-900 is mostly focused on Modeling and Deployment

### Modeling

Modeling has 3 main tasks:
1. Feature engineering: Create data features from the raw data to facilitate model training.
1. Model training: Find the model that answers the question most accurately by comparing their success metrics.
1. Determine if your model is suitable for production.

#### Feature Engineering and Feature Selection

- **Feature engineering**: The process of creating new features from raw data to increase the predictive power of the learning algorithm. Engineered features should capture additional information that is not easily apparent in the original feature set.
- **Feature selection**: The process of selecting the key subset of features to reduce the dimensionality of the training problem

##### Feature Selection

[According to Microsoft](https://docs.microsoft.com/en-us/azure/machine-learning/team-data-science-process/select-features), Feature Selection is important because:
1. Increases classification accuracy by eliminating irrelevant, redundant, or highly correlated features
2. Decreases the number of features which makes model training more efficient


#### Model Training

Four steps according to MSFT:
1. Split the input data randomly for modeling into a training data set and a test data set.
1. Build the models by using the training data set.
1. Evaluate the training and the test data set. Use a series of competing machine-learning algorithms along with the various associated tuning parameters (known as a parameter sweep) that are geared toward answering the question of interest with the current data.
1. Determine the “best” solution to answer the question by comparing the success metrics between alternative methods.
