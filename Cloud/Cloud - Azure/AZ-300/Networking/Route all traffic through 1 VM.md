https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview

# Background

- vnet: 10.0.0.0/16
- Sub1: 10.0.0.0/24
- Sub2: 10.0.1.0/24
- Sub3: 10.0.2.0/24
- Site to site VPN in place

**What is needed to send all vnet inbound traffic to a VM on Sub2?**
- Add a GatewaySubnet for 10.0.254.0/24
- Create a route table
- Create a route - set the **Assigned to** field to be the new GatewaySubnet
