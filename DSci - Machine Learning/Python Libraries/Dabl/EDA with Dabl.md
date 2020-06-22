Let’s check out the Titanic dataset with Dabl

```python   
!pip install dabl 

import pandas as pd
import dabl

df = pd.read_csv(“https://gist.githubusercontent.com/michhar/2dfd2de0d4f8727f873422c5d959fff5/raw/23da2b7680e0c9e1fd831f05f53de3958f0d75fe/titanic.csv)

dabl.clean(df, verbose=1)
``` 

Now check for data types
```python   
data_types = dabl.detect_types(df_clean)
print(data_types)
```

Plot!
```python   
dabl.plot(df_clean, target_col=“Survived”)
```
![?](https://i.imgur.com/QgYapfN_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)