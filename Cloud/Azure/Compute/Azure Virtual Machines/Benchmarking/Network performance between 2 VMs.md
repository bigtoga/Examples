# Use NTTTCP for testing

[Key article is here](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-bandwidth-testing)

### Setup
1. 2 VMs either in same availability set or same proximity placement group
2. One is "Sender", one is "Receiver"
    - 10.0.0.1 is Sender
    - 10.0.0.2 is Receiver in examples below
4. Note size, IP addresses of both
5. Download [NTTTCP](https://github.com/microsoft/ntttcp) from github and place on both in `<PATH>`
6. Open up Windows Firewall on both
    - `netsh advfirewall firewall add rule program=<PATH>\ntttcp.exe name="ntttcp" protocol=any dir=in action=allow enable=yes profile=ANY`
7. Do a quick test to make sure it is working
    - Start it in a `command prompt` (not PowerShell) on the Receiver, `ntttcp -r -t 10 -P 1`
    - Now on Sender, `ntttcp -s10.0.0.2 -t 10 -n 1 -P 1`
8. Once you confirm "It works!":
    - Change duration to 300 seconds for best accuracy
    - Pass in the `-m` switch with the # of cores the VMs have - `ntttcp -r –m [2*#num_cores],*,10.0.0.1 -t 300`
    - For a 4-core VM, it looks like this: `ntttcp -r –m 8,*,10.0.0.2 -t 300`


# Documentation

It's missing from latest version...

```
-a   specifies asynchronous transfer mode (default: 2)
-l    specifies the length of the buffer (default: 64K)
-n   specifies number of buffers being used (default: 20K)
-p   specifies the port number being used (default: 5001)
-w  WSASend / WSARecv mode
-sb  specifies the SO_SNDBUF size (default: zero)
-rb  specifies the SO_RCVBUF size (default: 64K)
-f    prints output to a file
-u   UDP send/recv mode
-x   specifies pkt array size for TransmitPacket (default: 1)
-i    specifies inifinite loop for UDP
-v   specifies verbose mode
-6   IPv6 support
-fr   full receive buffers post mode
-m   the mapping that specifies threads per link, processor number to which to set thread affinity, and IP address of receiver machine
```

### Other Tips:
- When sending packet lengths < 1460 bytes, set `SO_SNDBUF` > zero on sender and `SO_RCVBUF` to zero on receiver
- Make sure the IP address of the receiver exists in both 
- Make sure the `-a` parameter is specified in both for best results
- Specifying a `-a` value of 1 implies synchronous transfers and will not yield the best performance
- Make sure you start receiver first
- If retransmits occur, try increasing `-a` value on receive side


```
Thread Realtime(s) Throughput(KB/s) Throughput(Mbit/s)
===== ========  ============= ===============
0        11.984        111997.437         895.979
Total Bytes(MEG)   Realtime(s)   Ave Frame Size   Total Throughput(Mbit/s)
=============   ========   ============  ===================
1342.177280         11.984         8193.550           895.979
Total Buffers   Throughput(Buffers/s)   Pkts(sent/intr)   Intr(count/s)   Cycles/Byte
=========    ================   ===========   ==========   =========
20480.000      1708.945                    1                     16599.38         7.3
Packets Sent   Packets Received   Total Retransmits   Total Errors   Avg. CPU %
==========  =============   =============   =========  =========
163809          73266                   0                         0                13.36

```
