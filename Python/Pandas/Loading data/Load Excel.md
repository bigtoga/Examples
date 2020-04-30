### Loading specific sheets
https://stackoverflow.com/questions/26521266/using-pandas-to-pd-read-excel-for-multiple-worksheets-of-the-same-workbook

~~~
xls = pd.ExcelFile('path_to_file.xls')
df1 = pd.read_excel(xls, 'Sheet1')
df2 = pd.read_excel(xls, 'Sheet2')

~~~

Examples from https://towardsdatascience.com/feature-engineering-in-python-part-i-the-most-powerful-way-of-dealing-with-data-8e2447e7c69e

~~~
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime

# Make sure all columns with data are shown
pd.set_option('display.max_columns', None)
data_train = pd.read_excel('Data_Train.xlsx')
data_test = pd.read_excel('Data_Test.xlsx')

price_train = data_train.Price  
# Concatenate training and test sets 
data = pd.concat([data_train.drop(['Price'], axis=1), data_test])

data.columns

data = data.drop_duplicates()

# How many columns have nulls?
data.isnull.sum()

# Remove the nulls (dropna is alternate way)
data = data.drop(data.loc[data['Route'].isnull()].index)

# Make discrete bins of continuous data
data['day_of_week'] = data['Date_of_Journey'].dt.day_name()
data['Journey_Month'] = pd.to_datetime(data.Date_of_Journey, format='%d/%m/%Y').dt.month_name()


~~~
