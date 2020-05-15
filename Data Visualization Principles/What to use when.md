# Types of Analysis 
* Univariate
* Bivariate
* Multivariate

### A Quick Note On Variables in Statistical Analysis
From [What is Univariate Analysis?](https://www.statisticshowto.com/univariate/):
>A **variable** in univariate analysis is just a condition or subset that your data falls into. You can think of it as a “category.” For example, the analysis might look at a variable of “age” or it might look at “height” or “weight”. However, it doesn’t look at more than one variable at a time otherwise it becomes bivariate analysis (or in the case of 3 or more variables it would be called multivariate analysis).

Variables are columns / dataseries or even subsets of each. If your dataframe has 50 columns, you have 50 variables at the start. 

# Quantitative or Qualitative Variables?
* **Categorical variables** (sometimes called qualitative variables) are categories (like eye color or brand of dog food) 
* **Numeric variables** (sometimes called quantitative variables) are just that: numbers

*General rule of thumb*: If you can add to it, it’s likely a numeric variable and thus quantitative. If you can’t add to it, it’s likely categorical and thus qualitative 

### Examples 
| Measure | Data examples | Type of variable | Discrete or continuous? |
|—|—|—|—|
| Grade point average | 4.0, 3.5 | Numeric | Continuous |
| Letter grade Average |  A-, B+ | Categorical | Discrete |
| Account balance average | $987, $612 | Numeric | Continuous |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

|   |   |   |   |
|—|—|—|—|
|   |   |   |   |
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
