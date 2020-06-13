The correlation coefficient of two variables captures how linearly related they are (aka pairwise correlation, bivariate correlation). 

Multiple ways of going about this:
1. “Two at a time” method is selecting two variables and working with just those two
   - Visualizations of the two variables vs. one another
   - 1. Calculate commonly accepted coefficient correlation tests such as Spearman’s, Pearson’s, Kendal-Tau
2.  “All at once” method is to look at all combinations of two variables compared in a matrix
   - Visualizations are plotted then you review to look for skew
   - Correlation values are calculated for each pair/combination of features
   
Examples of using visual skew to identify correlation ([image source](https://realpython.com/numpy-scipy-pandas-correlation-python/):

![?](https://i.imgur.com/OQm6JEW_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# The iris dataset

Example using the iris dataset:
- All flowers contain a sepal and a petal.
- The sepal encloses the petals and is typically green and leaf-like, while the petals are typically colored leaves
- The ‘target’ column, which is the target variable, is the species of the iris flowers, which can either be Versicolor, Virginica or Setosa. In the dataset, they are label encoded as 0, 1, and 2

```python   
from sklearn import datasets
iris = datasets.load_iris()

df = pd.DataFrame(
   data= np.c_[iris[‘data’]
   , iris[‘target’]]
   , columns= iris[‘feature_names’] + [‘target’]

df.head()
```

<details><summary>Generally accepted correlation coefficients </summary>

Three main standards in statistics are in play here:
- **Pearson’s coefficient** which measures linear correlation
- **Spearman’s coefficient** and **Kendall-Tau coefficients** compare the *ranks* of data and are thus useful with both **continuous and ordinal** variables
   - Spearman’s is better than Pearson’s at removing outliers and focusing it’s determination of linearity on the “core” data 
   
[Ranks in statistics](https://en.wikipedia.org/wiki/Ranking#Ranking_in_statistics) are a way to transform the data when sorting. Used by many statistical functions. Examples:
- [3.4, 5.1, 2.6, 7.3] would become [2, 3, 1, 4] 
- [hot, cold, warm] would be replaced by [3, 1, 2]. 
- In these examples, the ranks are assigned to values in ascending order. (In some other cases, descending ranks are used.) 

### Pearson’s Correlation Coefficient 
Goes by many names ([wikipedia](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient)
- Pearson’s *r*
- Scale of -1 to +1
- -1 is a perfect negative correlation 
- +1 is a perfect positive correlation 

Generally accepted as an accurate way to accept or reject a null hypothesis using statistical means (a.k.a. *statistical inference*)

### Spearman’s ρ
\rho 

https://en.wikipedia.org/wiki/Rank_correlation

https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient

**Spearman’s rank correlation coefficient** 

> The **Spearman correlation is less sensitive than the Pearson correlation to strong outliers** that are in the tails of both samples. That is because Spearman’s ρ limits the outlier to the value of its rank.

Spearman’s coefficient, Spearman’s rho (Greek letter `rho` is written as curly looking `p`).

</details> 

<details><summary>”Two at a time method</summary>

# “Two at a time” method examples

## Visually compare and look for skew
Compare two variables for linearity, sepal length and sepal width:
```python   
sns.lmplot(
   x=‘sepal length (cm)’
   , y=‘sepal width (cm)’
   , fit_reg=False # disables linear regression 
   , data=df
);
```
![?](https://i.imgur.com/xsvnB4J_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

At first glance, there does not appear to be a clear and obvious linear relationship. We’re trying to answer questions like:
- For the entire dataset, are sepal length and width positively or negatively correlated across all flowers? 
   - Positively correlated would be “As sepal length increases, sepal width also increases”
   - Negatively correlated would be “As sepal length increases, seal width decreases”
- For a given species of flower, are they positively or negatively correlated 
   - Within each species (Versicolor, Virginica or Setosa), do we see a positive or negative correlation between sepal length and width?

Let’s plot using species as the color this time:
```python   
sns.lmplot(
   x=‘sepal length (cm)’
   , y=‘sepal width (cm)’
   , fit_reg=False
   , data=df
   , hue=‘target’
);
```
![?](https://i.imgur.com/45wdDT8_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Aha! Now we can see what appear to be fairly strong linear relationships showing a `positive skew` a.k.a. positive correlation that tells us as the sepal length increases, the sepal width also increases. 
- A **positive skew** “lifts up” from left to right 
- A **negative skew** “trends down” from left to right
- You can reverse any positive to a negative and vice versa by simply switching x and y variables

## Measure the correlation strength using a standard calculation 

We can plot the correlation coefficient *r* in pandas:
```python   
df[‘sepal length (cm)’].corr(df[‘sepal width (cm)’])
``` 
>> 0.86 # Note: this is fake - I just made this up
The return value of 0.86 would indicate that there is a *statistically relevant* linear relationship between these two variables 
</details> 

<details> <summary>”All at once” method</summary>  

We can view all features using `corr()` method. With this, we can see two things:
- How each variable “relates” to every other variable 
- How each variable “relates” with the target variable
```python   
df.corr()
```
![?](https://i.imgur.com/bK3VdpI_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

A paradox appears:
- Sepal width and sepal length across the entire dataset `skew left` slightly showing a slightly negative correlation of -0.109369
- However, if you look at the relationship “by variety”, those display a positive skew

Let’s group by our target variable (the variety of flower):
```python   
df.groupby([‘target’]).corr()
```
![?](https://i.imgur.com/1f231jb_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)


What do we see when we just focus on petal length vs. petal width (that had a negative correlation of -0.109369 for the entire dataset)?
- Versicolor (0) shows a very positive correlation of +0.75
- Virginica (1) shows a strong +0.5
- Setosa (2) shows a decent positive correlation of +0.46

## What’s going on? How can we have an overall negative correlation across the entire dataset but each group has a positive correlation?
This is known as [Simpson’s Paradox](http://ftp.cs.ucla.edu/pub/stat_ser/r414.pdf)

* **Simpson’s Paradox** : A trend or result that is present when data is put into groups that reverses or disappears when the data is combined.*

Here’s a great visual example from [this Towards Data Science article](https://link.medium.com/umJNIRZsh7):

![?](https://i.imgur.com/N2K2y0p_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

The data on the left plots the correlation over the entire dataset, while the right plot shows the relationship between the two groups represented within the data (‘male’ and ‘female’)

### Beware of **lurking variables**
Simpson’s Paradox shows up when there are **hidden variables** within your dataset. These hidden or lurking variables hide bias in your dataset and you must identify these early on and work hard to remove these, or to extract new features from them, or, worst case, you may need to discard the dataset as its sampling methods may be unscientific and thus unusable. 

These quotes sum up your responsibilities as a data scientist ([source](https://link.medium.com/ELJIN9Yth7):
> The correct decision is entirely situational and this is part of the reason why data science exists at the intersection of mathematics/statistics, computer science and business/domain knowledge: **We need to know our data, and more importantly, what we want out of our data, in order to choose which approach to take**
> In every situation, the key is to interpret the data in relation to the underlying domain, and to take the most appropriate data-viewpoint.

For our iris data problem, we could tackle this multiple ways:
1. Option 1: split the data into “one dataset for each variety of flower” then re-run our correlation matrices

Looking for hidden variables and trying to identify Simpson’s Paradox is part of the EDA process

- [Good explanation](https://link.medium.com/hc9MS4Jsh7)
- [Examples with pandas](http://www.degeneratestate.org/posts/2017/Oct/22/generating-examples-of-simpsons-paradox/)
- [Example Python function to detect Simpson’s Paradox issues](https://github.com/CamDavidsonPilon/simpsons-paradox)

</details> 
