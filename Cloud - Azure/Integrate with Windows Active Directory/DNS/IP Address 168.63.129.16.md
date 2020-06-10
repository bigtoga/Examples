Special IP in the Azure world - https://docs.microsoft.com/en-us/azure/virtual-network/what-is-ip-address-168-63-129-16

> IP address 168.63.129.16 is a virtual public IP address that is used to facilitate a communication channel to Azure platform resources. Customers can define any address space for their private virtual network in Azure. Therefore, the Azure platform resources must be presented as a unique public IP address. 

This virtual public IP address facilitates the following things:
- Enables the VM Agent to communicate with the Azure platform to signal that it is in a "Ready" state.
- Enables communication with the DNS virtual server to provide filtered name resolution to the resources (such as VM) that do not have a custom DNS server. This filtering makes sure that customers can resolve only the hostnames of their resources.
- Enables health probes from Azure load balancer to determine the health state of VMs.
- Enables the VM to obtain a dynamic IP address from the DHCP service in Azure.
- Enables Guest Agent heartbeat messages for the PaaS role.
