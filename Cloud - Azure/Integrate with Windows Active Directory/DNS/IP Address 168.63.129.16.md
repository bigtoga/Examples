Azure has two "special" public IP addresses: 
- 168.63.129.16 is a virtual public IP address used in all regions for providing DNS and PaaS connectivity to IaaS-deployed resources
- 169.254.169.254 is Azure's "Instance Metadata Service" REST Endpoint IP. It is non-routable IP address and can be accessed only from within the VM. This reports all the metadata about the VM up to Azure. More details can be found [here](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/instance-metadata-service#:~:text=The%20endpoint%20is%20available%20at,only%20from%20within%20the%20VM.&text=This%20service%20is%20generally%20available,information%20about%20virtual%20machine%20instances.) and [in this blog post](https://msftstack.wordpress.com/2019/04/14/the-azure-instance-metadata-service-for-fun-and-profit/)

# IP address 168.63.129.16 
Special IP in the Azure world - https://docs.microsoft.com/en-us/azure/virtual-network/what-is-ip-address-168-63-129-16
- IP address 168.63.129.16 is a virtual public IP address that is used to facilitate a communication channel to Azure platform resources
- 168.63.129.16 is a **virtual IP of the host node** and as such it is not subject to user defined routes
- Used in **all regions and all national clouds** 
- is owned by Microsoft and will not change
- We recommend that you allow this IP address in any local (in the VM) firewall policies (outbound direction)
- The communication between this special IP address and the resources is safe because **only the internal Azure platform can source a message from this IP address.**

https://docs.microsoft.com/en-us/azure/virtual-network/security-overview#azure-platform-considerations

# What is it used for?
This virtual public IP address facilitates the following things:
- Enables the VM Agent to communicate with the Azure platform to signal that it is in a "Ready" state.
- Enables communication with the DNS virtual server to provide filtered name resolution to the resources (such as VM) that do not have a custom DNS server. This filtering makes sure that customers can resolve only the hostnames of their resources.
- Enables health probes from Azure load balancer to determine the health state of VMs.
- Enables the VM to obtain a dynamic IP address from the DHCP service in Azure.
- Enables Guest Agent heartbeat messages for the PaaS role.

## Details
- **VM Agent** - The VM Agent requires outbound communication over ports **80, 443, 32526 with WireServer (168.63.129.16)**. These should be open in the local firewall on the VM. **The communication on these ports with 168.63.129.16 is not subject to the configured network security groups.**
- **DNS for Azure PaaS/SaaS/public cloud integrations** - 168.63.129.16 can provide DNS services to the VM. If this is not desired, this traffic can be blocked in the local firewall on the VM. **By default DNS communication is not subject to the configured network security groups unless specifically targeted leveraging the AzurePlatformDNS service tag.**
- **Load balancer health probes** - When the VM is part of a load balancer backend pool, health probe communication should be allowed to originate from 168.63.129.16. The default network security group configuration has a rule that allows this communication. This rule leverages the AzureLoadBalancer service tag. If desired this traffic can be blocked by configuring the network security group however this will result in probes that fail.
