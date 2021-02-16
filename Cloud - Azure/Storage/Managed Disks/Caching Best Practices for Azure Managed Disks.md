Microsoft Learn - https://docs.microsoft.com/en-us/learn/modules/caching-and-performance-azure-storage-and-disks/2-effect-of-caching-on-disk-performance-in-azure

# Things to Remember

## Design Principles around Azure managed disks

Core principal is that, by separating "the storage" from "the compute", you reduce the likelihood that both go down at the same time

## IOPS
- Each VM size has a limit on max IOPS
- Published IOPS max is a **theoretical limit** - those numbers are highly afected by both **throughput** and **latency**
