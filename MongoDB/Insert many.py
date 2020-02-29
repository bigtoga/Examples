# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.store_inventory

# Drops collection if available to remove duplicates
db.produce.drop()

# Creates a collection in the database and inserts two documents
db.produce.insert_many(
    [
        {
            'type': 'Jessica',
            'cost': '4',
            'stock': 4
        },
        {
            'type': 'Mark',
            'cost': '5',
            'stock':45
        },
        {
            'type': 'Mark1',
            'cost': '6',
            'stock':45
        },
        {
            'type': 'Mark2',
            'cost': '4.1',
            'stock':45
        },
        {
            'type': 'Mark18',
            'cost': '2',
            'stock':45
        }
    ]
)
