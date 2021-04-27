Dealing with missing data is really a multi-phase process:
1. Detecting missing values
2. Classifying missing data 
3. Handling missing values

If you want to skip this page:
1. IBM has a great reference on their [SPSS overview on missing data analysis](https://www.ibm.com/support/knowledgecenter/en/SSLVMB_23.0.0/spss/mva/idh_miss.html) site
- the [pandas cookbook](https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html#cookbook-missing-data) likely has everything you need to know

<details> <summary>1. Detecting missing values </summary> 

# 1. Detecting missing values
This has two paths: the easy path using `df.isna.sum()`, or the hard path which requires digging into how pandas, Python, and numpy all treat missing data a bit differently. 

## You can stop here if you just want the easy path
`df.isna().sum()` will show you how many missing values per column. 

`df.isna().any()` shows you True/False if a column has at least one missing value

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
 

<details> <summary>2. Classifying Missing Data</summary>  

# What type of “missing data” are you dealing with?
Rubin (1976. “Inference and Missing Data.” Biometrika 63 (3): 581–90.) gave us three types of missing data that help us both classify the probability that a column has missing data as well as how we want to handle the missing data in that column. 
1. Missing Completely at Random (MCAR)
1. Missing at Random (MAR)
1. Missing Not at Random (MNAR)

### Most likely to occur
1. MAR
90. MNAR
99.999 MCAR

### Most impactful to your model’s prediction power
- Worst / highest impact - MNAR (a.k.a. non-ignorable)
- Best / least impact - MCAR, MAR (a.k.a. ignorable)

### Where you will spend your time
- 98% MAR
- 2% MNAR

### Complexity of “the fix” (i.e. handling the missing data):
- Easiest: MCAR
- Hardest: MNAR
- “This is what a data scientist spends his or her time doing 80% of the time”: MAR

### Rules of thumb
1. Drop columns where more than 60% of data is missing
1. If MCAR, delete the observation (a.k.a. listwise deletion)
2. Of MAR, ignore or pairwise delete (i.e. find the correlated feature and delete the intersect)
3. If MNAR, impute

## MCAR
If the reason the data is missing is unrelated to the data and unrelated to how the data was collected, you have an MCAR problem

**Examples of MCAR:**
- Observations of temperature - some data are missing because sensor ran out of batteries for a period
- Log analysis - some samples missing because of a software bug
- “date_of_birth” missing for some samples because it was not a required field in version 1.0 of survey collection tool

**Effects of MCAR** are technically nothing. In theory, if you added the data back in, it would be in same/similar distribution as the rest of the data. In other words, it’s like you randomly removed x% of your data and then tested your model against the remaining. You would expect no change in results if x% was very small

**Likelihood of MCAR** is “extremely rare”. The scenarios above are incredibly uncommon. 

**Strategies for handling MCAR** include
- When the missing data in a column is both (a) a very small percentage of the data, and (b) the rest of the features fall within a normal distribution for each feature, you can use **listwise deletion** (a.k.a. delete the observation /row) without introducing bias 

## MAR
If the reason the data is missing is related to the data or related to how the data was collected, you have a MAR problem 

**Examples of MAR:**
- “weight” is blank for 75% of males vs only 10% of females (i.e. the probability of “weight” being present in an observation is dependent on “gender”)
- “has_taken_parental_leave” blank for 80% of male respondents because they tend to ignore the question more often than women do (i.e. the reason this value is missing is related to another column, “gender”)
- A seismic tracker generates more samples when placed on a hard surface vs. a soft surface (i.e. the reason there is missing data is directly related to the same row’s observed value for “surface_type”)
- When taking a sample of a population, the probability of a subject being included depends on another column (i.e. subjects > 65 who also are male were 80% more likely to be included than any other group)

**Effects of MAR** would most likely be identified during Feature importance or PCA, so this is usually marked as “ignorable”

**Likeliness of MAR** is “pretty much most of your missing data can be explained this way”. Most missing data models/systems start with the assumption that MAR is the reason for all missing data in your dataset 

**How to identify MAR vs MCAR problems** 
- A controversial way is to use **Little’s MCAR Test** (a.k.a. LittleMCAR in R, MCARtest):
   - For each column, calculate a sig value (aka significance value, p-value) using a null hypothesis test for whether missing values are missing completely at random. 
   - Rows with a sig-value > 0.05 are MCAR
   - Many think this test becomes useless as the number of features grows beyond 2 or 3; instead the suggested next step is **multiple imputation** and then a chi-squared test

## MNAR
a.k.a. NMAR (not missing at random)

a.k.a. “Please No” and “Your WF nightmare”

If it’s not MCAR or MAR, it’s MNAR: the data is missing and:
- It appears to be unrelated to how the data was collected 
- It appears that the missing data does not depend on other features

In other words, we don’t have enough information about the data collection methods to identify why it is missing. *MNAR is considered a temporary state* (or perhaps terminal state, more on that later): at some point, with enough time and analysis, the scientists will identify the reasons for the missing data, and will be able to reclassify the missing data as either MAR or MCAR and proceed accordingly. 
- It may sometimes/often be considered a “terminal state” meaning that the scientists remove the missing data/column completely when MNAR is found

In short, there are reasons that the data is missing but, at this time right now, you don’t know what those reasons are!

**Examples of MNAR:**
- Scientists notice random missing data in a temperature probe dataset. It initially appears to be MNAR. After many hours of research, they actually identify a correlation: when the age of the probe is greater than 3.5 years, the probability of having missing data increase by 10% each six months thereafter. However the dataset originally did not contain the id/age of the probe which made it impossible to detect the MCAR relationship in the original data

**Effects of MNAR** would absolutely make your model perform worse. If there are known predictors that determine probability of a sample being in the observation yet those predictors are not in the dataset? Your model would just be flipping a coin each time it encountered a missing MNAR value *at beat*.  At worst, your model would identify an unrelated feature or features as being predictive of this feature, and it’s resulting prediction might be worse than a coin flip. 

**Strategies for handling MNAR** include:
- spending more time understanding why the values are lost
- identifying whether there are additional features that should be in your dataset but aren’t
- Many what-if scenarios of to see how sensitive the model is with or without this or that feature (aka “Can I just drop this feature completely?”)


</details>

<details> <summary>3. Handling missing data</summary> 

Many, many choices here for cleaning, filling missing data. Note that there are both over-arching strategies for handling missing data as well as individual tactics. Need to think strategically to identify the tactics. 
- Strategies for MCAR data
   - Do: 
      - Use Multiple Imputation 
   - Don’t: 
      - Use EM (Expectation Minimization)
- Strategies for MAR data
   - Do: 
      - Use EM (Expectation Minimization) 
   - Don’t: 
- Strategies for MNAR data include 

Note - I stopped here on June 19. Needs much more Seth based on https://www.researchgate.net/post/How_do_I_manage_missing_data_imputation_method_when_having_a_violation_of_the_MCAR_assumption

* Note: don’t forget to include `inPlace=True` if you want to keep the DataFrame in the same variable

* Note: use `axis=` to specifically target rows (0 or ‘index’ a.k.a rows) or columns (1 or ‘columns’). `axis=0` is the default 

* Note: default value for the `how` parameter is `any` 

Related docs:
- [First place I would go is the Missing values cookbook](https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html#cookbook-missing-data) in the pandas documentation
- [pandas do a on missing values](https://pandas.pydata.org/pandas-docs/stable/user_guide/missing_data.html) has a lot of good info 
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