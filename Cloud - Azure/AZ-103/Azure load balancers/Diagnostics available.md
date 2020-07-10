Diagnostic logging is only available in **Standard** sku

# Best Practices
[Per Microsoft documentation](https://docs.microsoft.com/en-us/azure/load-balancer/skus)
- Microsoft recommends Standard load balancer
- Standalone VMs, availability sets, and virtual machine scale sets can be connected to only one SKU, never both
- Load balancer and the public IP address SKU must match when you use them with public IP addresses
- Load balancer and public IP SKUs aren't mutable

[Azure Load Balancer docs](https://docs.microsoft.com/en-us/azure/load-balancer/) -> [SKUs](https://docs.microsoft.com/en-us/azure/load-balancer/skus)

# Standard sku and logging
Only two options when you send the logs to Log Analytics:
1. Load Balancer Alert Event
1. Load Balancer Probe Health Status

https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-monitor-log
