# How many rows in the groups?
merged.groupby(grp).count()

# Aggregates per group
~~~
# Generate a summary statistics table of mean, median, variance, standard deviation, and SEM of the tumor volume for each regimen
grp = "Drug Regimen"
aggColumn = 'Tumor Volume (mm3)'
newdf = merged.groupby(grp).agg({aggColumn: [
        np.count_nonzero, np.mean, np.median, np.var, np.std, st.sem]})
newdf
~~~
