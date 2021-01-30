https://docs.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-configure?tabs=azure-powershell

https://docs.microsoft.com/en-us/azure/azure-sql/database/logins-create-manage

Azure AD authentication supports:
- Azure AD cloud-only identities
- Azure AD hybrid identities that support:
- Cloud authentication with two options coupled with seamless single sign-on (SSO)
    - Azure AD password hash authentication
    - Azure AD pass-through authentication
- ADFS (federated) authentication

# How to set up Azure AD Admin on a SQL PaaS server

Step 1. Create your Azure SQL/Synapse/Database Managed Instance server. During creation, you will specify the username + password of the sysadmin
- Note: this username can never be changed 
- Note: Only ONE server-level login can exist

Step 2 depends on whether you are talking Azure SQL Database & Synapse (which are identical in this aspect) or Managed Instance

**Step 2 for Azure SQL Database and for SYnapse**
a. In the portal, go to the new SQL Server -> Properties 
    - You will see the "Server admin login" is set to the username entered during setup
    - You will see that the "Active Directory Admin" is blank
b. Choose the AD admin
    - Behind the scenes in Azure SQL Database and Synapse, a new contained user is created in `master`
    
**Step 2 for Managed Instance**
a. In the portal, go to the managed instance -> Active Directory Admin -> **Set Admin** -> Save
b. Now you can go to the Managed Instance using TSQL and create the Azure AD server principals using `CREATE LOGIN ... FROM EXTERNAL PROVIDER`
