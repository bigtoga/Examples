Ideas / things to consider - last updated August, 2021

1. VM Sku is most obvious
2. Disk tier is next most obvious
3. Align the VM Sku to the workload

## SQL Server VMs

- Move tempdb to the ephemeral disk
- VMs that support shared disks are capped at 2,000 MB/s throughput - consider whether you need a shared disk. If not, may be able to get a boost.
