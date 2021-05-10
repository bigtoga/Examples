# NetApp and Performance

Performance in NetApp is a combination of multiple things:
1. The performance tier (a.k.a. service level) of the capacity pool
2. The quota assigned to the volume
3. The QoS type (auto or manual) of the capacity pool
4. Whether the VM has advanced networking enabled

Good list here: https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-service-levels

![x](https://docs.microsoft.com/en-us/azure/media/azure-netapp-files/azure-netapp-files-service-levels.png)

# Performance levels

As of [May 2021, there are 3 performance tiers](https://docs.microsoft.com/en-us/azure/azure-netapp-files/azure-netapp-files-service-levels) (a.k.a. service tiers):
- Ultra - up to 128MB/s of throughput for every 1TB of capacity provisioned (2TB = 256MB/s)
- Premium - up to 64MB per 1TB provisioned
- Standard - up to 16MB per 1TB provisioned
