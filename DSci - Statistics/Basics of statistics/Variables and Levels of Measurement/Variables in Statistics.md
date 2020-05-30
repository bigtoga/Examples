

[Good easy to understand breakdown](https://www.abs.gov.au/websitedbs/a3121120.nsf/home/statistical+language+-+what+are+variables)
> A variable is **any characteristics, number, or quantity that can be measured or counted**.
>It is called a variable because the value may vary between data units in a population, and may change in value over time. 
> ‘income’ is a variable that can vary between data units in a population (i.e. the people or businesses being studied may not have the same incomes) and can also vary over time for each data unit (i.e. income can go up or down). 

What are the types of variables,
[This page lists over 75 types](https://www.statisticshowto.com/probability-and-statistics/types-of-variables/) however generally most data scientists today will use a handful (below).  Variables are classified based on the arithmetic operations that “make sense” with the data (and there’s a difference between “data where addition and subtraction make sense” vs “data where multiplication and division make sense”)
* **Categorical variables** can be either **Nominal** (=, !=, IN(), NOT IN()) or ** Ordinal** (>, <)
  - Nominal = "names"
  - Ordinal = "ranks"
  - Boolean = dichotomous (Y/N, Off/On, Churn/Stay)
* **Numerical variables** can be either **continuous** (+, -) or **discrete** (*, /) and manifest as **integers** or **floating point** / decimals

Jason at [Machine Learning Mastery](https://github.com/bigtoga/Examples/blob/8fe4ecaef8b235441ad674e7911b7385b5320945/DSci%20-%20Machine%20Learning/Phase%20-%20EDA/Feature%20Selection/Feature%20Selection.md) has an easy to read graphical approach to explaining also

## Ordinal or Nominal? 
It can be difficult to decide whether a given categorical feature should be ordinal or nominal. Many hidden ordinal features "look like" nominal features:

Example: You are predicting salary and have a feature named "Education Level" with values like:
  - High school graduate
  - Some college but no degree
  - Associate Degree
  - Bachelor Degree
  - Doctorate Degree
  
Education Level looks like a nominal but, because we are predicting salary, this is ordinal if we think that the Education Level represents a stair step model for increasing salary. Example - maybe we have a coefficient associated with each change in Education Level:
1. Base salary of all: 35,000 per year
2. "High school graduate": coefficient of "+0" (meaning a high school graduate's salary would be predicted as $35,000)
3. "Some college but no degree": coefficient of "+2,000" (salary would be predicted as $37,000)
  - "Associate Degree": coefficient of "+12,000" (salary would be predicted as $47,000)
  - "Bachelor Degree": coefficient of "+32,000" (salary would be predicted as $67,000)
  - "Doctorate Degree": coefficient of "+72,000" (salary would be predicted as $107,000)
