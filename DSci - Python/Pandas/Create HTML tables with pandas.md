Multiple ways - I like this example:

```python   
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

%matplotlib inline

import utils as u
from IPython.core.display import HTML

HTML(u.create_table(pd.read_csv(“binary_example.csv”)))
```
