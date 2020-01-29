### Bash

~~~
alias az=az.cmd
az login

az group list
RESOURCE_GROUP='AADesignLab0701-RG'
COSMOSDB_NAME=$(az cosmosdb list --resource-group $RESOURCE_GROUP --query "[0].name" --output tsv)
echo $COSMOSDB_NAME

# Error: jq does not exist. Can't pip install jq either
# PRIMARY_KEY=$(az cosmosdb keys list --resource-group $RESOURCE_GROUP --name $COSMOSDB_NAME --output json | jq -r '.primaryMasterKey')
pk_json=$(az cosmosdb keys list --resource-group $RESOURCE_GROUP --name $COSMOSDB_NAME --output json)
json.dumps(pk_json)

# Two ways to get the URL
# Option "Don't do this":
URI="https://$COSMOSDB_NAME.documents.azure.com:443/"

# Option "Do this instead":
URI=$(az cosmosdb list --resource-group $RESOURCE_GROUP --query "[0].documentEndpoint" --output tsv)

# Create the new database
az cosmosdb database create --url-connection $URI --key $PRIMARY_KEY --db-name 'FinancialClubDatabase'

# Create a new collection
az cosmosdb collection create --url-connection $URI --key $PRIMARY_KEY --db-name 'FinancialClubDatabase' --collection-name 'MemberCollection' --throughput 400

~~~

### SQL Queries
~~~
# Open Data Explorer (in Azure Portal)
# Enter the MemberCollection container
# Click Items, then the top button for "New Item"
# Replace what is generated with this and execute:

{
    "firstName": "Pennington",
    "lastName": "Oneal",
    "age": 26,
    "salary": 90000.00,
    "company": "Veraq",
    "isVested": false
}

# Add another new item:
{
    "firstName": "Suzanne",
    "lastName": "Oneal",
    "company": "Veraq"
}

# Run a new query:
SELECT * FROM c

# Note the results

# Now filter to only return Items that have a node/element "isVested":
# The "c.isVested" requires the c. part
SELECT * 
FROM c
WHERE IS_DEFINED(c.isVested)

# Return just the primary keys (the "id" column values):
SELECT VALUE c.id
FROM c

~~~
