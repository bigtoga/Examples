How Azure changes things:

![x](https://i.imgur.com/EY8Rpu1.png)

# Who is responsible?
Regardless of the deployment type, you always retain responsibility for the following:
- Data
- Endpoints
- Accounts
- Access management

# Scopes in Azure 
Azure provides four levels of scope: management groups, subscriptions, resource groups, and resources. You apply management settings at any of these levels of scope. 
The level you select determines how widely the setting is applied. 
- Lower levels inherit settings from higher levels. For example, when you apply a policy to the subscription, the policy is applied to all resource groups and resources in your subscription. When you apply a policy on the resource group, that policy is applied to the resource group and all its resources. However, another resource group doesn't have that policy assignment.

You can deploy templates to management groups, subscriptions, or resource groups.

## Resource Groups
- A resource group can contain resources that are located in different regions
- A resource group can be used to scope access control for administrative actions
- Why does a resource group need a location? Defines where the storage of the RG's metadata is stored
    - If the resource group's region is temporarily unavailable, you can't update resources in the resource group because the metadata is unavailable. The resources in other regions will still function as expected, but you can't update them.
- Can resources exist in a different location that the one defined for the RG? Yes

## Management Groups 
- Group your subscriptions.
- Provide user access to multiple subscriptions
- Allows for new organizational models and logically grouping of resources.
- Allows for single assignment of controls that applies to all subscriptions.
- Provides aggregated views above the subscription level.
- Mirror your organization's structure.
- Create a flexible hierarchy that can be updated quickly.
- The hierarchy does not need to model the organization's billing hierarchy.
- The structure can easily scale up or down depending on your needs.
- Apply policies or access controls to any service.
- Create one RBAC assignment on the management group, which will inherit that access to all the subscriptions.
- Use Azure Resource Manager (ARM) integrations that allow integrations with other Azure services: Azure Cost Management, Privleged Identity Management, and Azure Security Center.

- ✔️ By using management groups, you can reduce your workload and reduce the risk of error by avoiding duplicate assignments. Instead of applying multiple assignments across numerous resources and subscriptions, you can apply the one assignment on the one management group that contains the target resources. This will save time in the application of assignments, creates one point for maintenance, and allows for better controls on who can control the assignment.

Vendor notes about Mgmt Groups:
>> "Management groups currently do not support blocking inheritance which may limit its usefullness across subscriptions that require a different support structure such as a production subscription versus a lab subscription.  In those cases RBAC roles should be assigned at the Subscription level."

>> "We recommend using Active Directory groups mapped to the individual Azure RBAC roles. This allows for a significantly simpler management of Azure RBAC using tools and processes that are already familiar."

>> Suggested best practice: align Mgmt Groups to the Subscription and use RBAC mapped to Security Groups
