- Azure AD - SSPR = Azure AD P1
- Azure SQL - change DTUs on the **Configure** blade
- Premium SSD - max IOPS of 7000-10000
- GatewaySubnet - use `/27` to maximize IPs available to Azure IaaS resources
- **Load balancer - Basic or Standard?** - Always Standard

- Alerting - Rate Limiting
    - Emails - no more than 100 per hour
    - SMS/voice - no more than 1 every 5 minutes (max of 12 per hour)
- `az group deployment create` [documentation](https://docs.microsoft.com/en-us/cli/azure/group/deployment?view=azure-cli-latest#az-group-deployment-create)
    - `--template-uri` or `--template-file`
- How to use a VM as a template for other VMs?
    - Go to VM blade, Export Template
- Hyper-V - how to exclude disk?
    - When enabling replication, use the "DISK TO REPLICATE" column
- Kubernetes - don't fall for trick Azure CLI questions
    - If they ask "What steps in what order", installing Azure CLI is not same as installing AKS cli
    - `az aks install-cli` installs `kubectl`, the AKS CLI
    
# Insights
**How to optimize time series data?**
- Use a reference data set

**Default retention period for time series data?**
- 30 days

**How to retain longer?**
- Set a value for the Data Retention property
    
# Service Fabric
**How to package app?**
- Name it *.sfpkg
    
# Storage
- Archive tier?
    - Blog, Storage v2
    
# App Service Plans, Serverless Functions
- Custom domains? 
    - Shared plan D1
- SSL
    - Basic+
- Triggered
    - Anything *except* Consumption Plan
- LaaS accesses vnet resource?
    - Premium, App Service Plan
- Connection strings changed   
    - Configuration tab
    
    
    
# Virtual Machines
## Backups
**Receive warning during preflight checks. Why?**
- WaAppAgent.exe our of date

# Networking
- vnets across VPNs = enable Gateway Transit
- on-prem to vnet = enable Gateway Transit
- **Modifying an address space for a peering vnet** - must delete the peering before mod/update address space
    1. Delete existing peering
    2. Update address space
    3. Recreate peering

# Permissions
** Owner vs. Security Admin**
    - Sec. Admin - In Security Center only: Can view security policies, view security states, edit security policies, view alerts and recommendations, dismiss alerts and recommendations.
    
** Owner vs. Network Contributor**
    - Net. Contr -  lets you manage networks, but not access to them
