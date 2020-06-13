ARIMA = AutoRegressive Integrated Moving Average, used for statistical analysis and forecasting time series data

Note that using the ARIMA process requires your data collection to have also followed the ARIMA process

https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python/

- AR - Auto Regression - ARIMA uses regression to define/show the relationship that the dependent variable has with independent variables
- I - Integrated - ARIMA uses **differencing* to convert the time series data from non-stationary to stationary
- MA - Moving Average 

# Parameters to ARIMA - PDQ
ARIMA has just three parameters:
- **p**: The number of lag observations included in the model, also called the lag order.
- **d**: The number of times that the raw observations are differenced, also called the degree of differencing.
- **q**: The size of the moving average window, also called the order of moving average

Using the above, a linear regression model is constructed including the specified number and type of terms, and the data is prepared by a degree of differencing in order to make it stationary, i.e. to remove trend and seasonal structures that negatively affect the regression model.

You can simplify if you wish by passing 0 




