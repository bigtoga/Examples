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

![d](https://i.imgur.com/ZjZyRYt.png)

### Other things to consider
Note that if k={same as the number of data points}, then the current data point being evaluated will be
classified as "whatever the class of the majority is" (i.e. it's a popularity algorithim at that point)

Some people like k={square_root_of_the_number_of_data_points} also

Cookie cutter example code based on https://scikit-learn.org/stable/auto_examples/neighbors/plot_nca_classification.html
~~~
#!/usr/bin/env python
# coding: utf-8

# In[1]:


import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd
import os


# In[2]:


df = pd.read_csv(os.path.join("..", "Resources", "diabetes.csv"))
df.head()


# In[5]:


y = df["Outcome"]
target_names = ["negative", "positive"]


# In[6]:


X = df.drop("Outcome", axis=1)
X.head()


# In[13]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)


# In[14]:


type(X_train)


# In[18]:


from sklearn.preprocessing import StandardScaler

# Create a StandardScater model and fit it to the training data
# If you just try X_train.reshape(), you get error 'DataFrame' object has no attribute 'reshape'
# To fix, access the underlying numpy array object and then you can call reshape()
# https://stackoverflow.com/questions/42240376/dataframe-object-has-no-attribute-reshape
X_scaler = StandardScaler().fit(X_train.values.reshape(-1, 1))


# In[19]:


# Transform the training and testing data using the X_scaler and y_scaler models
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)


# In[23]:


# Loop through different k values to see which has the highest accuracy
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
    
plt.plot(range(1, 20, 2), train_scores, marker='o', color='orange')
plt.plot(range(1, 20, 2), test_scores, marker="x", color='blue')
plt.xlabel("k neighbors")
plt.ylabel("Testing accuracy Score")
plt.show()


# In[26]:


# Choose the best k from above and re-fit the KNN Classifier using that k value.
# print the score for the test data
# Note that k: 15 provides the best accuracy where the classifier starts to stablize
knn = KNeighborsClassifier(n_neighbors=15)
knn.fit(X_train_scaled, y_train)
print('k=15 Test Acc: %.3f' % knn.score(X_test_scaled, y_test))
~~~
