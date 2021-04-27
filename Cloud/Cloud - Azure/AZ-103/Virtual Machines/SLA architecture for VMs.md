# Virtual Machine SLAs
[Virtual Machines SLAs](https://azure.microsoft.com/en-us/support/legal/sla/virtual-machines/v1_9/)

- For all Virtual Machines that have two or more instances deployed across two or more Availability Zones in the same Azure region, 99.99%
- For all Virtual Machines that have two or more instances deployed in the same Availability Set or in the same Dedicated Host Group, 99.95%
- For any Single Instance Virtual Machine using Premium SSD or Ultra Disk for all Operating System Disks and Data Disks, 99.90%

# Virtual Machine Scale Sets SLAs
[VMSS SLAs](https://azure.microsoft.com/en-us/support/legal/sla/virtual-machine-scale-sets/v1_1/)

"Virtual Machine Scale Sets is a free service, therefore, it does not have a financially backed SLA. However: "
- if the VMSS includes VMs in at least 2 Fault Domains, the availability of the underlying Virtual Machines SLA for two or more instances applies
- if the VMSS contains a single Virtual Machine, the availability for a Single Instance Virtual Machine applies

# 99.95% requirement
1. Use managed disks
1. Use Availability Sets or Availability Zones for the VMs - need to be in at least 2 Fault Domains
