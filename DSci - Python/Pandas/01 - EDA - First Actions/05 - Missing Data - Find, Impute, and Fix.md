Dealing with missing data is really a multi-phase process:
1. Detecting missing values
2. Handling missing values

If you want to skip this page, the [pandas cookbook](https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html#cookbook-missing-data) likely has everything you need to know

<details> <summary>1. Detecting missing values </summary> 

# 1. Detecting missing values
This has two paths: the easy path using `df.isna.sum()`, or the hard path which requires digging into how pandas, Python, and numpy all treat missing data a bit differently. 

## You can stop here if you just want the easy path
`df.isna().sum()` will show you how many missing values per column. 

`df.isna().any()` shows you Trey/False if a column has at least one missing value

Check the [pandas documentation](https://pandas.pydata.org/pandas-docs/stable/user_guide/missing_data.html) for more. 

First, let’s define what missing data is:
- A column value is missing a value
- An expected row in a time series is missing

### Question 1: How many of each datatype are you working with?
How many integer columns? How many datetime columns? Are all of your columns using the correct data types? Fix that first...

```python   
# List counts of data types
df.dtypes.value_counts()
```
>>> float64: 3
>>> bool: 1
>>> datetime64[ns]: 1
>>> object: 1

### Question 2: How was the data in the column created?
If it is from a source system or data warehouse, fine. But if you created this value earlier during EDA or Feature Extraction etc, you need to realize that your calculation or aggregation may have been the *cause of the missing data* or *may include assumptions you didn’t realize*.
- pandas `sum()` skips `NaN` (i.e. treats it as 0)
- pandas default: if you use arithmetic and one value is `NaN`, the result is `NaN`
- The sum of an all empty series or column is this 0
- `groupby()` drops all rows in which the grouped column values are `NaN`

### Question 3: What does a column with missing data look like?
Python and pandas has several ways to tell you “This cell is missing a value”. Unfortunately you have to get down into the details to uncover. 

100% True Positive missing values include:
- Integer columns might show `NaN` or `<NA>`
- datetime columns show `NaT`

100% “You have to know your data” True Positive missing values include:
- Who knows what’s in string columns. Your users might have enter `?` to denote missing values, or maybe they manually entered `N/A`
- You have to play detective here

### Question 4: How do we identify missing values? 
#### The easy button: 
Use pandas `isna()` and `notna`: 
- `pd.isna(df[‘col’])` returns True for all missing values
- `df[‘col’].notna()` returns True for all real values and False for missing
- These work for all data types 

#### More backstory/details if you want
This can be made to be harder than you would think... Partly this is because of a difference in how pandas, Python, and numpy all treat “missing data” a bit differently 

**How *not* to identify missing integer data**
- Python and numpy treat `nan` as an unknown value such that one `nan` does not equal another `nan`
- `np.nan == np.nan` results in False
- `None == None` results in True
- `NaN` is actually a *float* 
- Trying to detect missing values using `np.nan` actually casts entire column to a float before comparing 
- Hence this fails to find any rows: `df[‘col’] == np.nan` (all rows returned with `False` indicating no match)
- Pandas 1.0 changed from using `np.nan`  internally to using `pandas.NA` to represent missing data
- Python and pandas both treat `NaT` the same as `NaN` such that assigning a value of `np.nan` to a datetime column results in it being `NaT`

</details> 
 
<details> <summary>2. Handling missing data</summary> 

Many, many choices here for cleaning, filling missing data

* Note: don’t forget to include `inPlace=True` if you want to keep the DataFrame in the same variable

* Note: use `axis=` to specifically target rows (0 or ‘index’ a.k.a rows) or columns (1 or ‘columns’). `axis=0` is the default 

* Note: default value for the `how` parameter is `any` 

Related docs:
- [First place I would go is the Kissing values cookbook](https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html#cookbook-missing-data) in the pandas documentation
- [pandas do a on missing values](https://pandas.pydata.org/pandas-docs/stable/user_guide/missing_data.html) has a lot of good info 
* [dropna()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html)
* [fillna()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.fillna.html#pandas.DataFrame.fillna)

# What type of “missing data” are you dealing with?
Rubin (1976. “Inference and Missing Data.” Biometrika 63 (3): 581–90.) gave us three types of missing data that help us both classify the probability that a column has missing data as well as how we want to handle the missing data in that column. 
1. Missing Completely at Random (MCAR)
1. Missing at Random (MAR)
1. Missing Not at Random (MNAR)

## MCAR
If the reason the data is missing is unrelated to the data, you have an MCAR problem

Examples of MCAR:
- Observations of temperature - some data are missing because sensor ran out of batteries for a period
- Log analysis - some samples missing because of a software bug
- “date_of_birth” missing for some samples because it was not a required field in version 1.0 of survey collection tool

## MAR
If the reason the data is missing is related to the data, you have a MAR problem 

Examples of MAR:
- “has_taken_parental_leave” blank for 80% of male respondents because they tend to ignore the question more often than women do (i.e. the reason this value is missing is related to another column, “gender”)

## MNAR
If you have no idea why the data is missing, you are screwed 


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
* Replace with a static value
   * Replace with 0 `df.fillna(0)`
   * Replace with a string `df.fillna(‘__MISSING__’)`
   * The latter allows you to group all NaN into one bucket
* Replace with the previous row’s value `df.fillna(method=‘bfill’)` using ‘forward fill’ (similar to lag in SQL). `backfill` is also accepted
* Replace with the next row’s value `df.fillna(method=‘ffill’)` using ‘forward fill’ (similar to lead in SQL). `pad` is also acceptable 
* Replace with specific values for specific columns 
   * `values = {‘A’: 0, ‘B’: 1}
   * `df.fillna(value=values)`
* Replace only the first NaN `dr.dropna(limit=1)`
   * If axis is rows, only fills the first NaN in the row leaving any remaining unchanged 
   * If the axis is columns, only fills the first NaN value in the column leaving any remaining unchanged 
* Replace with the mean / average 
   * `med = df[‘life_sq’].median()`
   * `df[‘life_sq’].fillna(med)`
* Replace with the mode
* Replace with the regression to predict the correct value
* Replace with a **Stochastic regression** 
* Replace with a **Hot-deck imputation** which replaces NaN with a randomly selected value for the same column from another row that has similar values 
   * See below for `impute` examples

## Interpolation is also an option
interpolate fills missing values by interpolation which is especially useful for sequential or time series data. The default method is linear but it can be changed using method parameter. Some available options are polynomial, quadratic, cubic. 

```python   

# Drop all rows where Area is unassigned
df = df.dropna(subset=['Owner'])

######################################
# When there are (a) relatively few features and (b) a relatively small dataset
# 
# Use a heatmap 
######################################

cols = df.columns[:30] # first 30 columns
colours = ['#000099', '#ffff00'] # specify the colours - yellow is missing. blue is not missing.
sns.heatmap(df[cols].isnull(), cmap=sns.color_palette(colours))

######################################
# When there are (a) relatively few features and (b) a relatively small dataset
# 
# Get the % of missing.
######################################
for col in df.columns:
    pct_missing = np.mean(df[col].isnull())
    print('{} - {}%'.format(col, round(pct_missing*100)))
# update to f string

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
```

 </details> 