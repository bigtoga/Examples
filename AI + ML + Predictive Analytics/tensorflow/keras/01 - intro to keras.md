Abstraction build on top of tensorflow. Sort of like how seaborn is built as an abstraction/"on top of" matplotlib

Follows same Model -> Fit -> Predict pattern as others

```shell
condas install tensorflow # Windows
pip install tensorflow # any

from tensorflow.keras.models import Sequential
```

[Google's guide to keras](https://www.tensorflow.org/guide/keras/overview)

In Keras, you assemble `layers` to build `models`. A model is (usually) a *graph of layers*. The most common type of model is a stack of layers: the tf.keras.Sequential model.

# Workflow
## 1. Data preprocessing
1. Scale the data 
* * [Multilayer perceptron models](https://en.wikipedia.org/wiki/Multilayer_perceptron) don't always require scaling but it is often difficult for the training cycle to converge
* * Scale both the training and testing data
2. One-hot encode the labels/categorical data

~~~
# 1. Scale the data
from sklearn.preprocessing import StandardScaler
X_scaler = StandardScaler().fit(X_train)
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)

# 2. One-hot encode
from tensorflow.keras.utils import to_categorical
y_train_categorical = to_categorical(y_train)
y_test_categorical = to_categorical(y_test)
~~~

## 2. Create the model
Note: I'm using a classifier model - these steps may not be same for regressor

1. Decide what kind of model to apply
* For numerical data, we use a regressor model
* For categorical data, we use a classifier model 
2. Define the model architecture (a.k.a. layers)
** We used a Sequential model for classifiers in class
3.1. Add the first layer. This layer requires you to specify:
** The number of inputs
** The number of nodes that you want in the hidden layer


Dan: Start out w the most amount of inputs (nodes) in your first epoch, and then fewer inputs as you get closer to Output

Example of a classifier network: 
![Classifier](https://i.imgur.com/IGmef7C.png)

After adding the first layer to the model:
![qwer](https://i.imgur.com/hvBwS6Y.png)
