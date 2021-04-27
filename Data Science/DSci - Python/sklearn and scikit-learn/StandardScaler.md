By default, your dataset and predictions can have large values/outliers skew everything

StandardScaler:
1. Sets the mean for your dataset to be "0" in the output graph
2. Limits display to 1 standard deviation

StandardScaler applies a Gaussian distribution to our data where the mean is 0 and the standard deviation is 1. 
We can see the difference in the following plots (left side is "data without using StandardScaler" and right 
is "same data but using StandardScaler"):
![img](https://i.imgur.com/H3NzbVX.png)

SMU - Activities 7+ in 21-MachineLearning/1/
