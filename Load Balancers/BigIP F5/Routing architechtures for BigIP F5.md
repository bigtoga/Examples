# Routing option #1: nPath Routing with Direct Server Return (DAR)m

- [Overview from F5](https://www.f5.com/services/resources/deployment-guides/npath-routing-direct-server-return-big-ip-v114-ltm)
- [Deployment guide PDF](https://www.f5.com/content/dam/f5/corp/global/pdf/deployment-guides/iapp-npath-dg.pdf)

a.k.a. “Web server responds directly to caller”

Client -> router -> frontside VIP - > web server -> router -> Client

In this example, the source IP never changes (conceptually). The F5 is just acting as a router. Conceptually it works like this:
1. The firewall router forwards the packet to the VIP
1. F5 VIP module picks the correct server from the pool
1. F5 LTM forwards the packet to the chosen web server
1. The web server responds directly to the source IP from the packet

Great for performance of the F5 but “breaks” certain types of client communications. After all, most clients expect the “response” to come from the IP address that they sent the packet to

## Routing option #2: Asymmetric Routing

Also called inline routing 
