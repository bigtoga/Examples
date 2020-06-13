The correlation coefficient of two variables captures how linearly related they are (aka pairwise correlation). 

Multiple ways of going about this:
1. “Two at a time” method is selecting two variables and working with just those two
   - Visualizations of the two variables vs. one another
   - 1. Calculate commonly accepted coefficient correlation tests such as Spearman’s, Pearson’s, Kendal-Tau
2.  “All at once” method is to look at all combinations of two variables compared in a matrix
   - Visualizations are plotted then you review to look for skew
   - Correlation values are calculated for each pair/combination of features
   
Examples of using visual skew to identify correlation ([image source](https://realpython.com/numpy-scipy-pandas-correlation-python/):

![?](https://i.imgur.com/OQm6JEW_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# “Two at a time” method examples
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