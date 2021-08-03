*Last updated August 2021*

Resources:
- [Scalability & Performance Targets for Azure VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-scalability-targets)
- [VM and Disk Performance Targets](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-performance)

>> "The **max uncached disk throughput** is the default storage maximum limit that the virtual machine can handle."

What a giant PIA to deal with. Azure has throttles / caps at:
1. The storage account (where your managed disks are provisioned)
1. Maximum throughput allowed by an Azure VM for the type of disk (Premium SSD, Standard SSD, HDD, etc)
1. VM Sku 
1. The Managed Disk Sku / Tier

The lowest threshold "wins".

## 1. Storage Account 

- If it is "Standard" - max IOPS is 20,000 for all disks in the Storage Account
- If it is "Premium" - it has a "maximum total throughput rate of 50 Gbps"

(And yes, they used IOPS for Standard but Throughput for Premium)

## 2. VM Limits for the Type of Disk

**Premium SSD** managed disks - Per-VM Limits
- Maximum IOPS Per VM	80,000 IOPS
- Maximum throughput per VM	2,000 MB/s

## 3. VM Sku

Each VM series has it's own configuration - 
- [M-series](https://docs.microsoft.com/en-us/azure/virtual-machines/m-series) 
    - M8ms - 5,000 max IOPS and 125 max throughput
    - M128ms - full max of 80,000 IOPS and 2,000 max throughput
- [L-series are the storage optimized VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/lsv2-series)
    - No caching
    - No shared disks
    - Will not survive a host move
    - Local only
    - (I think of these as essentially ephemeral disks)

## 4. The Disk Tier

- P80 is the max with 20,000 IOPS and 900 MB/sec max throughput

