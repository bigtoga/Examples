Requirements:
1. Collect IP addresses connecting to a load balancer
1. Be able to run queries against that data

Solution:
1. Enable Network Watcher
1. Configure NSG flow logs

https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview

# Key data points
- Flow logs operate at Layer 4 
- Flow logs record **all** IP flows going in and out of an NSG
-Flow logs are the source of truth for all network activity in your cloud environment
- Logs are collected through the Azure platform and do not affect customer resources or network performance in any way.
- Logs are **written in the JSON** format and show outbound and inbound flows on a per NSG rule basis.
- Each log record contains the network interface (NIC) the flow applies to, 5-tuple information, the traffic decision & (Version 2 only) throughput information
- Flow Logs have a **retention feature that allows automatically deleting the logs up to a year** after their creation **but only on General Purpose v2 Storage accounts (GPv2)**
- Flow data is sent to Azure Storage accounts from 
- Flow logs can be exported to any visualization tool, SIEM, or IDS 

# Use cases
1. Trying to optimize resources
1. Trying to detect intrusion
1. Want to monitor throughput
1. Compliance - verify network isolation and compliance with enterprise access rules
1. Network forensics & Security analysis: Analyze network flows from compromised IPs and network interfaces. Export flow logs to any SIEM or IDS tool of your choice.

