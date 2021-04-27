Defaults:
- Inbound - all vnet and load balancer traffic
- Outbound - all vnet and internet bound traffic

Outside In, Inside Out

# Planning Network Security Groups

- you can share them with other resource groups in your subscription
- By default, you can create 100 NSGs per region per subscription. You can raise this limit to 400 by contacting Azure support.
- only one NSG to a VM, subnet, or network adapter
- By default, you can have up to 200 rules in a single NSG. You can raise this limit to 500 by contacting Azure support
- You can apply an NSG to multiple resources

# Best Practices
- We recommended that you associate a network security group to a subnet, or a network interface, but not both. Since rules in a network security group associated to a subnet can conflict with rules in a network security group associated to a network interface, you can have unexpected communication problems that require troubleshooting.
