A way of adding wanted complexity to a model, useful when you are underfitting the data using linear regression. This will convert it to nonlinear regression and hopefully without overfitting. 

https://link.medium.com/JuMDnpXkZ6

http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html

Example using non-linear regression: 
http://scikit-learn.org/stable/auto_examples/linear_model/plot_polynomial_interpolation.html


Example [from SO](https://stackoverflow.com/questions/51906274/cannot-understand-with-sklearns-polynomialfeatures)
```python   
from sklearn.preprocessing import PolynomialFeatures
a = np.array([1,2,3,4,5])
a = a[:,np.newaxis]
poly = PolynomialFeatures(degree=2)
a_poly = poly.fit_transform(a)
print(a_poly)

``` 
