Faker is amazing - https://faker.readthedocs.io/en/master/providers/faker.providers.geo.html

Examples below copied from excellent tutorial [here](https://semaphoreci.com/community/tutorials/generating-fake-data-for-python-unit-tests-with-faker)

1. Create an instance of Faker()
```python   
!pip install faker

from faker import Faker

myFactory = Faker()

# List our all of the ways you can use Faker
dir(myFactory)
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
 
```

# How to use Faker with unit testing
Let’s create two files, example.py (the actual code to test) and test.py

example.pr defines a `User` class which has a constructor which sets attributes `first_name`, `last_name`, `job` and `address` upon object creation.

It also defines class properties `user_name`, `user_job` and `user_address` which we can use to get a particular user object’s properties.


```python   
# example.py

class User:
  def __init__(self, first_name, last_name, job, address):
    self.first_name = first_name
    self.last_name = last_name
    self.job = job
    self.address = address

  @property
  def user_name(self):
    return self.first_name + ‘ ‘ + self.last_name

  @property
  def user_job(self):
    return self.user_name + “ is a “ + self.job

  @property
  def user_address(self):
    return self.user_name + “ lives at “ + self.address
    
```
It’s trivial to generate the test data using Faker

```python   
# test.py

import unittest

from faker import Faker

from example import User

class TestUser(unittest.TestCase):
    def setUp(self):
        self.fake = Faker()
        self.user = User(
            first_name = self.fake.first_name(),
            last_name = self.fake.last_name(),
            job = self.fake.job(),
            address = self.fake.address()
        )

    def test_user_creation(self):
        self.assertIsInstance(self.user, User)

    def test_user_name(self):
        expected_username = self.user.first_name + “ “ + self.user.last_name
        self.assertEqual(expected_username, self.user.user_name)

```


