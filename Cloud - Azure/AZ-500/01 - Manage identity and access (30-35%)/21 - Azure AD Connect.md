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

 It is important to understand that this is same sign-in, not single sign-on. The user still authenticates against two separate directory services, albeit with the same user name and password. This solution provides a simple alternative to an AD FS implementation.

## Password Writeback

- By default, disabled - one-way sync "from on-prem to the cloud". 
- Requires P1 or P2
- Removes need to set up on-prem SSPR solution

# Pass-through Authentication

Supports user sign-in into all web browser-based applications and into Microsoft Office client applications that use modern authentication.

Sign-in usernames can be either the on-premises default username (userPrincipalName) or another attribute configured in Azure AD Connect (known as Alternate ID).

Works seamlessly with conditional access features such as Multi-Factor Authentication to help secure your users.

Integrated with cloud-based self-service password management, including password writeback to on-premises Active Directory and password protection by banning commonly used passwords.

Multi-forest environments are supported if there are forest trusts between your AD forests and if name suffix routing is correctly configured.

PTA is a free feature, and you don't need any paid editions of Azure AD to use it.

PTA can be enabled via Azure AD Connect.

PTA uses a lightweight on-premises agent that listens for and responds to password validation requests.

Installing multiple agents provides high availability of sign-in requests.

PTA protects your on-premises accounts against brute force password attacks in the cloud.

✔️ This feature can be configured without using a federation service so that any organization, regardless of size, can implement a hybrid identity solution. Pass-through authentication is not only for user sign-in but allows an organization to use other Azure AD features, such as password management, role-based access control, published applications, and conditional access policies.

# Azure Active Directory External Identities Decision Tree

- **Azure AD** (sometimes also referred to as Azure AD B2E - Business to Enterprise) - When writing applications for Azure AD, you can target users from a single organization (single tenant), or users from any organization that already has an Azure AD tenant (called multi-tenant applications).
- **Azure AD B2B** (Business to Business) - extension on top of Azure AD that allows you to work with external identities, mainly for collaboration scenarios using Microsoft applications (e.g. Office 365, Microsoft Teams, PowerBI, ...). 
    - You invite external users into your own tenant as “guest” users that you can then assign permissions to (for authorization) while still allowing them to keep using their existing credentials (for authentication) inside their own organization
- **Azure AD B2C** (Business to Consumer, Customer or even Citizen) - This is a separate directory service (but still built on top of the global Azure AD infrastructure) which enables you to customize and control how customers sign up, sign in, and manage their profiles when using your applications.

![x](https://i.imgur.com/KORUGIM.png)
