import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

# Create the connection engine to the file
engine = create_engine("sqlite:///../Resources/database.sqlite")

# Reflect Database into ORM class
Base = automap_base()
Base.prepare(engine, reflect=True)

# mapped classes are now created with names by default
Emoji = Base.classes.emoji

# Reflect Database into ORM class
Base = automap_base()
Base.prepare(engine, reflect=True)
Emoji = Base.classes.emoji
