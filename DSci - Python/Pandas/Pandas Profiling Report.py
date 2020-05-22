import numpy as np
import pandas as pd
from pandas_profiling import ProfileReport

df = pd.DataFrame(
    np.random.rand(100, 5),
    columns=['a', 'b', 'c', 'd', 'e']
)

profile = ProfileReport(df, title='Pandas Profiling Report', html={'style':{'full_width':True}})

# Create a tabbed "application" style report
profile.to_widgets()

# A more SPA style report
profile.to_notebook_iframe()
