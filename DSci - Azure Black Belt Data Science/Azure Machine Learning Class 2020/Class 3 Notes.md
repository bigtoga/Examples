# AutoML
Benefits:
1. Hyperparameter tuning is automatic
2. Automatically spins up compute clusters for you
3. Auto feature engineering
4. Will basically do what PyCaret's `compare_model()` does - compares results 

## Featurization
* Can disable if you don't need it
* Can do minimal impute (mean, mode)

Built off of [DP-100 Azure Data Scientist Associate certification](https://docs.microsoft.com/en-us/learn/paths/build-ai-solutions-with-azure-ml-service/)

# Questions
1. Does AutoML do PCA by default or only on request? If so, what are the options?
2. WHen I choose a compute cluster, does it auto spin down when my auto ML is done?
   	- It depends on how you created. If you use minimum of 0 nodes, it will auto-spin down
3. Why does it take so long to get the first result back? 45 minutes for 1,000 row file using 4 core 16GB RAM cluster
  	- Expect 15-20 minutes to spin up compute clusters generally
4. Compute power required for explain model - does that require same horsepower as model comparison/auto?
  	- Unknown - by default it will only explain the winning model but you can save
5. Difference between Azure's autoML and PyCaret?
  	- 
7. Azure Model Registry?
	- Yes - just called "Models" in ml.azure.com
8. Can we disable public internet URLs/access? 
	- Possibly yes w Azure Private Link
9. Pipelines GUI - is this as awful as SSIS Designer is / was? 
	- Just script it out
	- But you can use it as a starting point - it will generate the code for you and you can then tweak
10. ML Ops - can be kicked off by Azure DevOps pipelines?
	- Yes
11. For DP-100 labs, should someone be able to complete all of that using their $50/mth Azure credits?	
	- Be disciplined and maybe
	- 
	
