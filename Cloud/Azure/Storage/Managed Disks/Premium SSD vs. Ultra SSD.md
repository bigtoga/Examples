**As of May 27, 2021**

References:
- [Ultra SSD limitations](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-enable-ultra-ssd?tabs=azure-portal)

|   	|Premium SSD  	|Ultra SSD   	|
|---	|---	|---	|
| Use as OS disk?  	| x  	|   	|
| Use as data disk? 	| x  	| x  	|
| All VM sizes support?  	| x  	|   	|
| Can be created from snapshot?  	| x  	| No, must be created empty  	|
| Can create snapshot from it?  	| x  	|   	|
| Can change disk type?  	| x  	|   	|
| Can build VM image with it?  	| x  	|   	|
| Can be backed up with Azure Backup?  	| x  	|   	|
| Can be backed up with Azure Site Recovery (ASR)?  	| x  	|   	|
| Supports Azure disk encryption?  	| x  	|   	|
| Supports cached reads?  	| x  	|   	|
| Supports cached writes?  	| x  	|   	|
| Can be in availability set?  	| x   	|   	|
| Supports Azure Dedicated Hosts?  	| x   	|   	|
| Any capacity limits?  	|    	| 32TB per subscription by default   	|
