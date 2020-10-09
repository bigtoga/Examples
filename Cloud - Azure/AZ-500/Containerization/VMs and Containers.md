**How do you connect a container running on a VM to Azure PaaS services?**
- Install the Azure Virtual Network container network interface (CNI) plug-in 
    - The plug-in assigns IP addresses from a virtual network to containers brought up in the virtual machine, attaching them to the virtual network, and connecting them directly to other containers and virtual network resources. The plug-in doesn’t rely on overlay networks, or routes, for connectivity, and provides the same performance as virtual machines. 
- The pods can then access Azure Storage, SQL DBs using service endpoints
- A virtual network IP address is assigned to every Pod, which could consist of one or more containers.
- Pods can connect to peered virtual networks and to on-premises over ExpressRoute or a site-to-site VPN. Pods are also reachable from peered and on-premises networks.
- Network security groups and routes can be applied directly to Pods
- Pods can be placed directly behind an Azure internal or public Load Balancer, just like virtual machines
- Pods can be assigned a public IP address, which makes them directly accessible from the internet. Pods can also access the internet themselves.

https://docs.microsoft.com/en-us/azure/virtual-network/container-networking-overview

![x](https://i.imgur.com/PkZWoEE.png)
