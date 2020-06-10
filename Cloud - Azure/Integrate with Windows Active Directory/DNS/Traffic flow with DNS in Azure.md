Environment overview:
- IaaS environment with Windows 2016 Active Directory-based domain (WAD) `MYSITE`
- Azure AD tenant with custom vanity domain for `mysite.com`
- Azure AD Connect enabled and WAD is in sync with AAD
- Writeback enabled on AAD so that changes can be made in either 
- You have DNS servers inside your WAD

# Basics of DNS in Azure
DNS can be created/managed in multiple places:
- Public DNS
  - From Azure DNS (public)
  - From another DNS provider
  - From your own public DNS servers
- Private DNS
  - From Azure DNS (private)
  - From your Windows Active Directory DNS
  
# Where you configure the DNS servers for the environment
1. When you create the virtual network, you assign a set of DNS Servers (Portal -> Virtual Networks -> <choose your vnet> -> DNS Servers)
2. All resources created within this vnet will now use these DNS Servers
  
Azure-provided DNS: 
  - Pros:
    - You can opt to not create / manage your own DNS servers
    - Azure DNS automatically scales
    - VMs within the same vnet automatically can resolve each other's IP addresses
  - Cons:
    - Single vnet only
    - WINS and NetBIOS not supported
    - Only A records that are automatically registered by the service are supported (no manual registration of records)
    - No reverse DNS support
    - No query logging  
