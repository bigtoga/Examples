<details>
  <summary>Basics</summary>

Unsupervised Machine Learning tasks:
- Clustering

Supervised Machine Learning tasks:
- Literally all other types (regression, classification)
- 
</details>

<details>
  <summary>Team Data Science Process</summary>
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

##### Featurization is another name for Feature Engineering + Feature Selection

Sort of fuzzy on why this isn't listed in the TDSP more forwardly [but here is the documentation](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-configure-auto-features#featurization): **Featurization is using your domain knowledge to select the label (or labels), features, scale, and normalize the data** (a.k.a. feature engineering and selection)


#### Model Training

Four steps according to MSFT:
1. Split the input data randomly for modeling into a training data set and a test data set.
1. Build the models by using the training data set.
1. Evaluate the training and the test data set. Use a series of competing machine-learning algorithms along with the various associated tuning parameters (known as a parameter sweep) that are geared toward answering the question of interest with the current data.
1. Determine the “best” solution to answer the question by comparing the success metrics between alternative methods.

</details>

<details>
  <summary>Evaluating Models</summary>

# Evaluating Models

[Confusion Matrix](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-understand-automated-ml#confusion-matrix) will always be `(# of labels} x (# of labels)`: 
- Have four classes? Matrix is 4x4
- Have eight classes? Then it is 8x8
</details>

<details>
  <summary></summary>
</details>

<details>
  <summary></summary>
</details>
