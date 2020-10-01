# How to authenticate to AKS clusters

1. Service accounts
    - One of the primary user types in Kubernetes is a service account. 
    - A service account exists in, and is managed by, the Kubernetes API
    - The credentials for service accounts are stored as **Kubernetes secrets**, which allows them to be used by authorized pods to communicate with the API Server
    - Most API requests provide an authentication token for a service account or a normal user account.
    - Managed entirely by AKS; you can't create/manage

2. Azure AD and RBAC to grant users or groups access to only the resources they need

![x](https://i.imgur.com/ZGlN0ls.png)
