Ideas / things to consider - last updated August, 2021

1. VM Sku is most obvious
2. Disk tier is next most obvious
3. Align the VM Sku to the workload

## SQL Server VMs

- Move tempdb to the ephemeral disk
- Shared Disks can be silent performance killers
   - VMs w shared disks are maxed at 2,000 MBps max throughput (non-shared are 3,872 MB/s)
   Shared disks do not support caching thus all IO counts against "uncached"
