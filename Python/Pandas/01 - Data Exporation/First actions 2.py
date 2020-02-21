# https://link.medium.com/OD4EMf8Wf4

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
# Import and explore the data
######################################

df = pd.read_csv('sberbank.csv')

# shape and data types of the data
print(df.shape)
print(df.dtypes)

# select numeric columns
df_numeric = df.select_dtypes(include=[np.number])
numeric_cols = df_numeric.columns.values
print(numeric_cols)

# select non numeric / categorical columns
df_non_numeric = df.select_dtypes(exclude=[np.number])
non_numeric_cols = df_non_numeric.columns.values
print(non_numeric_cols)

######################################
# Identify Missing Data Technique 1: Heatmap 
#    Use when there are relatively few features 
######################################

cols = df.columns[:30] # first 30 columns
colours = ['#000099', '#ffff00'] # specify the colours - yellow is missing. blue is not missing.
sns.heatmap(df[cols].isnull(), cmap=sns.color_palette(colours))


######################################
# Identify Missing Data Technique 2: Percentages 
#     Use when there might be a lot of features
#     Use when large dataset   
######################################
# % of missing.
for col in df.columns:
    pct_missing = np.mean(df[col].isnull())
    print('{} - {}%'.format(col, round(pct_missing*100)))


######################################
# Identify Missing Data Technique 3: Histogram  
#     Use when there might be a lot of features
#     Use when large dataset   
######################################

# first create missing indicator for features with missing data
for col in df.columns:
    missing = df[col].isnull()
    num_missing = np.sum(missing)

######################################
# 
######################################


######################################
# 
######################################


######################################
# 
######################################
