[Example from stackexchange](https://datascience.stackexchange.com/questions/9362/when-to-use-linear-or-logistic-regression):
**Linear Regression** is used for predicting continuous variables. **Logistic Regression** is used for predicting variables which has only limited values.

> If X contains the "area in square feet" of houses, and Y contains the "sale price", linear regression could predict the selling price as a function of house size. While the possible selling price may not actually be any, there are so many possible values that a linear regression model would be chosen.

If, instead, you wanted to predict, based on size, whether a house would sell for more than 200K, you would use logistic regression. The possible outputs are either Yes, the house will sell for more than $200K, or No, the house will not.

# Linear regression
You have lots of numeric data and want to output numeric/continuous data. Linear regression makes a linearization of a problem where 𝑦=𝑓(𝑥) with 𝑥 and 𝑦  being continuous variables.

[Great breakdown here](https://statisticsbyjim.com/regression/choosing-regression-analysis/)

> Linear regression, aka ordinary least squares (OLS) and "linear least squares" help us understand the **mean change** in a dependent variable given a one-unit change in each independent variable
> OLS produces the fitted line that minimizes the sum of the squared differences between the data points and the line
* **If you have a *continuous dependent variable*, linear regression is probably the first type you should consider**

# Logistical Regression
Your target is a categorical variable
* You want to predict a behavior - someone will or will not buy a house, default on a mortgage, etc
* Image classification/recognition (output is "pizza slice" or "ice cream cone")