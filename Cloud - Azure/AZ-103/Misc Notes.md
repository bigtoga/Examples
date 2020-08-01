Azure Load Balancer belongs to **Microsoft.Network/loadbalancers**, not Microsoft.Resources

If you want to deploy a VM as an IDS, you will need two things:
1. Forwarded traffic enabled
1. Route tables on all the subnets

# Azure CLI
- `az role definition create --role-definition @ad-role.json` (requires the "@")
- `az vm deallocate` instead of `az vm stop`
