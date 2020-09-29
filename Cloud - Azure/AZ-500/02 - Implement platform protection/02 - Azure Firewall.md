# Why use Azure Firewall?

- Stateful "Firewall as a service" - fully managed, cloud-based network security
- Integrated w Azure Monitor
- Built in high availability
- Supports hybrid connectivity

# Performance and Cost?
- Jeff: "I would expect you get better performance from Azure Firewall than your on-premise device"
- $900/mth
- Look for throughput, latency

# What do you monitor with Az Firewall?
- Layer 3 - 7 (create connectivbity policies for these)
- Application level FQDN filtering rules
- FQDN tags
- Network traffic filtering rules
- Outbound SNAT
- Inbound DNAT
- Separate firewall subnet
- Static public IP

![x](https://i.imgur.com/h3Vy2uS.png)
