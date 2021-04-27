# What are the most popular Azure VMs?

1. Go to Azure Portal -> Virtual Machines -> Create a new VM
2. Look for the URL under the size - at the top of that page is "Most popular Azure VMs"

# How do I compare two VM sizes to see "which is faster"?

Use the Azure compute units (ACU) - these give you a relative score for how fast a VM is
- A1 is the baseline at 100 ACU
- Dsv3 coming in at 190
- Standard_H16mr at 300

[Benchmarks for Azure VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes#benchmark-scores)
- [Windows VM benchmarks](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/compute-benchmark-scores)
- [Linux VM benchmarks](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/compute-benchmark-scores)

# What do the letters mean?

- [How MSFT names the Azure series/sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/vm-naming-conventions)
- [Another breakdown](https://serverfault.com/questions/1030897/what-do-the-lowercase-letters-in-azure-vm-sizes-mean)

- **"a"** - AMD processor
- **"m"** - memory heavy
- **"s"** = Premium Storage capable, including possible use of Ultra SSD (Note: some newer sizes without the attribute of s can still support Premium Storage e.g. M128, M64, etc.)

# Difference between OS disks

- HDD
- Standard SSD 
- Premium SSD 

# Basic overview of the VM Sizes

- If any of the below name “ends with an s”, that means it supports premium SSDs / Azure Premium Files
- Generally speaking, pricing goes up as the letter goes up. Not 100% true but useful sometimes 

[This documentation page](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) is where you want to go for more details. I created the chart below based on the “monthly pricing” for each class on that page as of June 2020. I left off Mv2 since it was such an outlier. 

![?](https://i.imgur.com/TrhYTwj_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Types of VM sizes

- General purpose
- Storage optimized
- Compute optimized
- Memory optimized
- GPU
- High performance compute

# Dev/test and cheap servers
- **A-Series**: low CPU power, low memory, cheap
   - Example use cases include development and test servers, low traffic web servers, small to medium databases, servers for proof-of-concepts, and code repositories
   
- **B-Series**: B is for burstable, little more power than A but not meant for general use
   - Example use cases include development and test servers, low-traffic web servers, small databases, micro services, servers for proof-of-concepts, build servers
   - Pricing is deceptively cheap and is listed as low as $3/mth. That’s only because it is expected you keep these on low to no usage during the month and/or dim
   
# Enterprise grade

- **D-Series**: general purpose
   - Example use cases include **many enterprise-grade applications, relational databases, in-memory caching, and analytics**. The latest generations are ideal for applications that demand faster CPUs, better local disk performance or higher memories
   
- **E-Series**: high memory apps. Roughly double the price of D-series. Optimized for **in-memory hyper-threaded applications**
   - Example use cases include SAP HANA (E64s_v3 only), SAP S/4 HANA application layer, SAP NetWeaver application layer, SQL Hekaton and other large in-memory business critical workloads.

- **F-Series**: Compute optimized - high CPU to memory ratios
    - Example use cases include batch processing, web servers, analytics, and gaming
    
- **G-Series**: Memory and storage optimized virtual machines
    - two times more memory, and four times more Solid State Drive storage (SSDs) than the General Purpose D-series. G-series features up to ½ TB of RAM and 32 CPU cores, and provide unparalleled computational performance, memory, and local SSD storage for your most demanding applications.

Example use cases include large SQL and NoSQL databases, ERP, SAP, and data warehousing solution

- **H-Series**: H for high performance

- **DC-Series**: secure enclave, think of the pentagon (even though it isn’t actually in DC, close enough). Faulty new VMs to protect the confidentiality and integrity of your data and code while it’s processed in Azure through the use of secure enclaves. This is in addition to the existing built-in encryption capabilities that protect data in Azure while it’s at rest and in transit.
   - Example use cases include confidential querying in databases, creation of scalable confidential consortium networks and secure multiparty machine learning algorithms. The DC-series VMs are ideal to build secure enclave-based applications to protect customers code and data while it’s in use.

- **L/LS-Series**: storage optimized

- **M-Series**: Memory optimized

- **N-Series**: N is for NVidia, GPU machines

More detail here: https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/
