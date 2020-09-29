Jeff: I think of Password hash sync and Pass-through Auth. as alternatives, use one or the other.

|   	|  Password hash sync 	|   Pass-through Auth.	|   Federated	|   	|
|---	| ---| --- |---	|---	|
| Sync pw w AAD? 	|   x	|   	|   	|   	|
| Can sign into AAD w pw? 	| x  	|   	|   	|   	|
| Productivity up?  	| x  	|   	|   	|   	|
| MFA supported?  	|   	|  x 	|   	|   	|
| Self-service password reset supported?  	|   	|  x 	|   	|   	|
| Supported in **Free** edition  	|   	|  x 	|   	|   	|
| Supports password expiration  	|   	|   x	|   	|   	|
| Requires on-prem DC to auth  	|   	|  x 	|   x	|   	|
| Requires P1 or P2  	|   	|   	|   x	|   	|
| Azure AI/ML can notify you of breached credentials/leaks  	|   	|  x 	|   	|   	|
| Tenant level - applies to all domains in tenant  	|   	|   x	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|

# Password Hash Synchronization

## Password Writeback

- By default, disabled - one-way sync "from on-prem to the cloud". 
- Requires P1 or P2
- Removes need to set up on-prem SSPR solution

# Azure Active Directory External Identities Decision Tree

- **Azure AD** (sometimes also referred to as Azure AD B2E - Business to Enterprise) - When writing applications for Azure AD, you can target users from a single organization (single tenant), or users from any organization that already has an Azure AD tenant (called multi-tenant applications).
- **Azure AD B2B** (Business to Business) - extension on top of Azure AD that allows you to work with external identities, mainly for collaboration scenarios using Microsoft applications (e.g. Office 365, Microsoft Teams, PowerBI, ...). 
    - You invite external users into your own tenant as “guest” users that you can then assign permissions to (for authorization) while still allowing them to keep using their existing credentials (for authentication) inside their own organization
- **Azure AD B2C** (Business to Consumer, Customer or even Citizen) - This is a separate directory service (but still built on top of the global Azure AD infrastructure) which enables you to customize and control how customers sign up, sign in, and manage their profiles when using your applications.

