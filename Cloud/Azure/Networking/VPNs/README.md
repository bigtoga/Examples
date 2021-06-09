# Vnet-to-Vnet VPNs


# Site-to-Site IPSec VPNs
If you do not have a virtual network gateway already provisioned:
1. Get the "other side" VPN info - public IP, pre-shared key (PSK), etc
2. Create an Azure Local Network Gateway
3. Create an Azure Connection using the new local network gateway

If you do not have an Azure virtual network gateway, create things in this order:
1. Azure public IP address (for your virtual network gateway you will create next)
2. Azure Virtual Network Gateway (VPN Gateway)
3. Azure Local Network Gateway
4. Azure VPN Connection
