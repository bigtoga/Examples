## Return the non-index column data:
~~~
TODO
~~~
## Return the index value as well as the row value:
~~~
import pandas as pd
import numpy as np

df = pd.DataFrame([{'c1':10, 'c2':100}, {'c1':11,'c2':110}, {'c1':12,'c2':120}])

for index, row in df.iterrows():
    print(row['c1'], row['c2'])

Output: 
   10 100
   11 110
   12 120
~~~~
