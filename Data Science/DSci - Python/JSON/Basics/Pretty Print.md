~~~

    # make request
    weather = requests.get(base_url, params=params)
    print(weather)
    
    # convert to json
    weather_json = weather.json()
    print(weather.url)
    print(json.dumps(weather_json, indent=4, sort_keys=True))

~~~
