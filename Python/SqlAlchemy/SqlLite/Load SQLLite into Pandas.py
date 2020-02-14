# Pandas
import pandas as pd

# SQL Alchemy
from sqlalchemy import create_engine

database_path = "../Resources/Census_Data.sqlite"

# Create Engine
engine = create_engine(f"sqlite:///{database_path}")
conn = engine.connect()

# Query All Records in the the Database
data = pd.read_sql("SELECT * FROM Census_Data", conn)

# Preview the Data
data.head()
