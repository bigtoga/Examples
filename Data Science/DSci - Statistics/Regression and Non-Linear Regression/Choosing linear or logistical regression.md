**Model specification** or **model selection** are words that describes the process of determining which independent variables to include/exclude from a regression test. 

[Good explanation here](https://statisticsbyjim.com/regression/model-specification-variable-selection/)

Rule of thumb/"We want to":
* Exclude all independent variables that are not mathematically related to the dependent variable
* Include all independent variables that are mathematically related

If we have **too few independent variables**, our results tend to be biased  If we have **too many indendent variables**, our results tend to be overfitted (aka too specifically tuned to "this set of data"). Neither situation will hold up to larger/different data sets (aka they are not generalized enough to be reused woth new/additional data).


[Example from stackexchange](https://datascience.stackexchange.com/questions/9362/when-to-use-linear-or-logistic-regression):
**Linear Regression** is used for predicting continuous variables. **Logistic Regression** is used for predicting variables which has only limited values.

> If X contains the "area in square feet" of houses, and Y contains the "sale price", linear regression could predict the selling price as a function of house size. While the possible selling price may not actually be any, there are so many possible values that a linear regression model would be chosen.

If, instead, you wanted to predict, based on size, whether a house would sell for more than 200K, you would use logistic regression. The possible outputs are either Yes, the house will sell for more than $200K, or No, the house will not.

# Linear regression
You have lots of numeric data and want to output numeric/continuous data. Linear regression makes a linearization of a problem where 𝑦=𝑓(𝑥) with 𝑥 and 𝑦  being continuous variables.

### Use when your dependent variable is continuous

[Great breakdown here](https://statisticsbyjim.com/regression/choosing-regression-analysis/)

> Linear regression, aka ordinary least squares (OLS) and "linear least squares" help us understand the **mean change** in a dependent variable given a one-unit change in each independent variable
> OLS produces the fitted line that minimizes the sum of the squared differences between the data points and the line
* **If you have a *continuous dependent variable*, linear regression is probably the first type you should consider**

# Logistical Regression
Logistic regression describes the relationship between a set of independent variables and a categorical dependent variable. Choose the type of logistic model based on the type of categorical dependent variable you have.

### Use when your dependent variable is categorical 
* You want to predict a behavior - someone will or will not buy a house, default on a mortgage, etc
* Image classification/recognition (output is "pizza slice" or "ice cream cone")

> A categorical variable has values that you can put into a countable number of distinct groups based on a characteristic. > Logistic regression transforms the dependent variable and then uses **Maximum Likelihood Estimation**, rather than least squares, to estimate the parameters

-------


