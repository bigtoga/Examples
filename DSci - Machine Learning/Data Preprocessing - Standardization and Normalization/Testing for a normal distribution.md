# Why test for Gaussian distribution?
Many modeling algorithms assume a normal distribution - if you pass in any other type of distribution, you will get unpredictable and generally wrong /inaccurate predictions. 

Many different ways - here are several 
- Shapiro Wilk test
- Histograms
- Box plots
- QQ plots
- Kolmogorov Smirnov test
- Lilliefors test

# What to use when
**I want to test a single variable (Univariate)**
- Visualization: Use a QQ plot
- Visualization: Use a histogram if you need to present the evidence to others
- Statistical test: Use Shapiro-Wills - if p-value is > 0.05, we assume a normal distribution otherwise not normal

**I want to test multiple variables (Multivariate)**
- Visualization: Use a box plot
- Statistical test: Use Shapiro-Wills - if p-value is > 0.05, we assume a normal distribution otherwise not normal

# Shapiro-Wilks Test
Only for testing normal distribution 
```python   
from scipy.stats import norm
from statsmodels.stats import shapiro
my_data = norm.rvs(size=500)
shapiro(my_data)
```


# Histograms 
Looking for typical Gaussian bell curve here. Super simple:
```python   
import pandas as pd
my_data = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 4, 2])
my_data.hist()
```

# Good resources for further reading 
- [Machine Learning Mastery article](https://machinelearningmastery.com/a-gentle-introduction-to-normality-tests-in-python/)
- [Towards Data Science article](https://link.medium.com/Lyk9R1oZa7)