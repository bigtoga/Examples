Azure Policies uses two resource providers: 
- Microsoft.Authorization
- Microsoft.PolicyInsights

Permissions required for Azure Policy:
- Resource Policy Contributor role includes most Azure Policy operations. 
- Both Contributor and Reader can use all Azure Policy read operations, but *Contributor can also trigger remediation*

# FAQs
- Can policies be applied across multiple subscriptions? Yes
- Can policies be applied across multiple Management Groups? Yes
