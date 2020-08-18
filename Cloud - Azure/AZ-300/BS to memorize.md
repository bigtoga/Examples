- Azure AD - SSPR = Azure AD P1
- Azure SQL - change DTUs on the **Configure** blade
- Premium SSD - max IOPS of 7000-10000
- GatewaySubnet - use `/27` to maximize IPs available to Azure IaaS resources
- vnets across VPNs = enable Gateway Transit
- on-prem to vnet = enable Gateway Transit
- Alerting - Rate Limiting
    - Emails - no more than 100 per hour
    - SMS/voice - no more than 1 every 5 minutes (max of 12 per hour)
- `az group deployment create` [documentation](https://docs.microsoft.com/en-us/cli/azure/group/deployment?view=azure-cli-latest#az-group-deployment-create)
    - `--template-uri` or `--template-file`
- How to use a VM as a template for other VMs?
    - Go to VM blade, Export Template
- Hyper-V - how to exclude disk?
    - When enabling replication, use the "DISK TO REPLICATE" column
    
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
