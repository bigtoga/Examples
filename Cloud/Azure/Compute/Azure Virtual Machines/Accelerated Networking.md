## Why? What does it do?

In a phrase: it removes the **virtual switch** from the datapath which reduces the # of hops. 

This helps in several ways: 
1. **Lower latency** - Reduces the amount of time the packets spends at the host (Hyper-V level) processing
2. **Higher Packets per Second** - By removing the virtual switch, you then increase the number of packets that can be processed inside the VM
3. **Reduced Jitter** - Virtual switch processing depends on the amount of policy that needs to be applied and the workload of the CPU that is doing the processing. Offloading the policy enforcement to the hardware removes that variability by delivering packets directly to the VM, removing the host to VM communication and all software interrupts and context switches, which is better for streaming data.
4. **Decreased CPU Utilization** - Bypassing the virtual switch in the host leads to less CPU utilization for processing network traffic, leaving more capacity for processing large amounts of data being sent or received.

## Tips for Measuring "Is it better or not?" (i.e. latency)

Test **Latency** with:
1. Use [psping.exe with -L switch](https://docs.microsoft.com/en-us/sysinternals/downloads/psping) on a client and a server to test
2. Use [latte.exe](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-test-latency) to test before/after

Test **Throughput** with:
1. Use [NTttcp.exe](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-bandwidth-testing)
    - Server: `ntttcp -r -p 1434 -m 64,*,192.168.1.1 -rb 10m -a 16 -t 30`
    - Client: `ntttcp -s -p 1434 -m 8,*,192.168.1.1 -l 10m -a 2 -t 30`

## Resources

- [Benchmarking Accelerated Networking](https://azurealan.ie/2020/03/20/azure-accelerated-networking-put-to-the-test/)
- [
