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

```python   ```

