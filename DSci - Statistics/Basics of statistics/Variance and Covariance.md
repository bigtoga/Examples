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
