# https://machinelearningmastery.com/develop-first-xgboost-model-python-scikit-learn/

from numpy import loadtxt
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# UCI Machine Learning Repository - https://archive.ics.uci.edu/ml/datasets/diabetes
# 10 columns
data = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
dataset = loadtxt(data, delimiter=",")

##########################################
# 1. Data preprocessing
##########################################
# GBMs cannot use categorical data so we must searpate separate the columns (attributes or features) 
# into input patterns (X) and output patterns (Y). 
# We can do this easily by specifying the column indices in the NumPy array format
# split data into X and y
X = dataset[:,0:8]
Y = dataset[:,8]

# Split the X and Y data into a training and test dataset. 
#    - Training set will be used to prepare the XGBoost model 
#    - Test set will be used to make new predictions, from which we can evaluate the performance of the model
# We also specify a seed for the random number generator so that we always get the same split of data each time 
seed = 7
test_size = 0.33
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=test_size, random_state=seed)

##########################################
# 2. Create the model
##########################################
# One of the great things about ZGBoost is it provides a wrapper to allow models to be treated like 
#      classifiers or regressors in the scikit-learn framework. This means we can use the full
#      scikit-learn library w our XGBoost models
#      http://xgboost.readthedocs.io/en/latest/python/python_api.html#module-xgboost.sklearn

# XGBClassifier - XGBoost model for classification. We can create and and fit it to our training dataset. 
# Models are fit using the scikit-learn API and the model.fit() function.
# fit model to training data
model = XGBClassifier()
model.fit(X_train, y_train)
print(model)

##########################################
# 6. Predict!
##########################################
# By default, the predictions made by XGBoost are probabilities. Because this is a binary classification problem, 
# each prediction is the probability of the input pattern belonging to the first class. We can easily convert 
# them to binary class values by rounding them to 0 or 1.

# make predictions for test data using scikit-learn's model.predict()
y_pred = model.predict(X_test)
predictions = [round(value) for value in y_pred]

##########################################
# How'd we do?
##########################################
# We trained the model, then predicted the test data. Let's see how well we did!
accuracy = accuracy_score(y_test, predictions)
print("Accuracy: %.2f%%" % (accuracy * 100.0))

>> Accuracy: 77.95%

# This is a good score for this problem!
