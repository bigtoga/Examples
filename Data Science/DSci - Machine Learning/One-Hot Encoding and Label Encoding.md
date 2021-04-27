Label Encoding simply encodes each category (categorical data) as an integer value. Sklearn provides a preprocessing library to assist with this. Some models are sensitive to Integer Encoding. Distance equations in clustering algorithms are particularly sensitive.

Encoding a step in the **preprocessing** of data. From SMU: 
> Preprocessing Review
Why do we preprocess data when we build machine learning pipelines?

We preprocess data for two principle reasons:
1. To transform the data to better suit a model's underlying assumptions
2. To format the data in the way a model expects.

## Neural networks and preprocessing
Inputs to neural networks are **vectors**. Each entry in the vector corresponds to a feature, which the net uses to make predictions.

Crucially, these **vectors contain can contain only numerical data**. They cannot contain string data.

Reference SMU notebook `One_Hot_Encoding.ipynb`

> Note that all of our data is numerical...Except for the data in that class column, which contains strings.
> The `class` column will contain one of three values:
>> iris-setosa
>> iris-versicolour
>> iris-virginica
> As these are not numerical values, we can't use them to fit our nnet. To fix this, we must convert each `class` label to a numerical value.
--- 
> **Label Encoding**. First, we convert the three possible classes to integer labels. E.g., iris-setosa will be 1; iris-versicolour, 2; and iris-virginica, 3.
> **One-Hot Encoding**. Then, we set each row's class value to an array. This array will have a 1 in whichever slot corresponds to the integer label. E.g., after one-hot encoding, a row with the class iris-setosa will have the array [1, 0, 0]. A row with class iris-virginica, the array [0, 0, 1]; etc.

**In many cases, categories in the data sets you work with will already be label-encoded. In this case, you can apply one-hot encoding immediately.**

~~~
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

brain = pd.read_csv('Resources/brain_categorical.csv')
brain.head()
~~~
|  | gender | age | size  	| weight|
|---	|---	|---	|---	|--- |
|  0 	|  Male 	|  20-46 	|   4512	| 1530 |
|   1	|   Male	|   20-46	|   3738	|1335 |
|   2	|   Female	|   20-46	|4261| 1335 |

~~~
X = brain[["gender", "age", "size"]]
y = brain["weight"].values.reshape(-1, 1)
print(X.shape, y.shape)

from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()

data = X.copy()

label_encoder.fit(data["gender"])
label_encoder.classes_
~~~
>> array(['Female', 'Male'], dtype=object)

~~~
label_encoder.transform(data.gender)
~~~
>> array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0])
