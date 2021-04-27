# Authentication 

**Want to ensure Azure AD accounts can authenticate to Azure SQL database - how?**
- Create a second SQL admin based on an Azure AD account
  - It's actually created as a container user in `master`
  
**How to create contained user for Azure AD user?**
- `CREATE USER "name@tenant.onmicrosoft.com" FROM EXTERNAL PROVIDER`

# Advanced Threat Protection

Part of **Azure Defender**

https://docs.microsoft.com/en-us/azure/azure-sql/database/threat-detection-overview

**What would be detected as a threat?**
- Two types and both are SQL injection related 
  1. Vulnerable to SQL Injection 
    - when an app triggers a "faulty SQL statement"
    - Module that doesn't sanitize user input 
  2. Potential SQL Injection 
