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
