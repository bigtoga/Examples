knn

Classification mostly but sometimes regression. High memory requirements.
Fairly simply, particularly when compared to modern neural networks in other libraries (tensorflow keras packages)

k=*n*

When `k=1`, this is simply 'nearest neighbor' to the current data point:
1. Find the point nearest your new data point
2. Classify your current data to be the same as the nearest neighbor

When `k=3`, we find the 3 closest neighbords:
1. Find the 3 points nearest your new data point
2. Classify your current data to be the same as the "most"

`k` should never be an even number or you will get ties

![r](https://i.imgur.com/KPz8oPP.png)

https://scikit-learn.org/stable/auto_examples/neighbors/plot_nca_classification.html

From ns_K_Nearest_Neighbors.ipynb
~~~
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()

X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

from sklearn.preprocessing import StandardScaler

# Create a StandardScater model and fit it to the training data
X_scaler = StandardScaler().fit(X_train.reshape(-1, 1))

# Transform the training and testing data using the X_scaler and y_scaler models
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)

# Cookie-cutter code for getting 'n' (k=n) dynamically
# Loop through different k values to see which has the highest accuracy
# Note: We only use odd numbers because we don't want any ties
train_scores = []
test_scores = []

# 1 to 20 step by 2
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

~~~


plt.show()

