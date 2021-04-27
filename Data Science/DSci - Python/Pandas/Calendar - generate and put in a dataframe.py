import pandas as pd
import numpy as np
import seaborn as sns
import datetime

import matplotlib.pyplot as plt
import matplotlib.mlab as mlab
import matplotlib
plt.style.use('ggplot')
from matplotlib.pyplot import figure

%matplotlib inline
matplotlib.rcParams['figure.figsize'] = (12,8)

pd.options.mode.chained_assignment = None

# Create a datetime variable for today
base = datetime.datetime.today()
# Create a list variable that creates 365 days of rows of datetime values
date_list = [base - datetime.timedelta(days=x) for x in range(0, 365)]

# Create an empty dataframe
df = pd.DataFrame()
# Create a column from the datetime variable
df['datetime'] = date_list

df.head()
