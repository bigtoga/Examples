There are two types of outliers:
- Natural outliers in the data (called **novelties**)
- Man-made or Process-made outliers that we’re added, updated, caused by human or machine processes
   - These represent errors in the data as they are not natural and were not/would not have been part of the original data

Good “starter” list from [this article](https://link.medium.com/fE9jJd4MO7) (copy paste):
- *Data entry errors (human errors)
- Measurement errors (instrument errors)
- Experimental errors (data extraction or experiment planning/executing errors)
- Intentional (dummy outliers made to test detection methods)
- Data processing errors (data manipulation or data set unintended mutations)
- Sampling errors (extracting or mixing data from wrong or various sources)
- Natural (not an error, **novelties** in data)*

It’s a good starter list but I would change a few things. 
- Sampling errors - outliers caused by sampling too small of a set for training data
- Sourcing errors - outliers caused from extracting data from wrong sources
- Contextual errors - outliers caused by data scientist creating or inferring incorrect relationships / linearity from the data (i.e. joining data from two data sources on one column when the join needed to be on two columns, or when there should not have been a join at all)
- Imputation error - these deserve their own hellish category 