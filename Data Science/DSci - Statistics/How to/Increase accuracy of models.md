Applies to:
* Regression 
* Classification 
* Neural networks

Errors in your predictions can be resolved by:
* Increasing the size of your training data
* Trying smaller sets of features
* Trying additional features
* Trying polynomial features
* Increasing or decreasing *lambda*

Think of “a model” as a formulated hypothesis. This hypothesis was what “the machine” thought would explain the training data that it was presented with the best. In regression, this hypothesis is a linear equation and we can use linear algebra to discuss/explain the hypothesis. In classification, we can still express this as a non-linear equation 

We could easily produce a model that has very low error by passing in our entire dataset as the training set. However we risk overfitting if we do this (i.e. the model is hyper-tuned to the training data but will not predict future/new data well). This is why we use a train/test split and cross validation to allow the model to test its hypotheses over another dataset to identify and reduce high variance (a.k.a. overfitting) and/or high bias (a.k.a. underfitting).

# Bias and Variance
It starts with identifying “where we are” relative to bias and variance 
* High bias is underfitting and high variance is overfitting. We need to find a golden mean between these two
* Reducing bias can often increase variance and vice versa
* The regularization parameter (λ) allows the model to find this golden mean more easily 

In other words, in certain cases, an “inferior algorithm,” if given enough data, can outperform a superior algorithm with less data.

Math terms:
* Θ = error
* λ = regularization parameter which allows the model to fine tune variance and bias changes 

# Principle: split dataset into three sets: train, test, cross-validation
* 60% - train
* 20% - test
* 20% - cross-validation

# Principal: as the training set’s number of features increase, the number of errors increase
Simple linear models based on one feature likely have low errors but will probably be underfit. Quadratic models (two or more features) will likely have low errors also but increased errors with each feature. Polynomial models (many features) will have more errors and likely end up overfitting. For quadratic and polynomial models, the error value will plateau out after a certain m, or training set size

# Principle: Use the “human test” to determine the right features
Given input *x*, would a human expert be able to confidently predict *y*

# Principle: “How much training data” increases as number of features increase
If we have a low bias algorithm (many features or hidden units making a very complex function), then the larger the training set we use, the less we will have overfitting (and the more accurate the algorithm will be on the test set)

# To fix high variance problems
* Larger training set
* Reduce the number of features
* When using gradient descent, decrease λ 
* In neural networks, reduce the number of inner layers
* In neural networks, use cross validation to identify the right number of layers

# To fix high bias problems:
* Add more features
* Add polynomial features
* Larger training set
* When using gradient descent, increase λ
* When using neural networks, increase the number of inner layers
* In neural networks, use cross validation to identify the right number of layers

# Additional resources
[Good explanation](https://rstudio-pubs-static.s3.amazonaws.com/445029_4db337010d6c4af48c545bb64e01a4f1.html)
[Good examples](http://wavedatalab.github.io/machinelearningwithr/post4.html)