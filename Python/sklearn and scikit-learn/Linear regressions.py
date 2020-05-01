# https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html
# https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_regression.html

# Import dependencies
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression

# Generate some data
X, y = make_regression(
  n_samples=20 # The more samples, generally the better
  , n_features=1 # "1" feature creates a simple linear regression (SLR) (single dependent variable)
  , random_state=0 # Pass an int for reproducible output across multiple function calls (seed for random number generation)
  , noise=4 # The standard deviation of the gaussian noise applied to the output.
  , bias=100.0 # The bias term in the underlying linear model
)

# Create a linear model
model = LinearRegression()

# Fit (Train) our model to the data
model.fit(X, y)

>> LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None, normalize=False)

# There are a variety of ways to quantify the model, but MSE and R2 are very common

# R2 by itself is generally not enough
# R2 - the more data, the better
from sklearn.metrics import mean_squared_error, r2_score

# Use our model to predict a value
predicted = model.predict(X)

# Score the prediction with mse and r2
# A "good" MSE score will be close to zero 
# A "good" R2 Score will be close to 1
# https://en.wikipedia.org/wiki/Coefficient_of_determination

mse = mean_squared_error(y, predicted)
r2 = r2_score(y, predicted)

print(f"Mean Squared Error (MSE): {mse} (aka deviance)")
print(f"R-squared (R2): {r2}")

if r2 > 90:
  print('   - R-squared looks solid - more than 90% of data falls within the expected variance rage')

>> Mean Squared Error (MSE): 11.933040779746149 (aka deviance)
>> R-squared (R2): 0.903603363418708
>>    - R-squared looks solid - more than 90% of data falls within the expected variance rage
  
# Overall Score for the model
model.score(X, y)
  
# Validation - We also want to understand how well our model performs on new data.
# One approach for this is to split your data into a training and testing dataset. 
# You fit (train) the model using training data, and score and validate your model using the testing data.
# This train/test splitting is so common that Sklearn provides a mechanism for doing this.

# Testing and Training Data
# In order to quantify our model against new input values, we often split the data into training and 
# testing data. The model is then fit to the training data and scored by the test data. Sklean pre-processing 
# provides a library for automatically splitting up the data into training and testing
from sklearn.model_selection import train_test_split

# train_test_split is perfect when you (a) have only a single dataset, and (b) want to split it into "test" and "train" arrays
X_train, X_test, y_train, y_test = train_test_split(
  X # number of train records
  , y # number of test records
  , random_state=42 # silimar to "random_state" param in make_regression() - set to an int to be repeatable
)

# Train the model using the training data
model.fit(X_train, y_train)

>> LinearRegression(copy_X=True, fit_intercept=True, n_jobs=1, normalize=False)

# score the model using the unseen testing data
model.score(X_test, y_test)

>> 0.92525224350441038
