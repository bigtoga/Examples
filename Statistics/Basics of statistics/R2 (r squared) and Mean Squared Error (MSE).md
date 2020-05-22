# R<sup>2</sup>
Higher R<sup>2</sup> values signify that the variable is highly predictive. 
An R<sup>2</sup> value of 0.90 means that our model roughly accounts for 90% of the variability in the data

**Rule of thumb** - what your "acceptable R<sup>2</sup> value" for your project depends on the use case
* "Greater than 50%" would be amazing if you could predict 50% of investments as a venture capitalist
* "Anything less than 100%" would be unacceptable in certain projects

Outlier detection / removal 

# Mean squared error (MSE)
MSE is the difference between the "predicted value" and the "actual value"

How to calculate the mean squared error from a set of X and Y values:
1. Find the regression line
1. Insert your X values into the linear regression equation to find the new Y values (Y’)
1. Subtract the new Y value from the original to get the error
1. Square the errors
1. Add up the errors
1. Find the mean

![x](https://i.imgur.com/s2eXOOy.png)
