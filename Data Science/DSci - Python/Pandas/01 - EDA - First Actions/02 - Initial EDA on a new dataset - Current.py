# 2020-06: dataprep makes a lot of this easier. No need for seaborn/matplotlib
# pip install dataprep
# 100x faster than pandas profile report
# All plots are built woth Bokeh whoch is interactive
# Uses Dask behind the scenes for parallelism which is main performance improvement
#    - Dask supports block-wise computation
#    - Pandas only supports computationa over the entire dataset
#   - Dask supports parallellism for univariate distributions
#    - Pandas performs each univariate test in a serial fashion
#    - Dask has out-of-core support for datasets larger than memory soze on your machine; pandas does not

# Sample noteboos: 
#   - https://github.com/sfu-db/dataprep/tree/develop/examples
#   - https://github.com/sfu-db/dataprep/blob/develop/examples/EDA_COVID19_SouthKorea.ipynb

# dataprep also:
#    - Selects the toght viz for the data type
#    - Includes tooltips automatically
#    - Aut-selects the right time unit for datetime
#    - makes it easy to see most common categorica values

# "Exploratory data analysis’ is an attitude, a state of flexibility, a willingness to look for those things that we believe are not there, as well as those we believe to be there." - John Tukey

# Good examples here: https://link.medium.com/Uwg21cDbe7

# EDA process is ..."question, visualize, understand, repeat"

```python   
from dataprep.eda import plot
import pandas as pd
df = pd.read_csv("https://www.openml.org/data/get_csv/1595261/phpMawTba", na_values = [' ?'])

# Categorical data and numerics auto plot as bar charts
# Datetime data auto plots as a line chart
# Tooltips auto populate to show IQR and more
plot(df)

# Can auto bin during plot creation
plot(df, "age", bins=26)

# Can bin across features
plot(df, "age", "sex", bins=26)

plot_correlation(df)

plot_missing(df)

# Categorical features auto plot a bar and pie chart
plot(df, "category")

# Continuous features auto plot a scatter, KDE, QQ / hexbin plot, and box plot
plot(df, "age")

# Compare two numeric columns easily - auto plot
plot(df, "age", "hours-per-week")

# When both x and y are categorical, it plots
# a nested bar chat, a stacked bar chart, and a heatmap
plot(df, "education", "marital-status")

# If one is categorical and one is numeric, it auto
# plots a box plot and a line chart
plot(df, "age", "education")


```









# https://link.medium.com/OD4EMf8Wf4
# https://towardsdatascience.com/complete-guide-to-data-visualization-with-python-2dd74df12b5e

######################################
# Setup 
######################################
# import packages
import pandas as pd
import numpy as np
import seaborn as sns

import matplotlib.pyplot as plt
import matplotlib.mlab as mlab
import matplotlib
plt.style.use('ggplot')
from matplotlib.pyplot import figure

%matplotlib inline
matplotlib.rcParams['figure.figsize'] = (12,8)

pd.options.mode.chained_assignment = None

######################################
# Import and explore the full dataset
######################################

df = pd.read_csv('sberbank.csv')
# , nrows=20
# , skiprows=1000000

# add , encoding = "utf-8") for unicode issues
# or ,encoding='utf-8-sig'

# If you still have encoding issues, use "file" command in bash for the file - it will tell you what the file encoding is
# Little-endian UTF-16 (UTF16) is funky and reads all rows 2x with NaN for all

# If you get pink results with lots of "Skipping line 18367: expected 1 fields, saw 2"
# add ", sep='\t')" if this is tab-delimited

# add ", encoding='ISO-8859–1')" # If you get the  UnicodeDecodeError: 'utf-8' codec can't decode byte 0xba in position 16: invalid start byte

######################################
# Dataset overview
######################################
# shape and data types of the data
print(df.shape)
print(df.dtypes)

# List columns, # of rows w non-null in each column, column data types 
df.info()
df.describe()

df.head()
df.tail()
df.sample() # random rows

# Which columns have nulls?
df.isnull()

# TChain sum() to get total number of nulls per column
# easier - smaller set to look at
df.isnull().sum()

# And again to count total num's in entire dataset
df.isnull().sum().sum()

######################################
# Column level exploration 
#####################################
# Verify the column names are what you think they are:
print(df.columns.tolist()) # look for a space before

# If you want / need to remove spaces in column names:
df = pd.read_csv('df.csv', sep=r'\s*,\s*', header=0, encoding='ascii', engine='python')


df.describe("column_name")

# Return 5 rows w smallest value 
# SQL Top(5) Order by column_name
df.nsmallest("column_name") 

df.nlargest(5, column_name)

