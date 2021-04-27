Microsoft Learn - https://docs.microsoft.com/en-us/learn/modules/caching-and-performance-azure-storage-and-disks/2-effect-of-caching-on-disk-performance-in-azure

# Things to Remember

## Design Principles around Azure managed disks

Core availability design principal is that, by separating "the storage" from "the compute", you reduce the likelihood that both go down at the same time

## Factors that affect performance

When we think of "disk performance", we often focus on The Three Musketeers (IOPS, Throughput, and Latency). There are more factors however - "disk performance" can be measured "in the raw" (i.e. without considering the applications that use it), or "in context with the application". Neither is right/wrong - both have their usefulness.

### "In the Raw" Measurements for Storage

**IOPS** is a measurement of "the number of read and/or write requests that can be processed by the disk in one second *in an ideal situation where the disk subsystem is not waiting on other things like network speed/bandwidth, compute power, or application performance*". IOPS assumes a throughput of "Infinitely fast bandwidth/throughput", it assumes "The network has 0ms latency and not issues/bottlenecks", and that "The application (maybe a VM) is able to process the responses as fast as possibly with zero app-layer wait time". It's an ideal. 

IOPS is great for identifying "like-for-like" performance - if your local SSD drives has a max IOPS of 1,500 IOPS and your potentially new Azure Managed Disk has an IOPS of 5,000, you can feel very confident that the Azure Managed Disk will not be a performance issue

Note that:
1. Each VM size has a limit on max IOPS
2. Published IOPS max is a **theoretical limit** (see above for why)

### "In Context with the Application" Measurements for Storage

When we start including "storage performance" in "overall system performance", we have to talk about things like:
- Network bandwidth utilization
- Network speed (of routers/firewalls/VM NICs/etc)
- Performance of any underlying busses (HBAs for ex.)
- System-level CPU performance
- System-level memory performance 

- System-level hard drive performance
- How the app handles errors
- How long it takes the app to send 1 I\O request to storage
- How long it takes the app to receive a response to 1 I/O request from storage

**Throughput** (also called "bandwidth") is the amount of data that your application is sending to the storage disks in a specified interval (typically per second)
- If your application is performing I/O with large blocks of data, it requires high throughput

**Latency** is "round trip time" - how long does it take your app to (a) send a single I/O request to the disk, (b) for the disk to read/write your request, and then (c) for your VM to receive a response? 

**In the end, your total possible performance is a formula:** 
1. What are the Azure Managed Disk's published Max IOPS?
2. How long does it take the app to send a single I/O request to the disk? (this measures app performance, VM compute usage, network performance)
3. How long it takes the app to respond to a single I/O request?
1. disk max IOPS latency and throughput will determine how fast your app can process data from storage.



- Latency puts a limit on IOPS. If our disk can handle 5,000 IOPS but our VM/compute takes 10 ms to process each individual read and/or write operation (one I\O), then our app will be capped to 100 operation per second due to the processing time. 



