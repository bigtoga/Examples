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


