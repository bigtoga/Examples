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
   
# Role of Mgmt Groups
Management groups are needed for unified policy, access management, and subscriptions.
- Management groups act as containers for subscriptions
- Policies and access management can be scoped around management groups
- Policies applied to management groups are inherited by all subscriptions, resource groups, and resources within that management group
- Azure RBAC roles have no action on the management group, but are inherited by all child resources.

![v](https://i.imgur.com/o4pu02Z.png)

# Things to Know about Management Groups
- Root Management Group cannot be deleted; all others can
- All MGs can only have one parent
- A subscription can only have one MG "parent" (i.e. multiple MGs cannot be a parent of the same subscription)
- Max of 6 levels deep
