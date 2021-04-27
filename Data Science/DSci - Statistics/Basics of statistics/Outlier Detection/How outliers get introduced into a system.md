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

It’s a good starter list but I would change a few things - 
- Sampling errors - outliers caused by sampling too small of a set for training data
- Sourcing errors - outliers caused from extracting data from wrong sources
- Contextual errors - outliers caused by data scientist creating or inferring incorrect relationships / linearity from the data (i.e. joining data from two data sources on one column when the join needed to be on two columns, or when there should not have been a join at all)
- Imputation error - these deserve their own hellish category 

# Categorizing based on when and where the outlier was introduced

The “distance” between “when the outlier was introduced” and “when the outlier detection occurs” is directly proportional to the effort the data scientist must go through to identify whether the outliers are novelties or man-made or process-made. In an ideal world, the final model has no man-made or process-made outliers this the model can predict the natural outliers better. 

I think there is roughly “an order of magnitude“ difference in difficulty between the four systems to find/fix-or-remove the non-natural outliers to create the ideal model. This is from the data scientist’s perspective. 

1. Systems of Delivery
   - Relatively easy to identify non-natural outliers introduced here
   - Relatively easy to to fix if outliers were introduced here
2. Systems of Intelligence
   - Perhaps 10x more difficult to identify 
   - ~10x more difficult to fix
3. Systems of Record
   - Again ~10x more difficult to find, to fix
4. Systems of Engagement 
   - Another ~10x more difficult to find, to fix 


## Outliers introduced in the System of Engagement
Natural **novelty** outliers aside, there are many various “not natural outliers” that can be introduced in the System of Engagement. 

What’s important to understand is that, for the data science team to detect *these* outliers, the data science team would have to 100% know the System of Engagement. 
   - Bugs (code, logic, race conditions)
   - Lack of input validation 
   - Environmental conditions (resource offline)
   - Inconsistency of input (multiple “feeders” but one or more have older/ newer / different versions of code)
   - External issues (integrations failing)
   - Resiliency and/or stability issues (i.e. dependency unavailable yet code allows invalid value such as NULL or error code to be stored in source)
   - Timing issues (loaded a cache table before a critical backend processing job was complete)
   - Dependency issues (loading a cache table that is populated by a backend processing job yet that job completed with error)
   
## System of Record
   - Bugs (code, logic, race conditions)
   - ETL / ELT bugs
   - Wrong data understanding 

## System of Intelligence
   - Bugs
   - Feature extraction done incorrectly 
   - Feature engineering done incorrectly
   - Performing univariate analysis instead of multivariate or vice versa and making go-forward decisions on incorrect analysis
   
## System of Delivery 
   - Bugs