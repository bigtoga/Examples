import requests, json\
response = requests.get("http://api.open-notify.org/astros.json")\
print(response.status_code)


url = "https://api.spacexdata.com/v2/rockets/falcon9"
response = requests.get(url)
response_json = response.json()
print(json.dumps(response_json, indent=4, sort_keys=True))
