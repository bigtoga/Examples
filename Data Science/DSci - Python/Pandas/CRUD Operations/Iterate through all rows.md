## Use this if you only need the non-index column data:
~~~
TODO
~~~
## Use this if you *also* the index value as well as the row value:
~~~
import pandas as pd
import numpy as np

df = pd.DataFrame([{'c1':10, 'c2':100}, {'c1':11,'c2':110}, {'c1':12,'c2':120}])

for index, row in df.iterrows():
    print(row['c1'], row['c2'])

Output: 
   10 100
   11 110
   12 120
~~~~

## Real world example using API:
### The Setup:
~~~
# Dependencies
# Dependencies
import pandas as pd
import numpy as np
import requests
import json

# Google API Key
from config import gkey
~~~

### Create a one-column dataframe w index, then manually add additional columns you want to populate
~~~
types_df = pd.read_csv("../Resources/ethnic_restr.csv")
types_df.head()

# set up additional columns to hold information
types_df['name'] = ""
types_df['address'] = ""
types_df['price_level'] = ""
types_df['rating'] = ""

types_df.head()
~~~

### Call your API
~~~~
# find the closest restaurant of each type to coordinates

base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
params = {
    "location": "39.952583,-75.16522",  # philadelphia coords,
    "rankby": "distance",
    "type": "restaurant",
    "key": gkey,
}
~~~~

### Loop using iterrows()
~~~
# use iterrows to iterate through pandas dataframe
for index, row in types_df.iterrows():

    # get restaurant type from df
    restr_type = row['ethnicity']

    # add keyword to params dict
    params['keyword'] = restr_type

    # assemble url and make API request
    print(f"Retrieving Results for Index {index}: {restr_type}.")
    response = requests.get(base_url, params=params).json()
    
    # extract results
    results = response['results']
    
    try:
        print(f"Closest {restr_type} restaurant is {results[0]['name']}.")
        
        types_df.loc[index, 'name'] = results[0]['name']
        types_df.loc[index, 'address'] = results[0]['vicinity']
        types_df.loc[index, 'price_level'] = results[0]['price_level']
        types_df.loc[index, 'rating'] = results[0]['rating']
        
    except (KeyError, IndexError):
        print("Missing field/result... skipping.")
        
    print("------------")
    
~~~
