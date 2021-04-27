~~~
import requests, json
url = "https://api.spacexdata.com/v2/launchpads

# Get the API response:
response = requests.get(url).json()

# Pretty Print the output of the JSON
print(json.dumps(response, indent=4, sort_keys=True))
~~~

~~~

    # Get one of the posts
    response = requests.get(url + movie)
    # Save post's JSON
    response_json = response.json()
    
    # Prnt
    pprint(response_json)
~~~
