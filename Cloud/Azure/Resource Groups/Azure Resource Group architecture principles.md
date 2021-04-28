# Azure Resource Group Design Principles

First Principles:
1. Resources with the same lifecycle belong in the same RG

Additional Considerations:
1. To simplify RBAC, consider adding "Resources that should have same RBAC" to the same RG
         - Instead of granting "Global Reader" to the subscription, can you grant "Reader" to the RG?