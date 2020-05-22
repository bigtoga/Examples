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

**Rule of thumb** - the smaller the MSE, the closer you are to finding the line of best fit. 

Depending on your data, it may be impossible to get a very small value for the mean squared error. Sometimes your MSE is wildly around the regression line, so maybe **6.08** is as good as it gets (and is in fact, the line of best fit). **Where the mean squared error really comes in handy is** if you were finding an equation for the regression line by hand: you could try several equations, and the one that gave you the smallest mean squared error would be the line of best fit.

![x](https://i.imgur.com/s2eXOOy.png)
