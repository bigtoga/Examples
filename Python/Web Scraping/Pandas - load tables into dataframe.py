import pandas as pd
df = pd.read_html('https://en.wikipedia.org/wiki/Python_(programming_language)', header=0)[1]
df.head()
