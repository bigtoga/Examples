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
<details><summary>1. Data preprocessing</summary>
  
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

</details>
<details><summary>2. Create the model</summary>

## 2. Create the model
Note: I'm using a classifier model - these steps may not be same for regressor

1. Decide what kind of model to apply
* For numerical data, we use a regressor model
* For categorical data, we use a classifier model 
2. Define the model architecture (a.k.a. layers)
** We used a Sequential model for classifiers in class
3. Add the first layer that includes:
** The number of inputs
** The number of nodes that you want in the hidden layer
4. Add the output layer

Dan: Start out w the most amount of inputs (nodes) in your first epoch, and then fewer inputs as you get closer to Output

~~~
# 2. Define the model architecture
from tensorflow.keras.models import Sequential
model = Sequential()

# 3. Add the first layer
from tensorflow.keras.layers import Dense
number_inputs = 3
number_hidden_nodes = 4
model.add(Dense(
    units=number_hidden_nodes
    , activation='relu'
    , input_dim=number_inputs
))

# 4. Add the output layer
number_classes = 2
model.add(Dense(units=number_classes, activation='softmax'))

model.summary()
~~~

Example of a classifier network: 
![Classifier](https://i.imgur.com/IGmef7C.png)

After adding the first layer to the model:
![qwer](https://i.imgur.com/hvBwS6Y.png)

The final output layer:
![output](https://i.imgur.com/1N8JBQy.png)

Output of model.summary()
![sds](https://i.imgur.com/8M7OHiZ.png)

</details>
<details><summary>3. Compile the model</summary>
  
## 3. Compile the Model
Now that we have our model architecture defined, we must compile the model using a loss function and optimizer. We can also specify additional training metrics such as **accuracy**.  
  
~~~
# Use categorical crossentropy for categorical data and mean squared error for regression
# Hint: your output layer in this example is using software for logistic regression (categorical)
# If your output layer activation was `linear` then you may want to use `mse` for loss
model.compile(
    optimizer='adam'
    , loss='categorical_crossentropy'
    , metrics=['accuracy']
)
~~~

</details>
<details><summary>4. Train the model</summary>

## 4. Training the Model
Training consists of updating our weights using our optimizer and loss function. In this example, we choose 1000 iterations (loops) of training that are called **epochs**. We also choose to shuffle our training data and increase the detail printed out during each training cycle.

~~~
# Fit (train) the model
model.fit(
    X_train_scaled,
    y_train_categorical,
    epochs=1000,
    shuffle=True,
    verbose=2
)
~~~

</details>
<details><summary>5. Quantifying the model</summary>
  
## 5. Quantifying the Model
We use our testing data to validate our model. This is how we determine the validity of our model (i.e. the ability to predict new and previously unseen data points)
  
~~~
# Evaluate the model using the testing data
model_loss, model_accuracy = model.evaluate(
    X_test_scaled, y_test_categorical, verbose=2
)
print(f"Loss: {model_loss}, Accuracy: {model_accuracy}")
~~~
  
 
</details>
<details><summary>6. Use the model to predict new data</summary>
  
## 6. Use the model to predict new data

We can use our trained model to make predictions using `model.predict`  
  
~~~
import numpy as np
new_data = np.array([[0.2, 0.3, 0.4]])
print(f"Predicted class: {model.predict_classes(new_data)}")
~~~
</details>
  
