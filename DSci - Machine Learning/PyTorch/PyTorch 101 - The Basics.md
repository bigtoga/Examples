PyTorch has two goals:
- To be the numpy of GPU processing; meaning they do what numpy does using parallel GPU operations (numpy is neither multiprocessor or GPU based)
- to be a deep learning framework that provides speed and flexibility 

# Tensors
A **tensor** is a mathematical term for a multi-dimensional matrix. For simplicity, consider this a multi-dimensional array. 

In PyTorch, a tensor is a first class primitive and is used to model everything - scalars, vectors, and matrices

You can treat PyTorch tensors like numpy arrays. 

```python   
inputs = np.array([[73, 67, 43], 
                   [91, 88, 64], 
                   [87, 134, 58], 
                   [102, 43, 37], 
                   [69, 96, 70]], dtype=‘float32’)

outputs = np.array([[56, 70], 
                    [81, 101], 
                    [119, 133], 
                    [22, 37], 
                    [103, 119]], dtype=‘float32’)

inputs = torch.from_numpy(inputs)
outputs = torch.from_numpy(outputs)
```
# Linear Regression in PyTorch
In PyTorch, the **@** represents matrix multiplication
```python   
w = torch.randn(2, 3, requires_grad=True)
b = torch.randn(2, requires_grad=True)

# Performing multiple linear regression by hand using formula 
# y = (w1 x1) + (w2 + x2)... + b
# b is bias
# x is variable 
# w is weight or coefficient 

def model(x):
    return x @ w.t() + b
    
# Define the loss function as mean square error - essentially we calculate the
# differences between predicted values and real values
# then square the result and calculate the average
# 
# .numel returns the number of elements in a tensor
def mse(pred, real):
    difference = pred - real
    return torch.sum(difference * difference) / difference.numel()
``` 

Now we want to leverage optimization technique Gradient Boosting (loss.backward)
- Split the training into 200 `epochs`
- During each epoch, calculate predictions, loss and gradients
- Based on the gradients, we will adjust the weights by subtracting a small quantity proportional to the gradient

Note that the `.zero_()` method resets the gradients 

```python   
for i in range(200):
    predictions = model(inputs)
    loss = mse(predictions, outputs)
    
    print(f’Epoch: {i} - Loss: {loss}’)
    
    loss.backward()
    with torch.no_grad():
        w -= w.grad * 1e-5
        b -= b.grad * 1e-5
        w.grad.zero_()
        b.grad.zero_()
```

Source for the above: https://rubikscode.net/2020/06/08/pytorch-for-beginners-basic-concepts/