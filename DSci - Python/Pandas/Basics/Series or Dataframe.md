[Great article](https://www.shanelynn.ie/summarising-aggregation-and-grouping-data-in-python-pandas/)

# Difference between Pandas Series and Pandas Dataframes
The output from a groupby and aggregation operation varies between Pandas Series and Pandas Dataframes. 

> As a rule of thumb, if you calculate more than one column of results, your result will be a Dataframe. For a single column of results, the agg function, by default, will produce a Series.

You can change this by selecting your operation column differently:

## Creates a Pandas Series
data.groupby('month')['duration'].sum() 

## Creates a Pandas DataFrame
data.groupby('month')[['duration']].sum()

# Data Series
One-dimensional ndarray with axis labels

# Data Frame
Two-dimensional, size-mutable, potentially heterogeneous tabular data.  
