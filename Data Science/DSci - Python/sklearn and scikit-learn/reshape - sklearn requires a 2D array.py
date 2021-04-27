# https://scikit-learn.org/stable/tutorial/basic/tutorial.html

%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Read the csv file into a pandas DataFrame
brains = pd.read_csv('../Resources/brain.csv')
brains.head()

>> Four columns: gender, age, size, weight

# Assign the data to X and y
# Note: Sklearn requires a two-dimensional array of values
# so we use reshape to create this

X = brains["weight"].values.reshape(-1, 1) # -1 = all rows, 1 = columns 0 + column 1
y = brains["size"].values.reshape(-1, 1)

print("Shape: ", X.shape, y.shape)
>> Shape:  (237, 1) (237, 1)
