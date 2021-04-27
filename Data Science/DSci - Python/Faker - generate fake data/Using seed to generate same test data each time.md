
This will print the same 10 names each time
```python   
from faker import Faker

myGenerator = Faker()

myGenerator.random.seed(42)

for i in range(10):
    print(myGenerator.name())
```
