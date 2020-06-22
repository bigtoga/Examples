Faker is amazing - https://faker.readthedocs.io/en/master/providers/faker.providers.geo.html

Use cases for Faker:
- Generating one off test data
- Generating entire data sets for testing

Examples below copied from excellent tutorial [here](https://semaphoreci.com/community/tutorials/generating-fake-data-for-python-unit-tests-with-faker)

1. Create an instance of Faker()
```python   
!pip install faker

from faker import Faker

myFactory = Faker()

# List our all of the ways you can use Faker
dir(myFactory)
```

You can be very granular and create data type specific test data:
```python   
from faker import Faker
from faker.providers import internet

fake = Faker()

# Randomly returns True/False
fake.pybool()   

# Random float data
print(fake.pyfloat(left_digits=3, right_digits=3, positive=False, min_value=None, max_value=None))   

# Random string data
print(fake.pystr(min_chars=None, max_chars=10))  # String data

# Random lists
print(fake.pylist(nb_elements=5, variable_nb_elements=True))  

```

Now you can create fake data of just about anything. Perfect for mocks or generating test data

```python   
myFactory.text()

myFactory.words()
# [‘libero’, ‘commodi’, ‘deleniti’]

>>> myFactory.name()
# ‘Joshua Wheeler’

>>> myFactory.month()
# ‘04’

>>> myFactory.sentence()
# ‘Iure expedita eaque at odit soluta repudiandae nam.’

>>> myFactory.state()
# ‘Michigan’

>>> myFactory.random_number()
# 2950548

# You can generate data in other languages too
from faker import Factory

myGenerator = Factory.create(‘ru_RU’)

print(myGenerator.name())
# Мельникова Прасковья Андреевна
```

You can loop and generate as many fakes as you want
```python   
for _ in range(10):
  print(fake.name())

```

Another powerful part of Faker is its implementation of **providers**. It has both built in along with community written providers and, if that’s not enough, you can write your own. 
