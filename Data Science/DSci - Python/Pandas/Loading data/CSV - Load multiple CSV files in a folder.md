Step 1: Have multiple CSV files in a folder

Step 2. Use chaining w .glob()

```python
import csv
from pathlib import Path
import pandas as pd
import glob

li = []

for in_path in Path('D:\MyFolder').glob('*.csv'):
    df = pd.read_csv(in_path, index_col=None, header=0)
    li.append(df)

li.head()
```
