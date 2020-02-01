### File: pi_keys.py
~~~
g_key = "Your Google API key"
~~~

### File: MyJupyterNotebook.ipynb:
(api_keys.py must be in same location as jupyer notebook in this example)
~~~
from api_keys import g_key
gmaps.configure(api_key=g_key)
~~~

### File: .gitignore file
~~~
api_keys.py
~~~
