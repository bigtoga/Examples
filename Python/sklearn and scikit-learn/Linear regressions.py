# Import dependencies
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression

# Generate some data
X, y = make_regression(
  n_samples=20
  , n_features=1
  , random_state=0
  , noise=4
  , bias=100.0
)

# Create a linear model
model = LinearRegression()

# Fit (Train) our model to the data
model.fit(X, y)

>> LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None, normalize=False)
