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
# Missing Data Cleanup Techniques
#    Technique #1: Listwise Deletion
#    What it is: Dropping entire rows
#    When to use: When you are 100% sure you do not need this data/observation/row
######################################
# Decision: "Drop any rows that are missing 35 or more features (ie column values in that row)
# drop rows with a lot of missing values.
ind_missing = df[df['num_missing'] > 35].index
df_less_missing_rows = df.drop(ind_missing, axis=0)


######################################
# Missing Data Cleanup Techniques
#    Technique #2: Drop features
#    What it is: Drop entire column
#    When to use: Feature may not be robust enough or have enough/any data
######################################

# hospital_beds_raion has a lot of missing.
cols_to_drop = ['hospital_beds_raion']
df_less_hos_beds_raion = df.drop(cols_to_drop, axis=1)

######################################
# Missing Data Cleanup Techniques
#    Technique #3: Imputation (replacement)
#    What it is: Replace missing row and/or feature values
#       - Numeric features: replace missing with median or average values for the feature 
#       - Categorical features: replace missing with the mode (most frequently occurring value)
#    When to use: 
######################################

# replace missing values with the median.
med = df['life_sq'].median()
print(med)
df['life_sq'] = df['life_sq'].fillna(med)

######################################
# Missing Data Cleanup Techniques
#    Technique #1:
#    What it is: 
#    When to use: 
######################################
