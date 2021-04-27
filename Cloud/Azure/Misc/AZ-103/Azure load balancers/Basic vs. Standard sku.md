https://docs.microsoft.com/en-us/azure/load-balancer/skus

# Standard load balancer
- Backend pool size: 1,000 instances
- Endpoints possible: any VM, scale sets within a single vnet
- Health probes: TCP. HTTP, HTTPS
- Down behavior: TCP connections stay alive on an instance probe down and on all probes down.
- Availability zones: Zone-redundant and zonal frontends for inbound and outbound traffic.	
- Diagnostics: Multi-dimensional metrics and alerts plus probe/alert/health status ([docs](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-standard-diagnostics))
- SLA: 99.99%


# Basic load balancer
- Backend pool size: 300 instances
- Endpoints possible: VMs in a single availability set or VM scale set
- Health probes: TCP. HTTP
- Down behavior: TCP connections stay alive on an instance probe down. All TCP connections terminate when all probes are down.
- Availability zones: N/A
- Diagnostics: limited only in Azure Monitor
- SLA: N/A
