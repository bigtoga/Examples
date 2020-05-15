# Types of Analysis 
* Univariate
* Bivariate
* Multivariate

### A Quick Note On Variables in Statistical Analysis
From [What is Univariate Analysis?](https://www.statisticshowto.com/univariate/):
>A **variable** in univariate analysis is just a condition or subset that your data falls into. You can think of it as a “category.” For example, the analysis might look at a variable of “age” or it might look at “height” or “weight”. However, it doesn’t look at more than one variable at a time otherwise it becomes bivariate analysis (or in the case of 3 or more variables it would be called multivariate analysis).

Variables are columns / dataseries or even subsets of each. If your dataframe has 50 columns, you have 50 variables at the start but will likely (a) remove those that are highly correlated to reduce processing time, and (b) add additional *classes* based on categorical analysis. 

# What type of variables are you dealing with?
Variables come in two types: categorical and numeric/quantitative 

* **Categorical variables** (sometimes called qualitative variables) are categories (like eye color or brand of dog food) and answers to Boolean questions (“Are you currently a student? Yes/No”)
* **Numeric variables** (sometimes called quantitative variables) are just that: numbers

*General rule of thumb*: If you can add to it, it’s likely a numeric variable and thus quantitative. If you can’t add to it, it’s likely categorical and thus qualitative 

## “But Scott, what about dates? Time? I can add to each but they aren’t numeric values?”
Nuance comes into play here. “It depends who you ask as to whether dates/times are considered categorical or quantitative” is what I’ve found. 

Let’s start with `year` rather than a full `datetime` value. **Is `year` categorical or quantitative?**
* “I can add to it, so it must be quantitative”
* That’s why the above is a rule of thumb and not a law - “just because you can doesn’t mean you should”:
   * Average of two years ((2019 + 2020) / 2) is nonsensical in most situations
      * If you did a time-based average, the result would be a datetime (“January 1, 2020 00:00:00.000”)
      * If you did a numerical/qualitative average, the result would be numeric continuous (“2019.5”)
   * Year data is generally categorical however there are use cases where it can be quantitative 
   * *Good rule of thumb* is to treat `year` as categorical unless the number of years is “a really large number” at which point interval or quantitative might be better (a.k.a. “It depends on what type of analysis you are trying to do”)
   
**But** it all depends on what you’re trying to do. `year` is a *discretization* of `datetime`. Let’s imagine you have a dataset with three variables: `dateOfMeasurement`, `yearsOfAge`, and `height`. If you create a `year` feature, you might have 80+ years for one individual. It might be entirely meaningful to ask “What was the average height between ages 30 and 50?”
* Step 1: collect the `year` values where `yearsOfAge` between 30 and 50
* Step 2: get the average (“2005.3”)
* Step 3: Get the `height` of the closest measurement to the average

In the above example, `year` is a discretization of a **continuous interval variable** which makes it a quantitative/numeric variable. 

But again: just because you can doesn’t mean you should or would event want to. 

### Examples 
| Measure | Data examples | Type of variable | Discrete or continuous? |
|:---|:---|:---|:---|
| Grade point average | 4.0, 3.5 | Numeric | Continuous |
| Letter grade Average |  A-, B+ | Categorical | Discrete |
| Account balance average | $987, $612 | Numeric | Continuous |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

Discrete 

Continuous 

If you aren’t quite sure of the difference, see: Qualitative or quantitative? How to tell.

# Univariate data
Viewing one variable only. 

### Trends and Pattern Analysis 
Most common would be `central tendency` (mean, mode and median) and `dispersion`: range, variance, maximum, minimum, quartiles (including the interquartile range), and standard deviation.

### Most common visualizations include:
* Frequency Distribution tables
   * How often something happened
   * frequency distribution tables
* Bar Charts
* Frequency Polygons
* Pie Charts
* Box plot
* distribution plots
* Count plots

```python 
import seaborn as sns
import numpy as np
import pandas as pd

df = pd.DataFrame({‘Income’: [54,23,44,55,66,],
                   ‘Population’:[77,88,87,88,89],
                   ‘Number’:[1,1,0,0],
                   ‘Category’:[‘A’,’A’,’B’,’B’,’C’]})

# Univariate analysis is viewing just one variable
sns.distplot(df.Income) # numeric
sns.boxplot(df.Income) # numeric
sns.distplot(df.Population)
sns.countplot(df.Category) # categorical
sns.countplot(df.Number)
```

# Bivariate data analysis 
Examples:
* Viewing a continuous variable against a discrete variable 

Common visualizations 
* Bar charts - first thing most people think of 

```python 
## Bivariate analysis
sns.jointplot(‘Income’, ‘Population’, data = df, kind=‘scatter’)
sns.lmplot(df.Income, df.Population, data=df, hue=‘Number’, fit_reg=False)
sns.countplot(Category, hue = ‘Number’, data=df)
```

```python 
## Multivariate analysis
sns.pairplot(df.select_dtypes(include=[np.int, np.float]])

``` 
