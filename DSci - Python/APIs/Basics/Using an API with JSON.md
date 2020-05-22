# Dependencies
import requests\
import json

url = "https://api.spacexdata.com/v2/launchpads"

print(requests.get(url).json())

# Raw JSON output:
print(requests.get(url).json())

# Pretty print:
response = requests.get(url).json()\
print(json.dumps(response, indent=4, sort_keys=True))
