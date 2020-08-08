1. Azure CLI is the answer to **least administrative effort** to **migrate DNS to Azure from on-prem**

# Storage
- Gen 2 and Blobs support Archive; Gen1 does not
- Gen 1 & 2 support VHDs/VM disks; Blob does not

# VMs
- Scale Sets w Managed Disks allow 99.95% SLA
- Availability Zones can achieve 99.99%
- Availability Sets can achieve 99.95%
- VHD / disk images require Gen1, Gen2 - no Blob

If you want to deploy a VM as an IDS, you will need 3 things:
1. Forwarded traffic enabled
1. Route tables on all the subnets
1. Enable IP forwarding

# Azure Policy
Azure Policy does not stop/deallocate "currently running" resources even if they are non-compliant

# Load Balancer
Azure Load Balancer belongs to **Microsoft.Network/loadbalancers**, not Microsoft.Resources

# Azure CLI
- `az role definition create --role-definition @ad-role.json` (requires the "@")
- `az vm deallocate` instead of `az vm stop`
