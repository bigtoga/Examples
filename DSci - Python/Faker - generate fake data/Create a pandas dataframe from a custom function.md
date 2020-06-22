Easy to do

```python   

from faker import Faker 
import numpy as np
import pandas as pd

fake = Faker() 
def test_data(how_many): 
    # Create a dictionary object 
    friends_data = {} 
    
    for i in range(0, how_many): 
        friends_data[i]={} 
        friends_data[i][‘name’]= fake.name() 
        friends_data[i][‘address’]= fake.address() 
        friends_data[i][‘city’]= fake.city() 
        friends_data[i][‘closeness (1-5)’] = np.random.randint(0,5)
    
    return friends_data
    
friends = create_data(how_many=100)
dfTestData = pd.DataFrame.from_dict(friends)

```
