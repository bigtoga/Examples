Many, many choices here - [the docs for dropna() are here](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html) but here are a few examples. 
* Note: don’t forget to include `inPlace=True` if you want to keep the DataFrame in the same variable
* Note: use `axis=` to specifically target rows (0 or ‘rows’) or columns (1 or ‘columns’). `axis=0` is the default 
* Note: default value for the `how` parameter is `any` 

Related docs:
* [dropna()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html)
* [fillna()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.fillna.html#pandas.DataFrame.fillna)

# Option: delete rows
### If row has any NaN or NaT values 
* Drop rows with any NaN or NaT values in any column `df.dropna()`
* Drop rows where all row values are NaN `df.dropna(how=‘all’)`
   * Use case is different from `df.dropna()` - use this when you want to delete “blank lines” while preserving “rows that have just a few NaN values”

### If certain columns have NaN
* Drop rows if they have specific column(s) that have any NaN: `df.dropna(subset=[‘zipcode’, ‘income’])` to drop rows that had missing values in `zipcode` or `income`
   * I’m not sure if this is an `and` or `or` operation though and docs don’t help


### If the row has a certain % of rows that are NaN
* Drop any rows with less than 2 actual values (not NaN values): `df.dropna(thresh=2)`
* Drop rows with that have a % of NaN rows greater than a threshold `df.dropna(df.shape[0] > .9)` to drop any column with less than 90% non-NaN values

# Option: delete columns
### Drop any columns with NaN
* Drop any column that has at least one NaN `df.dropna(axis=‘columns’)`

### Drop any columns above a threshold 
* Drop any columns with less than 2 actual values (not NaN values): `df.dropna(thresh=2, axis=1)`

# Option: replace missing values
So many choices here!
* Replace with 0 `df.fillna(0)`
* Replace with the previous row’s value `df.fillna(method=‘bfill’)` using ‘forward fill’ (similar to lag in SQL)
* Replace with the next row’s value `df.fillna(method=‘ffill’)` using ‘forward fill’ (similar to lead in SQL)
* 
* 
* 
* 
* 


```python   

# Drop all rows where Area is unassigned
df = df.dropna(subset=['Owner'])

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
```