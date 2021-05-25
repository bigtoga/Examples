# NetApp and Performance

Performance in NetApp is a combination of multiple things:
1. The performance tier (a.k.a. service level) of the capacity pool
2. The quota assigned to the volume
3. The QoS type (auto or manual) of the capacity pool
4. Whether the VM has advanced networking enabled
5. Whether the VM is sized correctly for the workload

Good list here: https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-service-levels

The [NetApp FAQ](https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-faqs) has a section on performance that is maybe even a better explanation
- **What should I do to optimize or tune Azure NetApp Files performance?**
      1. Ensure that the Virtual Machine is sized appropriately
      2. Enable Accelerated Networking for the VM
      3. Select the desired service level and size for the capacity pool
      4. Create a volume with the desired quota size for the capacity and performance

## NetApp is weird
-	Metrics are published using MiB/s which is very confusing
-	Step 1: Based on your service tier + pool capacity, calculate your expected maximum MiB/s (use [this page](https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-service-levels) to calculate)
-	Step 2: Convert MiB/s to Mbps using the [MiB/s to Mbps converter](https://www.convertunits.com/from/MiB/s/to/Mbps)
-	Step 3: Convert Mbps to IOPs using IOPS = (MBps Throughput / KB per IO) * 1024 (from the NetApp FAQ)


![x](https://docs.microsoft.com/en-us/azure/media/azure-netapp-files/azure-netapp-files-service-levels.png)

# Performance levels

As of [May 2021, there are 3 performance tiers](https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-service-levels) (a.k.a. service tiers):
- Ultra - up to 128MB/s of throughput for every 1TB of capacity provisioned (2TB = 256MB/s)
- Premium - up to 64MB per 1TB provisioned
- Standard - up to 16MB per 1TB provisioned

## Monitoring Azure NetApp Files

[Metrics for Azure NetApp Files](https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-metrics)
