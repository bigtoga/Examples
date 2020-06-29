Management Groups allow you to control RBAC and Azure Policy in a single point across subscriptions using inheritance. **As of June, 2020**, Management groups currently 
do not support blocking inheritance which may limit its usefullness across subscriptions that require a different support structure such as a production subscription 
versus a lab subscription.  In those cases RBAC roles should be assigned at the Subscription level.

As a result, it is recommended to use Active Directory groups mapped to the individual Azure RBAC roles. This allows for a significantly simpler management of 
Azure RBAC using tools and processes that are already familiar.  

# Simple design

Root Mgmt Group
- Prod Mgmt Group
   - Prod Subscription
- Non-Prod Mgmt Group
   - Non-Prod Subscription
