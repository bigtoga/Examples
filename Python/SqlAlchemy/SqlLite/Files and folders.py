# Relative path is the path 'raw' after the three initial slashses
e = create_engine('sqlite:///path/to/database.db')
e = create_engine('sqlite:///relative/path/here.db')

# Absolute path is a slash after the three initial slashses
e = create_engine('sqlite:////tmp/absolute_path_database.db')

# Dynamic:
db_path = os.path.join(os.path.dirname(__file__), 'app.db')
db_uri = 'sqlite:///{}'.format(db_path)
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
