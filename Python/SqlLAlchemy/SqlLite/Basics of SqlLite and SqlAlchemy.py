# SQLAlchemy
from sqlalchemy import create_engine

# Path to sqlite
database_path = "../Resources/Census_Data.sqlite"

engine = create_engine(f"sqlite:///{database_path}")

# Query All Records in the the Database
data = engine.execute("SELECT * FROM Census_Data")

for record in data:
    print(record)
