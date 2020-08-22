<details> 
  <summary>Routing</summary>
# Traffic Manager Routing
https://docs.microsoft.com/en-us/azure/traffic-manager/traffic-manager-routing-methods
  
There are **six routing methods available**
1. Priority - use when you have 1 primary, 1 secondary location to route to
1. Weighted - load balance based on user-defined weights
1. Performance - geographic least latency / closest
1. Geographic - use for compliance w local laws
1. Multivalue - IPv4/IPv6 endpoints
1. Subnet - route specific users to specific endpoints

</details>

<details>
  <summary>Business Continuity / Auto Failover</summary>
# High Availability / DR / BC w Traffic Manager

https://docs.microsoft.com/en-us/azure/traffic-manager/traffic-manager-routing-methods#priority

Use **Priority Traffic-Routing Method**

> The Traffic Manager profile contains a prioritized list of service endpoints. **By default, Traffic Manager sends all traffic to the primary (highest-priority) endpoint** 
> **If the primary endpoint is not available, Traffic Manager routes the traffic to the second endpoint**
> If both the primary and secondary endpoints are not available, the traffic goes to the third, and so on. 
< Availability of the endpoint is based on the configured status (enabled or disabled) and the ongoing endpoint monitoring.

![x](https://docs.microsoft.com/en-us/azure/traffic-manager/media/traffic-manager-routing-methods/priority.png)
  
  
</details>  
