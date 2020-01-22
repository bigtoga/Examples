### Setup:
~~~
# Dependencies and Setup
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import requests
import time
from scipy.stats import linregress
import pprint
import json
from time import sleep
from datetime import date

# Import API key
from api_keys import weather_api_key

# Incorporated citipy to determine city based on latitude and longitude
# pip install citipy
from citipy import citipy

# Output File (CSV)
output_data_file = "output_data/cities.csv"

# Range of latitudes and longitudes
lat_range = (-90, 90)
lng_range = (-180, 180)
~~~

### Add to a dataframe
~~~

# List for holding lat_lngs and cities
lat_lngs = []
cities = []

# Create a set of random lat and lng combinations
lats = np.random.uniform(low=-90.000, high=90.000, size=1500)
lngs = np.random.uniform(low=-180.000, high=180.000, size=1500)
lat_lngs = zip(lats, lngs)

# Create a dataframe and populate w the lat/lon
df = pd.DataFrame(lat_lngs, columns = ['Latitude', 'Longitude']) 

# Add the new columns you later need to get:
df["City"] = ""
df["Country"] = ""
df["Date"] = date.today()
~~~

### Use citipy to get the city/country from the lat/long
~~~
# Loop through the lat/lng and get the closest city (using citipy)
for index, row in df.iterrows():
    city = citipy.nearest_city(row["Latitude"], row["Longitude"])
    
    # If the city is unique, then add it to a our cities list
    if city not in cities:
        #cities.append(city)
        df.loc[index, "City"] = city.city_name
        df.loc[index, "Country"] = city.country_code
df.head()
~~~
