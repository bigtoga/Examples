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

# shape and data types of the data
print(df.shape)
print(df.dtypes)

df.head()
df.tail()
df.sample() # random rows
df.describe()

# Which columns have nulls?
df.isnull()

# TChain sum() to get total number of nulls per column
# easier - smaller set to look at
df.isnull().sum()

# And again to count total mum's in entire dataset
df.isnull().sum().sum()

# select numeric columns
df_numeric = df.select_dtypes(include=[np.number])
numeric_cols = df_numeric.columns.values
print(numeric_cols)

# select non numeric / categorical columns
df_non_numeric = df.select_dtypes(exclude=[np.number])
non_numeric_cols = df_non_numeric.columns.values
print(non_numeric_cols)

######################################
# Column level exploration 
#####################################
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

### Single feature:
# replace missing values with the median.
med = df['life_sq'].median()
print(med)
df['life_sq'] = df['life_sq'].fillna(med)

### All NUMERIC features at once:

# impute the missing values and create the missing value indicator variables for each numeric column.
df_numeric = df.select_dtypes(include=[np.number])
numeric_cols = df_numeric.columns.values

for col in numeric_cols:
    missing = df[col].isnull()
    num_missing = np.sum(missing)
    
    if num_missing > 0:  # only do the imputation for the columns that have missing values.
        print('imputing missing values for: {}'.format(col))
        df['{}_ismissing'.format(col)] = missing
        med = df[col].median()
        df[col] = df[col].fillna(med)

### All CATEGORICAL features are once:

# impute the missing values and create the missing value indicator variables for each non-numeric column.
df_non_numeric = df.select_dtypes(exclude=[np.number])
non_numeric_cols = df_non_numeric.columns.values

for col in non_numeric_cols:
    missing = df[col].isnull()
    num_missing = np.sum(missing)
    
    if num_missing > 0:  # only do the imputation for the columns that have missing values.
        print('imputing missing values for: {}'.format(col))
        df['{}_ismissing'.format(col)] = missing
        
        top = df[col].describe()['top'] # impute with the most frequent value.
        df[col] = df[col].fillna(top)

######################################
# Missing Data Cleanup Techniques
#    Technique #4: Substitution 
#    What it is: Group all missing Data for feature into one bucket
#    When to use: 
######################################
# categorical
df['sub_area'] = df['sub_area'].fillna('_MISSING_')

# numeric
df['life_sq'] = df['life_sq'].fillna(-999)
