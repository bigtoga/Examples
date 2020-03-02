# How many rows in the groups?
merged.groupby(grp).count()

# Aggregates per group
~~~
import statistics as st
# Generate a summary statistics table of mean, median, variance, standard deviation, and SEM of the tumor volume for each regimen
grp = "Drug Regimen"
aggColumn = 'Tumor Volume (mm3)'
newdf = merged.groupby(grp).agg({aggColumn: [
        np.count_nonzero, np.mean, np.median, np.var, np.std, st.sem]})
newdf
~~~

~~~
aggs = df.groupby(["ClosedMonth", "Owner"]).agg({
        'MinutesOpen': [
            np.count_nonzero
            , np.mean
            , np.median
            , np.var
            , np.std
        ]
})
aggs
~~~

~~~
aggs = df.groupby(["ClosedMonth", "Owner"]).agg({
        'DaysOpen': [
            np.count_nonzero
            , np.mean
            , np.median
            , np.var
            , np.std
        ]
}).reset_index() # Gets rid of auto aggregation/hierarchy
aggs
# aggs = aggs.to_frame()
# aggs = aggs.reset_index(level=['ClosedMonth', 'Owner'])
~~~
