Part of Dimensionality Reduction and is used to reduce features to the most predictive/valuable

**unsupervised dimensionality reduction technique** that constructs relevant features/variables using combinations of the original variables (features). There are two ways PCA works:
1. linear (linear PCA) - most commonly used
1. non-linear (kernel PCA) 

# Dimensionality Reduction
Many techniques to reduce the number of dimensions but most commonly used are:
- Feature Elimination:
   - Eliminate/drop any features which increase model training time but offer no value
   - Look at Feature Selection 

## Feature Extraction
After Feature Elimination, let’s say you are left with ten independent variables. With Feature Extraction, you will create 10 new columns/variables, each containing a specific combination of the ten independent variables

**PCA is a Feature Extraction technique**

# When to use PCA
1. You want to reduce the number of independent variables but are not able to identify which variables can be safely removed
2. **And** you want to ensure your variables are independent of one another
3. **And** you are okay with making your independent variables less interpretable 
 If you answered “Yes” to all three questions, use PCA!
 
 # 3 common ways to determine how many features to keep/drop
 ## Method 1: hand pick
 
 ## Method 2: Calculate a variance threshold and remove all features below it - see my Feature Selection page
 
 ## Method 3: Use PCA to determine the proportion of variance between the variables. Use a scree plot, plot the eigenvalue for each eigenvector
 * The proportion of variance of the features you *kept* divided by the eigenvalues of all of the features
 * [Eigenvectors and eigenvalues](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors)


> often used to visualize genetic distance and relatedness between populations. PCA is either done by **singular value decomposition of a design matrix** or by doing the following 2 steps:
1. calculating the data covariance (or correlation) matrix of the original data
1. performing **eigenvalue decomposition** on the covariance matrix

# Resources
[Basics of PCA](https://link.medium.com/TPC8U5LDI6)
* [Wikipedia](https://en.wikipedia.org/wiki/Principal_component_analysis)