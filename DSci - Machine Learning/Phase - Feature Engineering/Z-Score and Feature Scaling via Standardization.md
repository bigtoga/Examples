System of Engagement -> ETL -> ROLAP -> Data Warehouse -> OLAP Dim Fact -> **Data Preprocessing** -> Model Training and Validation -> Model Deploy -> Model Automation

http://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html

**Standardization** involves rescaling the features such that they have the properties of a standard normal distribution with a mean of zero and a standard deviation of one.

Certain algorithms require standardized data:
- KNN
- Logistic Regression 
- SVM
- PCA

# PCA and Standardization 
When we use PCA, we are interested in finding the “components that maximize the variance”. 

Example: given a dataset of human height (feet), weight (pounds), and age in years, predict diabetes onset age. 
- Without standardization, PCA would seek out the combinations of data that result in the largest variance 
- An increase of “1” for weight would be treated the same as an increase of “1” for age and a “1” for height
- There will be more changes in weight than age and height in the dataset which will lead PCA to overly rely on weight as its dominant “max variance” feature
- In other words, a change in age of +1 has far more impact on predicting onset of diabetes than a +1 on weight
- Standardization helps even out this problem
