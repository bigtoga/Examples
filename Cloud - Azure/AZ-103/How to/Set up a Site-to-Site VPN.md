https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal

1. AZURE - Create a public IP "VNet1GWpip"
1. AZURE - Create vnet "VNet1"
    - Address space: 10.1.0.0/16
1. AZURE - Create VPN Gateway (a.k.a. the Gateway Subnet)
    - Virtual Network > Virtual network: VNet1
    - Instance details > Name: VNet1GW
    - Instance details > Gateway type: VPN
    - Instance details > VPN type: Route-based
    - Virtual Network > Gateway subnet address range: 10.1.255.0/27
    - Public IP address > Public IP address name: VNet1GWpip
1. AZURE - Create a local VPN gateway
    - Give it a name
    - Give it the remote on-prem public IP address to the VPN device on-premises
    - Tell it the IP range to allow from the on-premise network
1. ON-PREM - configure the VPN
1. AZURE - Create the VPN connection 
  - Go to "VNet1"
  - Go to "Connected Devices" blade
  - Click on the name of your gateway
  - Click "Add" to add a connection
