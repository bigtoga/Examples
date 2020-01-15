import urllib, json\
url = "http://maps.googleapis.com/maps/api/geocode/json?address=googleplex&sensor=false"\
response = urllib.urlopen(url)\
data = json.loads(response.read())\
print data

json_url = urlopen(url)\
data = json.loads(json_url.read())\
print data

# Requests libary
import requests\
r = requests.get('url')\
print r.json()
