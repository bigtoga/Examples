

```python   
import random

from faker import Faker
from faker.providers import BaseProvider

fake = Faker()

# Note that this is already built in using fake.state()
# Just using a simple example to show what is possible 

class MyProvider(BaseProvider):
    def destination(self):
        destinations = [‘NY’, ‘CO’, ‘CA’, ‘TX’, ‘RI’]

        # Return a random destination  
        return random.choice(destinations)

fake.add_provider(MyProvider)

print(fake.destination())
```
