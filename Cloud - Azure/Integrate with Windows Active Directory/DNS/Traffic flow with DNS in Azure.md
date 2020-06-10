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
  - From Azure DNS (Azure DNS private zones)
  - From Azure Provided Name Resolution (virtual network assigned DNS servers)
  - From your Windows Active Directory DNS
  
# Where you configure the DNS servers for the environment
1. When you create the virtual network, you assign a set of DNS Servers (Portal -> Virtual Networks -> <choose your vnet> -> DNS Servers)
2. All resources created within this vnet will now use these DNS Servers
  
Azure-provided name resolution: 
  - Pros:
    - You can opt to not create / manage your own DNS servers
    - Azure DNS automatically scales (sort of)
    - VMs within the same vnet automatically can resolve each other's IP addresses
  - Cons:
    - Single vnet only - DNS lookup is scoped to a virtual network. DNS names created for one virtual networks can't be resolved from other virtual networks.
    - The Azure-created DNS suffix cannot be modified
    - WINS and NetBIOS not supported
    - You cannot manually register your own records
    - Host names must be DNS-compatible. Names must use only 0-9, a-z, and '-', and cannot start or end with a '-'.
    - No reverse DNS support
    - No query logging  
    - DNS query traffic is throttled for each VM. Throttling shouldn't impact most applications. If request throttling is observed, ensure that client-side caching is enabled

# Where to get more information
- [Name resolution for Azure vnets](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances)
- [Azure-provided name resolution details](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances#azure-provided-name-resolution)
- [Using name resolution from your own DNS server in Azure](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances#name-resolution-that-uses-your-own-dns-server)
