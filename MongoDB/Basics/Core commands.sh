# Connect to mongo
mongo 

# Create a new database
use mydb

db # echos "mydb"

show dbs # lists all databases

# Create a collection
db.createCollection("divers")

# insert rows:
db.divers.insert({
   name: 'Python Overview', 
   yearsDiving: 90,
   stillDiving: true,
   bestFinds: ['C++', 'VB', 'SQL']
})

# Update same field in every document
db.divers.updateMany({}, {$set: {"yearsDiving": 1}})

db.divers.remove({"Country": "Canada"})
