<details>
  <summary>Basics</summary>
  
</details>  

<details>
  <summary>Pricing & SKUs</summary>
  
</details>  

<details>
  <summary>High Availability/DR/BC</summary>
  
</details>  

<details>
  <summary>Networking-related</summary>
  
**How to expose to both vnet private and public internet?**
- https://docs.microsoft.com/en-us/azure/api-management/api-management-using-with-vnet
- Set virtual network to **External**
- Requires Premium and Developer SKUs

**vnet connectivity options**
- Off - default; not deployed to a vnet
- External - public internet
- Internal - internal only

**External and Internal both require dedicated subnet w no other resources except Azure API Mgmt Instances**
- Yes, those subnets can have multiple API Mgmt deployments

**Static or dynamic IPs?**
- Dynamic - [The VIP address of the API Management instance will change each time VNET is enabled or disabled](https://docs.microsoft.com/en-us/azure/api-management/api-management-using-with-vnet)
  
</details>  

<details>
  <summary>DNS</summary>
# Custom DNS
  
**Supported?** - Yes with Internal vnet deployment and Azure Private DNS or on-prem DNS
- https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances#name-resolution-that-uses-your-own-dns-server  

**Ports required?** - just 53 for DNS
  
</details>  

<details>
  <summary>Monitoring</summary>

**Outbound traffic monitor?** - Azure Monitor
</details>  

<details>
  <summary>Misc</summary>
  
</details>  