# How many values exist in a column?
# Group By w Count
# Best for categorical 
df["Cannes"].value_counts() # does not count null

df["Cannes"].value_counts(dropna=false) # Counts nulls

# select numeric columns
df_numeric = df.select_dtypes(include=[np.number])
numeric_cols = df_numeric.columns.values
print(numeric_cols)

# select non numeric / categorical columns
df_non_numeric = df.select_dtypes(exclude=[np.number])
non_numeric_cols = df_non_numeric.columns.values
print(non_numeric_cols)

######################################
# Change any data type issues
#####################################
# Reminder: "object" is string - str / string data types weren't introduced until 1.0

# Convert categorical data to string
# df = df.astype({"a": int, "b": str})

# Pandas 1.0+ 
#df = df.convert_dtypes()

# Convert to datetime
# df['Created']= pd.to_datetime(df['Created']) 

######################################
# Add additional time hierarchies
#####################################
# Add year 
df['ClosedYear'] = pd.DatetimeIndex(df['Closed Date']).year

# Add feature for YYYY-MM
df['ClosedMonth'] = df['Closed Date'].dt.to_period('M')

# Add feature for week 
df['ClosedWeek'] = df['Closed Date'].dt.to_period(freq = 'W')  

df['ClosedQuarter'] = pd.PeriodIndex(df['Closed Date'], freq='Q-MAR').strftime('Q%q') # Q1
df['ClosedQtr'] = pd.PeriodIndex(df['Closed Date'], freq='Q') # 2017Q1

df['ClosedDayOfWeek'] = df['Closed Date'].dt.dayofweek # 0 = Sunday 
df['ClosedDay'] = df['Closed Date'].dt.day_name()
df['Closed_IsWeekend'] = np.where(df['ClosedDay'].isin(['Saturday', 'Sunday']), 1, 0) # Add a boolean column 

######################################
# View a report 
#####################################
# pip install pandas-profiling - careful, will uninstall pandas versions newer than 0.25.3 and install latest 
# pip install https://github.com/pandas-profiling/pandas-profiling/archive/master.zip
pandas_profiling.ProfileReport(df)

profile = ProfileReport(df, title='Pandas Profiling Report', html={'style':{'full_width':True}})

# Application style report w tabs
profile.to_widgets()

# SPA style report 
profile.to_notebook_iframe()

######################################
# See if you can identify any correlations
#####################################
df.corr()


######################################
# Make the data more legible and human-readable 
#####################################
# Define a format dictionary so that the numbers are shown in a legible way (with a certain number of decimals, date and hour in a relevant format, with a percentage, with a currency, …) 
# 	- this only changes the display and does not change the underlying data 

# 
format_dict = {
	'OrderAmount':'${0:,.2f}'
	, 'CreateDate':'{:%m-%Y}'
    , 'ShipDate':'{:%Y-%m-%d}'
	, 'NumericValue':'{:.2%}'
}

# Apply the style to the visualization
df.head().style.format(format_dict)

# Simplify - remove hours/minutes
format_dict = {
	'CreateDate':'{:%m-%Y}' #Simplified format dictionary with values that do make sense for our data
}

######################################
# Initial visualizations (FYI these work best with mostly numeric data)
#####################################
# highlight maximum and minimum values with colours.
df.head().style.format(format_dict).highlight_max(color='darkgreen').highlight_min(color='#ff0000')

df.head().style.format(format_dict).bar(color='red', subset=['data science', 'deep learning'])
# Change to a color gradient style for categorical columns
df.head(10).style.format(format_dict).background_gradient(
	subset=[
		'data science'
		, 'machine learning'
	]
	, cmap='BuGn'
)

# Show data values in bars (data bars)
df.head().style.format(format_dict).bar(color='red', subset=['data science', 'deep learning'])

# Combine the previous 
df.head(10).style.format(format_dict).background_gradient(
	subset=['data science', 'machine learning'], cmap='BuGn').highlight_max(color='yellow')

######################################
# Aggregations
######################################

# Group data by features and summarize  
df.groupby(["ClosedYear"])[["Owner"]].describe()

aggs = df.groupby(["ClosedMonth", "Owner"]).agg({
        'DaysOpen': [
            np.count_nonzero
            , np.mean
            , np.median
            , np.var
            , np.std
        ]
        , 'MinutesOpen': [
            np.mean
        ]
}).reset_index() # Gets rid of auto aggregation/hierarchy
aggs
# aggs = aggs.to_frame()
# aggs = aggs.reset_index(level=['ClosedMonth', 'Owner'])
aggs.to_csv(r'PandasSiebel.csv')

######################################
# Charting
######################################

aggs.hist()


























