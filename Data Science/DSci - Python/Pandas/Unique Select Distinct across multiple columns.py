df = df.sort_values(by="ClosedWeekNumber", ascending = True);

aggs = df[['ClosedWeek', 'ClosedWeekNumber']].drop_duplicates()

aggs
