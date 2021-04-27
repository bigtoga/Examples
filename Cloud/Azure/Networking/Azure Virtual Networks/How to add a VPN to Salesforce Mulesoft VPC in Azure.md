# How to add a VPC / VPN to Salesforce / Mulesoft in Azure 

(assumes you already have an existing vnet gateway + vnet in place)

1. Log into Mulesoft and view properties of the VPC 
	- What is the external IP address? 
	- What is the secret?
	- What is the local IP space? 
	
2. Log into Azure and create a new local network gateway 
	- Name: ngw-mulesoft 
	- Connection type: Site to Site (IPSEC)
	- IP address: <Mulesoft external IP>
	- Local IP space: <Mulesoft local IP space>
	- No BGP (not supported by Mulesoft)

3. Add new connection to the existing vnet gateway 
	- Name vpc-mulesoft
	- Connection type: Site-to-Site (IPSEC)
	- Vnet gateway: <vnet gateway name>
	- Local network gateway: ngw-mulesoft 
	- Shared key (PSK): <Mulesoft secret>
	- IKEv2


