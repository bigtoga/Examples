https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering

# In order for peering to work, you must create peering in both directions
If only one vnet has a peering, no bueno

1. vnet1 has a peering to vnet2
1. VM1 is in vnet1 and VM2 is in vnet 2
1. Can VM1 ping VM2? No. For that to work, you need to set up peering from vnet2 to vnet1 also

# Requirements and Constraints
## Basics
1. The virtual networks can be in the same, or different subscriptions 
1. The vnets can be in same or different Azure Active Directory tenants
1. The virtual networks you peer must have non-overlapping IP address spaces.
1. You can't add address ranges to, or delete address ranges from a virtual network's address space once a virtual network is peered with another virtual network. To add or remove address ranges, delete the peering, add or remove the address ranges, then re-create the peering. 
1. You can't resolve names in peered virtual networks using default Azure name resolution. To resolve names in other virtual networks, you must use Azure DNS for private domains or a custom DNS server. 

1. Support for peering across virtual networks from subscriptions associated to different Azure Active Directory tenants is not something you can do in Portal. You can use CLI, PowerShell, or Templates

1. You can peer virtual networks in the same region, or different regions. Peering virtual networks in different regions is also referred to as **Global VNet Peering**
1. When creating a global peering, the peered virtual networks can exist in any Azure public cloud region or China cloud regions or Government cloud regions. 
1. You cannot peer across clouds. For example, a VNet in Azure public cloud cannot be peered to a VNet in Azure China cloud.
1. Resources in one virtual network cannot communicate with the front-end IP address of a Basic internal load balancer in a globally peered virtual network. 
1/ Support for Basic Load Balancer only exists within the same region. Support for Standard Load Balancer exists for both, VNet Peering and Global VNet Peering. Services that use a Basic load balancer which will not work over Global VNet Peering are documented here.

1. You can use remote gateways or allow gateway transit in globally peered virtual networks and locally peered virtual networks.









