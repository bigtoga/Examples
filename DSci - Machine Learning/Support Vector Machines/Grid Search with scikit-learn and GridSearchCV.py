#!/usr/bin/env python
# coding: utf-8

# In[1]:


import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd
import numpy as np
import os


# In[2]:


df = pd.read_csv(os.path.join("..", "Resources", "diabetes.csv"))
df.head()


# In[3]:


target = df["Outcome"]
target_names = ["negative", "positive"]


# In[4]:


data = df.drop("Outcome", axis=1)
feature_names = data.columns
data.head()
print(data.shape)


# In[5]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data, target, random_state=42)


# In[6]:


# Support vector machine linear classifier
from sklearn.svm import SVC 
model = SVC(kernel='linear')


# In[14]:


# Create the GridSearch estimator along with a parameter object containing the values to adjust
# Try adjusting `C` with values of 1, 5, and 10. Adjust `gamma` using .0001, 0.001, and 0.01
from sklearn.model_selection import GridSearchCV

# Combo of C and gamma are the parameters to the model
param_grid = {
        'C': [1, 5]
        , 'gamma': [0.0001, 0.0005]
}
grid = GridSearchCV(model, param_grid, verbose=3)


# In[15]:


# Fit the model using the grid search estimator. 
# This will take the SVC model and try each combination of parameters
grid.fit(X_train, y_train)


# In[23]:


# List the best parameters for this dataset
print(grid.best_params_)

# List the best score
print(grid.best_score_)

# This is what to deploy!
print(grid.best_estimator_)


# In[27]:


results = grid.cv_results_
print(results.get('mean_test_score'))
print(results.get('mean_train_score'))
print(grid.best_params_)
print(grid.best_score_)
print(grid.best_estimator_)


# In[12]:


# Make predictions with the hypertuned model
predictions = grid.predict(X_test)


# In[13]:


# Calculate classification report
from sklearn.metrics import classification_report
print(classification_report(y_test, predictions,
                            target_names=["blue", "red"]))


# In[ ]:
