# EDA processes
- Identity variance in the data
- Identify covariant between your features
- **Identify the correlation coefficients in your features** (you are here)
- Looking for lurking variables (a.k.a. hidden variables and/or Simpson’s Paradox)

# Variance, covariant, and correlation 
**Variance** is a measure of variability from the mean. 
**Covariance** is a measure of relationship between the variability of 2 variables - covariance is scale dependent because it is not standardized
**Correlation** is a of relationship between the variability of of 2 variables - correlation is standardized making it not scale dependent

# Variance explained
Good examples [here](https://www.pythonfordatascience.org/variance-covariance-correlation/)
> Variance is a measure of how much the data for a variable varies from it’s mean. 

Equation:
![?](https://i.imgur.com/GCQ12wE_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)
- x<sub>i</sub> is the *i*th observation
- x with the bar on top is the mean
- *N* is the number of observations

Calculating this manually for a dataset of “Commercials watched” would produce the following results:

Variable: Commercials Watched
- *Mean = (10 + 15 + 7 + 2 + 16)/ 5 = 10.00
- Variance (<sub>s2</sub>) = ((10 - 10)<sup>2</sup> + (15 - 10)<sup>2</sup> + (7 - 10)<sup>2</sup> + (2 - 10)<sup>2</sup> + (16 - 10)<sup>2</sup> ) / (5 - 1)
-  Variance (<sub>s2</sub>) = 33.5

## Viewing variance with Pandas
```python   
import pandas as pd
import numpy as np

# Set a seed so the example is reproducible
np.random.seed(42)

df = pd.DataFrame(np.random.randint(low= 0, high= 20, size= (5, 2)),
                  columns= [‘Commercials Watched’, ‘Product Purchases’])

df.var()

```
> Commercials Watched    33.5
> Product Purchases      27.5
> dtype: float64

# Covariance explained
Covariance, like correlation, is a measurement of how one variable influences another variable or set of variables. The difference between Covariance and Correlation is that one is scale independent and one is scale dependent. 
- Correlation is scale independent which makes it far easier to interpret the results
- Covariance is scale independent which obfuscates the details

We can view both the variance and the covariance with Pandas:
```python   
df.cov()
```

![?](https://i.imgur.com/GQhzcGy_d.jpg?maxwidth=640&shape=thumb&fidelity=medium

This is a fairly clean example 
- Where x meets itself on the y a is = variance
- Where x meets y on the y axis = covariance

We could interpret from the above that, for every 10 commercials watched, a person would be likely to purchase 1 product

# Correlation 
I have a much more in depth correlation coefficients post here but here’s what `df.corr()` produces:

![?](https://i.imgur.com/GasJ4Fu_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Although we don’t get a nice “It takes 10 commercials before someone buys” summary, correlation coefficients using Pearson’s z-score do standardization/standardize the data before calculating 

We have a rather weak positive correlation but we can say there is a statistical relationship between these two variables

