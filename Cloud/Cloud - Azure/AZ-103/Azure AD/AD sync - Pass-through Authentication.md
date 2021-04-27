https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-quick-start

**Azure Active Directory (Azure AD) Pass-through Authentication** allows your users to sign in to both on-premises and cloud-based applications by using the same passwords. 
**Pass-through Authentication signs users in by validating their passwords directly against on-premises Active Directory.**

You can enable Pass-through Authentication on the Azure AD Connect primary or staging server. It is highly recommended that you enable it from the primary server.

# Installation
1. AD Connect **Custom installation**
1. Pass-through authentication
1. Behind the scenes, the installer will create a Pass-through Authentication agent on the local on-prem domain controller

Pass-through Authentication is a tenant-level feature. Turning it on affects the sign-in for users across all the managed domains in your tenant

# High availability
In production environments, we recommend that you have a **minimum of 3 Authentication Agents running on your tenant**. There is a system limit of 40 Authentication Agents per tenant. And as best practice, treat all servers running Authentication Agents as Tier 0 systems (see reference).

Download and install the **Authentication Agent** to your other DCs
