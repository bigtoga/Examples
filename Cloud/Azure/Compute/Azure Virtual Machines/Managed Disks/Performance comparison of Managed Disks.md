Throughput and IOPS have some big diffferences between VM Skus.

[Disk throughput and IOPS maximums for each disk sku](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd)
- When you provision a premium storage disk, you are guaranteed the capacity, IOPS, and throughput of that disk. For example, if you create a P50 disk, Azure provisions 4,095-GB storage capacity, 7,500 IOPS, and 250-MB/s throughput for that disk. Your application can use all or part of the capacity and performance
- Standard SSDs do not guarantee that capacity in the same way
- Premium SSDs are designed to provide low single-digit millisecond latencies and target IOPS and throughput described in the preceding table **99.9% of the time**
- 
