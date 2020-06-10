Basic overview - good enough to pass exams with:

- If any of the below name “ends with an s”, that means it supports premium SSDs / Azure Premium Files

[This documentation page](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) is where you want to go for more details. I created the chart below based on the “monthly pricing” for each class on that page as of June 2020. I left off Mv2 since it was such an outlier. 

![?](https://i.imgur.com/TrhYTwj_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

# Dev/test and cheap servers
- A-Series: low CPU power, low memory, cheap
   - Example use cases include development and test servers, low traffic web servers, small to medium databases, servers for proof-of-concepts, and code repositories
   
- B-Series: B is for burstable, little more power than A but not meant for general use
   - Example use cases include development and test servers, low-traffic web servers, small databases, micro services, servers for proof-of-concepts, build servers
   
# Enterprise grade

- **D-Series**: general purpose
   - Example use cases include **many enterprise-grade applications, relational databases, in-memory caching, and analytics**. The latest generations are ideal for applications that demand faster CPUs, better local disk performance or higher memories
   
- E-Series: high memory apps. Roughly double the price of D-series
   - Example use cases include SAP HANA (E64s_v3 only), SAP S/4 HANA application layer, SAP NetWeaver application layer, SQL Hekaton and other large in-memory business critical workloads.

- H, F-Series: Compute optimized, H for high performance

- DC-Series: secure enclave, think of the pentagon (even though it isn’t actually in DC, close enough). Faulty new VMs to protect the confidentiality and integrity of your data and code while it’s processed in Azure through the use of secure enclaves. This is in addition to the existing built-in encryption capabilities that protect data in Azure while it’s at rest and in transit.
   - Example use cases include confidential querying in databases, creation of scalable confidential consortium networks and secure multiparty machine learning algorithms. The DC-series VMs are ideal to build secure enclave-based applications to protect customers code and data while it’s in use.

- L/LS-Series: storage optimized
- N-Series: N is for NVidia, GPU machines

More detail here: https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/