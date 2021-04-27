Sriram G

# Workflow
1. Data sources
2. Model Dev
   - Model Creation
   - Model Training
3. Model Deployment
4. Model Monitoring
5. Retraining Model 

# Questions
1. Guidance for subscription design? RBAC?

1. How to choose compute size?
Think about what the workload is and how large it is. If I'm doing modeling in R, I know it's only going to use 1 core. 
* Compute instances are not shared so you get all
* They've looked at doing what CoLab Pro does which is making you part of a pool
* Code optimization

1. Can I get a golden compute instance that has all dependencies already? 
Yes, use the SDK instead of portal

1. Integrate w AWS for raw data storage?
