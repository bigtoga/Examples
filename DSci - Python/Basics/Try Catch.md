Basic try/catch in python:
```python
try:
  print(x)
except NameError:
  print("Variable x is not defined")
except:
  print("Something else went wrong")
```

Empty except 
```python

try:
  print(x)
except NameError:
  print("Variable x is not defined")
except:
  pass # nothing will be shown
```
