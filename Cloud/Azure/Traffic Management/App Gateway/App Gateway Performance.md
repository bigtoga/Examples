# App Gateway v2 as of Jul 2021

App GW performance is a 3-part system:
1. Processing power (i.e. backend hardware needed to run the App GW) is calculated as a **Compute Unit" which [is a measure of processor capacity consumed](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#pricing) by things like redirects, SSL offloading, TLS connections/sec, URL Rewrite computations, and WAF rule processing
2. **Capacity Units** (CU) are a 3-dimensional metric that calculates a combination of Compute Units, # of persistent connections, and sustained throughput
3. For the entire App GW: the number of **Compute Instances** that can be/are deployed (i.e. what you set as min/max when you configure auto-scaling)

App GW uses Capacity Units to determine when to scale up or down (i.e. when to add more Compute Instances)
- - A **Capacity Unit** can handle up to [1 Compute Unit, or 2,500 persistent connections, or a sustained 2.22 Mbps connection](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus). If any one of those 3 exceeds these limits, [a new compute instance is spun up](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus)
- [Each compute instance scales to 10 capacity units](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#autoscaling-and-high-availability)
- It takes [about 6-7 minutes to spin up a new compute instance](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#autoscaling-and-high-availability)

In other words:
- Your App GW "scales up" when it adds Compute Instances
- It will add additional Compute Instances are added when any one of the 3-dimensional limits are exceeded
- Ideal for saving cost by not requiring the gateway to run at peak provisioned capacity for anticipated maximum traffic load

- One App GW can scale from 0 to 125 Compute Instances


So, nominally you can reach: 125 (instances) * 10 (cap units) * 2.22 (Mbps throughput per cap unit) = 2775 Mbps

Pricing is calculated by [a combination of fixed hourly cost along with Capacity Units](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-autoscaling-zone-redundant#pricing)

## Compute Units

Good [documentation here](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus)

>> Compute Unit is the measure of compute capacity consumed. Factors affecting compute unit consumption are TLS connections/sec, URL Rewrite computations, and WAF rule processing
>> The number of requests a compute unit can handle depends on various criteria like TLS certificate key size, key exchange algorithm, header rewrites, and in case of WAF - incoming request size

Compute unit guidance:
- **Standard_v2** - Each compute unit is capable of approximately 50 connections per second with RSA 2048-bit key TLS certificate
- **WAF_v2** - Each compute unit can support approximately 10 concurrent requests per second for 70-30% mix of traffic with 70% requests less than 2 KB GET/POST and remaining higher. WAF performance is not affected by response size currently

## What if you under-provision App GW? 

Example 2 in [the documentation](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus) talks about this:

>> However, if processing capacity equivalent to only say 7 additional CUs was available for use within the 3 reserved instances. In this scenario the Application Gateway resource is under scaled and **could potentially lead to increase in latency or requests getting dropped**

>> In case of Manual Scaling, **any additional requests exceeding the maximum processing capacity of the reserved instances may cause impact to the availability of your application**. In situations of high load, reserved instances may be able to provide more than 10 Capacity units of processing capacity depending upon the configuration and type of incoming requests. But it is recommended to provision the number of instances as per your traffic requirements

## WAF v2 and Calculating Needed Compute Instances

Use [the documentation on pricing for this](https://docs.microsoft.com/en-us/azure/application-gateway/understanding-pricing#v2-skus)
- Their rule-of-thumb is consider **10 concurrent requests per second** for each Compute Unit

Basic math here: 
- If you have 1000 requests per second, then you need 10 Compute Units = 1 Compute Instance
- 10,000 requests per second, you need 100 Compute Units = 10 Compute Instances




