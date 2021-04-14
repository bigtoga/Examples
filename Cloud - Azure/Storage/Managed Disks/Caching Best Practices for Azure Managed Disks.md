# Articles and Resources

- [Effects of Disk Caching in Azure](https://docs.microsoft.com/en-us/learn/modules/caching-and-performance-azure-storage-and-disks/2-effect-of-caching-on-disk-performance-in-azure)
- [Performance Guidelines for Managed Disks](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices)
- [Designing for max performance in Azure Managed Disks](https://docs.microsoft.com/en-us/azure/virtual-machines/premium-storage-performance)

# Best Practices 

As of **March 9, 2021**: 
- Disk caching not supported on 4TB+
- OS disk: ReadWrite
- Data disk (default/general): ReadOnly

# Explanations of Disk Caching

| Setting  	| When to use   	| Example  	|
|---	|---	|---	|
| None  	| For write-only and write-heavy disks  	| Logging disks (SQL transaction logs) 	|
| ReadOnly  	| for read-only and read-write disks  	| Most disks, SQL data disks  	|
| ReadWrite  	| Don't use; use only if your application properly handles writing cached data to persistent disks when needed 	| OS disks  	|

### Read Only performance 

- low Read latency
- Very high Read IOPS
- Very high Throughput 

How it works: 
1. Reads performed from cache, which is on the VM memory and local SSD, are much faster than reads from the data disk, which is on the Azure blob storage
2. Premium Storage does not count the Reads served from cache towards the disk IOPS and Throughput. Therefore, your application is able to achieve higher total IOPS and Throughput.
