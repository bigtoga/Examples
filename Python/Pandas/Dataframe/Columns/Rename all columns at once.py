import pandas as pd
jobs_DF = pd.read_csv('data/nyc-jobs.csv')
new_columns = [column.replace(' ', '_').lower() for column in jobs_DF]
jobs_DF.columns = new_columns
