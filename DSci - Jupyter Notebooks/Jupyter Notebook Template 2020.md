# Cell 1:
```python
import pandas as pd
pd.set_option('display.max_rows', 25)
pd.set_option('display.max_columns', 50)

import numpy as np

import winsound

# Tell Jupyter to display all text, not just "the last" and print()
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = 'all'

%pwd

def DoneNotice(duration_ms = 1000):
    duration = duration_ms  # milliseconds
    freq = 440  #Hz
    winsound.Beep(freq, duration)

from IPython.display import Markdown, display
def Important(html_tag, message, color):
    colorstr = f"<{html_tag} style='color:{color}'>{message}</{html_tag}>"
    display(Markdown(colorstr))
```

# Cell 2:
```python
%%time 

DoneNotice()

Important("h1", "Hey!", 'red')
```
