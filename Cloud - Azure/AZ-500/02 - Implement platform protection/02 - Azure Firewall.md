![x](https://i.imgur.com/D573l9E.png)

# Why use Azure Firewall?

- Stateful "Firewall as a service" - fully managed, cloud-based network security
- Integrated w Azure Monitor
- Built in high availability
- Supports hybrid connectivity

# Performance and Cost?
- Jeff: "I would expect you get better performance from Azure Firewall than your on-premise device"
- $900/mth
- Look for throughput, latency
- No IPS capabilities

# What do you monitor with Az Firewall?
- Layer 3 - 7 (create connectivbity policies for these)
- Application level FQDN filtering rules
- FQDN tags
    - For example, to manually allow Windows Update network traffic through your firewall, you need to create multiple application rules per the Microsoft documentation. Using FQDN tags, you can create an application rule, include the Windows Updates tag, and now network traffic to Microsoft Windows Update endpoints can flow through your firewall.
- Network traffic filtering rules
- Outbound SNAT
- Inbound DNAT
- Separate firewall subnet
- Static public IP

![x](https://i.imgur.com/h3Vy2uS.png)
