**Azure load balancers cannot balance across regions**

**How to monitor load balancer availability?**
- Data Path Availability - whether it is availably externally
- Health Probe Status - determine whether it will send net flows
- Inbound connections - monitor SYN packets (packet count, SYN count)
- Outbound connections - monitor SNAT Connections for # of successful and failed connections 
