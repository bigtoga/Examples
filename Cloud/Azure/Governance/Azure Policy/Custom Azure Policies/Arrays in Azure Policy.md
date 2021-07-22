[Good documentation here](https://docs.microsoft.com/en-us/azure/governance/policy/how-to/author-policies-for-arrays)

# In and Not In

```json
{
      "field": "tags.environment",
      "in": [ "dev", "test" ]
}

{
      "field": "tags.environment",
      "notIn": [ "dev", "test" ]
}
```

# Match an established pattern using Like

Use `count` with `like`
```json
{
    "count": {
        "value": [ "test*", "dev*", "prod*" ],
        "name": "pattern",
        "where": {
            "field": "name",
            "like": "[current('pattern')]"
        }
    },
    "greater": 0
}
```

# Arrays

Instead of `"type": "string"`, change to array:
```json
"parameters": {
    "allowedLocations": {
        "type": "array",
        "metadata": {
            "description": "The list of allowed locations for resources.",
            "displayName": "Allowed locations",
            "strongType": "location"
        },
        "defaultValue": "eastus2",
        "allowedValues": [
            "eastus2",
            "eastus",
            "westus2"
        ]

    }
}
