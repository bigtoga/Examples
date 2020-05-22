from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Define our pet table
class Pet(Base):
    __tablename__ = 'pet'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)
    age = Column(Integer)
    
# Right now, this table only exists in python and not in the actual database
Base.metadata.tables

# Create our database engine
engine = create_engine('sqlite:///pets.sqlite')

# This is where we create our tables in the database
Base.metadata.create_all(engine)

# The ORM’s “handle” to the database is the Session.
from sqlalchemy.orm import Session
session = Session(engine)

# The data hasn't been added yet
engine.execute('select * from pet').fetchall()
