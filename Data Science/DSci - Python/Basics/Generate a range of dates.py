import matplotlib.pyplot as plt
from matplotlib.dates import MonthLocator, YearLocator
import numpy as np

fig, ax = plt.subplots(1, 1)

x = np.arange('1965-01', '1975-07', dtype='datetime64[D]')
y = np.random.randn(x.size).cumsum()
ax.plot(x, y)

yloc = YearLocator()
mloc = MonthLocator()
ax.xaxis.set_major_locator(yloc)
ax.xaxis.set_minor_locator(mloc)
ax.grid(True)
