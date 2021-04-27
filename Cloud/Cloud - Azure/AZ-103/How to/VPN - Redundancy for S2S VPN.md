![x](https://i.imgur.com/p3e4Prv.png)

https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-highlyavailable

- For planned maintenance, the connectivity should be restored within 10 to 15 seconds. 
- For unplanned issues, the connection recovery will be longer, about 1 minute to 1 and a half minutes in the worst case. 

For P2S VPN client connections to the gateway, the P2S connections will be disconnected and the users will need to reconnect from the client machines.

# Requirements to create an Active-Active highly available Site to Site VPN in Azure
1. ON-PREM - 2 public IP addresses
1. ON-PREM - 2 VPNs configured
1. AZURE - 2 public IP addresses
1. AZURE - 2 virtual network gateways / VPN gateways
1. AZURE - 2 local network gateways
