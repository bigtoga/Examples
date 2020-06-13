Lots of great examples here: https://towardsdatascience.com/time-series-analysis-using-pandas-in-python-f726d87a97d8

Working with the Open Power System Data which contains electricity consumption, wind power production, and solar power production for 2006–2017.
```python   
import pandas as pd

url=‘https://raw.githubusercontent.com/jenfly/opsd/master/opsd_germany_daily.csv’

data = pd.read_csv(url, sep=“,”)

# Ensure the Date column is datetime
data[‘Date’] = pd.to_datetime(data[‘Date’])

# Set the index to be observation date
data = data.set_index(‘Date’)

data.index
```
When you look at `data.index`, what jumps out at you is the last bit: `freq=None`. Pandas does not know the granularity of this datetime series. There are many options - let’s use Day:

```python   
# Tell pandas that each row represents a new day / new observation 

data_freq = data.asfreq(‘D’)
data_freq
```
Pandas `asfreq()` method **will add empty rows for missing days and fill them with NaN**. If you don’t want this, you can use lag and lead (a.k.a. forward fill and back fill) to fill in the values for the missing days
```python   
# Use forward fill to fill in missing values using 
# the previous day’s values 
# It’s a used assumption to say “If we don’t know the previous day’s 
# observed values, assume unchanged”
data_freq = data.asfreq(‘D’, method = ‘ffill’)
data_freq
```

We could instead use mean, mode, linear interpolation, mean of nearest neighbors, etc 

# Resample the data
Pandas also has the `resample()` method that allows you to aggregate the data using a higher order time series type. In our example above, our sample rate was day. We can resample to week and calculate the mean() for each easily:

```python   
data_columns = [‘Consumption’, ‘Wind’, ‘Solar’, ‘Wind+Solar’]

data_weekly_mean = data[data_columns].resample(‘W’).mean() 

data_weekly_mean
```
You can use any aggregate - here is the monthly resampled dataset using the maximum value for each column:

```python   
data_columns = [‘Consumption’, ‘Wind’, ‘Solar’, ‘Wind+Solar’]

data_monthly_max = data[data_columns].resample(‘M’).max() 

data_monthly_max
```
# Pandas can easily create rolling windows
A 7-day rolling mean with a `center` of the median date for the week (7-day period)
```python   
data_7d_rol = data[data_columns].rolling(
   window = 7
   , center = True
).mean()

data_7d_rol
```
`center = True` means for the time bin, say Jan 1 to Jan 8, the rolling mean would be calculated and placed next to the center of the bin (i.e. Jan 4). **Note that** the first 3 rows and the last 3 rows will have NaN because there is no way to compute a rolling 7-day mean using those values as “the center”.

# Plotting the data
Let’s make it pretty:
```python   
fig, ax = plt.subplots(figsize = (11,4))

# plotting daily data
ax.plot(data[‘Consumption’], marker=‘.’, markersize=2, color=‘0.6’,linestyle=‘None’, label=‘Daily’)

# plotting 7-day rolling data
ax.plot(data_7d_rol[‘Consumption’], linewidth=2, label=‘7-d Rolling 
Mean’)

# plotting annual rolling data
ax.plot(data_365d_rol[‘Consumption’], color=‘0.2’, linewidth=3, label=‘Trend (365-d Rolling Mean)’)

# Beautification of plot
ax.xaxis.set_major_locator(mdates.YearLocator())
ax.legend()
ax.set_xlabel(‘Year’)
ax.set_ylabel(‘Consumption (GWh)’)
ax.set_title(‘Trends in Electricity Consumption’)
```
![?](https://i.imgur.com/FRg2ysv_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Time series data and machine learning 
When a time series has a pronounced trend, it is said to be **non-stationary** (and this time series without a trend are called **stationary**). Many machine learning algorithms have trouble with non-stationary data and thus machine learning engineers often find ways to de-trend time series data prior to passing to the model. 
- ARIMA, a time series python library for analyzing time series data, has a lot of difficulty with this

## Differencing using diff()
The concept of de-trending the data is called **differencing**. Differencing is how you de-trend your time series data. Instead of seeing the actual values, `diff()` shows just how *different* one observation is from another. 

[Long but thorough explanation of differencing, identifying Simpson’s Paradox issues, and de-trending data so that your model can see a relationship between two variables](https://www.datacamp.com/community/tutorials/time-series-analysis-tutorial

**First order differencing** just calculates the difference between “this row” and “the previous row” and is generally suitable to remove trends. The formula is `value at time (t) = original value at time (t) - original value at time (t-1)`

**Second order differencing** calculates the difference between “this row” and “2 times the two rows before this row” and can be useful if first order differencing does not remove the trend. The formula is `value at time (t)= original value at time (t) — 2 *original value at time (t-1) + original value at time (t-2)`

```python   
# first order differencing 
data_first_order_diff = data[data_columns].diff()

data_first_order

# Plot and visualize

start, end = ‘2017-01’, ‘2017-06’

fig, ax = plt.subplots(figsize=(11, 4))

ax.plot(data_first_order_diff.loc[start:end, ‘Consumption’],
marker=‘o’, markersize=4, linestyle=‘-‘, label=‘First Order Differencing’)
ax.set_ylabel(‘Electricity Consumption (GWh)’)
ax.legend();
```
Here’s the new plot - notice there are no clear trends:

![?](https://i.imgur.com/pWM0mFu_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)








