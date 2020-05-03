Support vector machines (SVMs) are a set of supervised learning methods
used for classification, regression and outliers detection.

Support Vector Machines work by establishing a boundary between data points, where
the majority of one class falls on one side of the boundary (a.k.a. line
in the 2D case) and the majority of the other class falls on the other side.

The **margin** is defined as `the distance between the **nearest** point of each class and 
the boundary`. New data points are then plotted and put into a
class depending on which side of the boundary they fall on.

![c](https://i.imgur.com/InH3euo_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

SVMs are most commonly used as models for classification but you can also use SVMs 
for regressions. 

# Resources
* http://scikit-learn.org/stable/modules/svm.html
* https://towardsdatascience.com/machine-learning-models-explained-to-a-five-year-old-f2f540d9dcea

The advantages of support vector machines are:
* Effective in high dimensional spaces.
* Still effective in cases where number of dimensions is greater than the number of samples.
* Uses a subset of training points in the decision function (called support vectors), so it is also memory efficient.
* Versatile: different Kernel functions can be specified for the decision function. Common kernels are provided, but it is also possible to specify custom kernels.

The disadvantages of support vector machines include:
* If the number of features is much greater than the number of samples, avoid over-fitting in choosing Kernel functions and regularization term is crucial.
* SVMs do not directly provide probability estimates, these are calculated using an expensive five-fold cross-validation (see Scores and probabilities, below).

The support vector machines in scikit-learn support both dense (numpy.ndarray and convertible to that by numpy.asarray) and sparse (any scipy.sparse) sample vectors as input. However, to use an SVM to make predictions for sparse data, it must have been fit on such data. For optimal performance, use C-ordered numpy.ndarray (dense) or scipy.sparse.csr_matrix (sparse) with dtype=float64.

----

Linear regression for classification is difficult when there is no clear way of "drawing a line" that shows the correct info

![x](https://i.imgur.com/Y96iT0W.png)

Even if you carve the data up multiple ways, line-based classification just doesn't work for this type of data:

