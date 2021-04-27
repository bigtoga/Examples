https://docs.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about

- hub and spoke architecture
- Scales
- Uses Azure VPN/OpenVPN/IKEv2 clients, ExpressRoute circuits, and virtual networks
- Azure regions serve as hubs that you can choose to connect to. All hubs are connected in full mesh in a Standard Virtual WAN making it easy for the user to use the Microsoft backbone for any-to-any (any spoke) connectivity.

Basic	- Site-to-site VPN only

Standard	ExpressRoute, User VPN (P2S), VPN (site-to-site), Inter-hub and VNet-to-VNet transiting through the virtual hub

![x](https://i.imgur.com/xzGmPXn.png)
