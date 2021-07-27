# App Gateway v2 as of Jul 2021

App GW performance is a complex two-part system:
1. For the entire App GW: the number of **Compute Instances** deployed (i.e. what you set as min/max when you configure auto-scaling)
2. For a given Compute Instance, the total **Capacity Units** (CU) in play

App GW uses Capacity Units to determine when to scale up or down
- One App GW can scale up to 125 instances
- [Each compute instance scales to 10 capacity units](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#autoscaling-and-high-availability)
- A capacity unit can handle up to [2,500 persistent connections, or a sustained 2.22 Mbps connection](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus)
- If you exceed [either the persistent connections or the sustained throughput, a new compute instance is spun up](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus)
- It takes [about 6-7 minutes to spin up a new compute instance](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#autoscaling-and-high-availability)

So, nominally you can reach: 125 (instances) * 10 (cap units) * 2.22 (Mbps throughput per cap unit) = 2775 Mbps

Pricing is calculated by [a combination of fixed hourly cost along with Capacity Units](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#pricing)
