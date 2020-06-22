Chances are high that someone else has already built a provider for “that thing you want”. 
- [List of built in providers](https://faker.readthedocs.io/en/master/providers.html)
- [List of community written providers](https://faker.readthedocs.io/en/master/communityproviders.html)

Examples using providers
```python   
from faker import Faker
from faker.providers import internet

fake = Faker()

# Generate a fake private IPv4 address
fake.add_provider(internet)
print(fake.ipv4_private()) 

```


# Additional resources 
- [Good examples of providers here](https://link.medium.com/xhn7p26uw7)
- [Good overall overview here](https://semaphoreci.com/community/tutorials/generating-fake-data-for-python-unit-tests-with-faker)