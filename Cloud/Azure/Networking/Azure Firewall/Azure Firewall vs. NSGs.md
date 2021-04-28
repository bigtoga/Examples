# Azure Firewall vs. vnet NSGs

If you rename these, it makes it easier:
- Azure Firewall is just "Edge Firewall" - use it to manage inbound/outbound traffic from/to the internet
- NSGs are just "Subnet Firewalls" - use them to manage inbound/outbound traffic within the local vnet

|Comparison   	| Azure FW  	| NSGs   	| Notes 	|
|---	|---	|---	|---	|
|Inspects   	| Layers 3, 4, 7   	| Layers 3, 4  	|   	|
|Deployed  	| Regional   	|Regional   	|   	|
|Availability options   	|Zonal   	|Zonal   	|   	|
|Uptime SLA   	|99.99% zonal   	|None   	|   	|
|Typical usage   	|1 part of a defense in depth model   	|1 part of a defense in depth model   	|AzFW is a firewall to protect virtual networks (thus limiting what traffic is allowed "into the network"), and NSGs are packet-filtering firewalls that protect subnets (this allowing what traffic is allowed "within the network") |
|Used to manage traffic allowed to/from vnet   	|Yes   	|Can be, but usually not   	|For companies who don't want to pay for Azure Firewall, NSGs can do this   	|
|Used to manage traffic allowed between 2 vnets   	|Yes   	|Can be, but usually not   	|For companies who don't want to pay for Azure Firewall, NSGs can do this   	|
|Used to manage inter-vnet traffic (subnet to subnet)   	|Can be, but usually not   	|Yes   	|Most companies deploy Azure FW just to manage "What's allowed into the vnet"   	|
|Tyically deployed 	|In hub in a hub-and-spoke model  	|In all vnets   	|   	|
|Filters: Threat-based intelligence?   	|Yes  	|No   	|   	|
|Filters: FQDN   	|Yes  	|No   	|   	|
|Filters: Service tags    	|   	|   	|   	|
|Filters: Groups of IPs/devices   	|Yes via IP groups   	|Yes via Application Security Groups (ASGs)   	|   	|
|Outbound SNAT: When a VM behind this access the internet...   	|Outbound SNAT makes it appear as though the Azure FW IP is the source   	|3 options: (1) If the VM has a public IP, that is used, (2) if no VM PIP, if you've deployed a NAT Gateway, then the NAT Gateway address appears, (3) no NAT Gateway and no public PIP? Random Azure IP   	|   	|
|Uses route tables?   	|Yes   	|Can, but usually not   	|   	|
|Uses User-defined routes (UDRs)?   	|Yes   	|Can, but usually not 	|   	|
|Inbound DNAT (Source Destination Address Translation): When the remote host replies to the VM's request...   	|Uses Inbound DNAT to map to the VM's private IP   	| Not available  	|   	|
|   	|   	|   	|   	|