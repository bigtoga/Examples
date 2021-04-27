# Creating AS
- New VMs must be in same resource group, location 

# Fault & Update domains
10 VMs in Availability Set
- 2 FDs
- 5 UDs

**Planned maintenance - how many VMs would be available?**
  - 6 or 7 depending
  - VMs will be UD1(4 VMs), UD2 (3 VMs), UD3 (3 VMs)
  - At least 6 will be online, maybe 7
