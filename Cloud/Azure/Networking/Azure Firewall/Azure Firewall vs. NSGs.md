# Azure Firewall vs. vnet NSGs

|Comparison   	| Azure FW  	| NSGs   	| Notes 	|
|---	|---	|---	|---	|
|Inspects   	| Layers 3, 4, 7   	| Layers 3, 4  	|   	|
|Deployed  	| Regional   	|Regional   	|   	|
|Availability options   	|Zonal   	|Zonal   	|   	|
|Uptime SLA   	|99.99% zonal   	|None   	|   	|
|Used to manage traffic allowed to/from vnet   	|Yes   	|Can be, but usually not   	|For companies who don't want to pay for Azure Firewall, NSGs can do this   	|
|Used to manage traffic allowed between 2 vnets   	|Yes   	|Can be, but usually not   	|For companies who don't want to pay for Azure Firewall, NSGs can do this   	|
|Used to manage inter-vnet traffic (subnet to subnet)   	|Can be, but usually not   	|Yes   	|Most companies deploy Azure FW just to manage "What's allowed into the vnet"   	|
|Filters: Threat-based intelligence?   	|Yes  	|No   	|   	|
|Filters: FQDN   	|Yes  	|No   	|   	|
|Filters: Service tags    	|   	|   	|   	|
|Filters: Groups of IPs/devices   	|Yes via IP groups   	|Yes via Application Security Groups (ASGs)   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|
|   	|   	|   	|   	|