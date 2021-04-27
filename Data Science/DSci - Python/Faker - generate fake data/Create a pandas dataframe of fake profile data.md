Trivial - just use [fake.profile()](https://faker.readthedocs.io/en/master/providers/faker.providers.profile.html) and pipe to a Dataframe 

```python   
import pandas as pd
from faker import Faker

fake = Faker()

# Create users from all over the world
fake = Faker([‘it_IT’,’ja_JP’, ‘zh_CN’, ‘de_DE’,’en_US’])

# Use list comprehension to add to a list
profiles = [fake.profile() for i in range(100)]

# Write to a Dataframe 
pd.DataFrame(profiles).head()
```

You can also call `fake.simple_profile()` for a slimmer version