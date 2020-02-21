# Import SQLAlchemy `automap` and other dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

# Create the connection engine
engine = create_engine("sqlite:///../Resources/dow.sqlite")

# Create the inspector and connect it to the engine
inspector = inspect(engine)

# Collect the names of tables within the database
inspector.get_table_names()

# Using the inspector to print the column names within the 'dow' table and its types
columns = inspector.get_columns('dow')
for column in columns:
    print(column["name"], column["type"])

# Multiple options for opening / referring to files:
#Unix/Mac - 4 initial slashes in total
# engine = create_engine('sqlite:////absolute/path/to/foo.db')
#Windows
# engine = create_engine('sqlite:///C:\\path\\to\\foo.db')
#Windows alternative using raw string
# engine = create_engine(r'sqlite:///C:\path\to\foo.db')
