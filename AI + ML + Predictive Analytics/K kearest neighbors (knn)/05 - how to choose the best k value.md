Good resources:
* https://towardsdatascience.com/machine-learning-basics-with-the-k-nearest-neighbors-algorithm-6a6e71d01761?gi=44925b046a9

Step 1: Use the cookie cutter code below to plot the k values across your test dataset 
and your training data set

Step 2: Find the first instance (aka left-most) where the "Testing accuracy Score" of 
the test dataset (orange line) and the training dataset (blue) are the closest. This is 
the "1" circle in the graphic

Step 3: If this is the start of a fairly stable line (aka the line continues along the 
same y axis values to the right), choose the x axis value of the *next* plotted data point
(circle 2 in the graphic = "15")

~[d](https://i.imgur.com/ZjZyRYt.png)

Note that if k={same as the number of data points}, then the current data point being evaluated will be
classified as "whatever the class of the majority is" (i.e. it's a popularity algorithim at that point)

Cookie cutter example code based on https://scikit-learn.org/stable/auto_examples/neighbors/plot_nca_classification.html
~~~
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
print(iris.DESCR)

# Note: We only use odd numbers because we don't want any ties
train_scores = []
test_scores = []

for k in range(1, 20, 2):
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    train_score = knn.score(X_train_scaled, y_train)
    test_score = knn.score(X_test_scaled, y_test)
    train_scores.append(train_score)
    test_scores.append(test_score)
    print(f"k: {k}, Train/Test Score: {train_score:.3f}/{test_score:.3f}")
    
    
plt.plot(range(1, 20, 2), train_scores, marker='o')
plt.plot(range(1, 20, 2), test_scores, marker="x")
plt.xlabel("k neighbors")
plt.ylabel("Testing accuracy Score")
plt.show()
~~~
