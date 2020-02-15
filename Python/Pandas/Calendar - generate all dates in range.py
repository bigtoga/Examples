iport pandas as pd
import datetime as dt

start_date = dt.datetime(2020, 2, 15)
end_date = dt.datetime(2021, 2, 15)

pd.date_range(start_date, end_date, freq='W')
