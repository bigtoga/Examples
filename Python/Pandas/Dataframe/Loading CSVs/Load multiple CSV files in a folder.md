Step 1: Have multiple CSV files in a folder

Step 2. Use chaining w .glob()

```python
import csv
from pathlib import Path
import pandas as pd
import glob

for in_path in Path('D:\MyFolder').glob('*.txt'):
     out_path = in_path.with_suffix('.csv')
     
     with in_path.open('r') as fin, out_path.open('w', newline='') as fout:
        df = pd.load_csv(fin)
        df.head()
        print('-----------')
```
