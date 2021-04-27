# How to authenticate to AKS clusters

1. Service accounts
    - One of the primary user types in Kubernetes is a service account. 
    - A service account exists in, and is managed by, the Kubernetes API
    - The credentials for service accounts are stored as **Kubernetes secrets**, which allows them to be used by authorized pods to communicate with the API Server
    - Most API requests provide an authentication token for a service account or a normal user account.
    - Managed entirely by AKS; you can't create/manage

2. Azure AD and RBAC to grant users or groups access to only the resources they need

![x](https://i.imgur.com/ZGlN0ls.png)

With Azure AD-integrated AKS clusters, you can grant users or groups access to Kubernetes resources within a namespace or across the cluster. 
- To obtain a `kubectl` configuration context, a user can run the `az aks get-credentials` command. When a user then interacts with the AKS cluster with kubectl, they are prompted to sign in with their Azure AD credentials. This approach provides a single source for user account management and password credentials. The user can only access the resources as defined by the cluster administrator.

Azure AD authentication in AKS clusters uses **OpenID Connect**, an identity layer built on top of the OAuth 2.0 protocol. OAuth 2.0 defines mechanisms to obtain and use access tokens to access protected resources, and OpenID Connect implements authentication as an extension to the OAuth 2.0 authorization process.
