Options explained visually 
- Top is DSR / Asymmetric Routing
- Bottom is Inljne / Symmetric Routing

Note that this page exclusively talks about two-arm deployments. 

![x](https://i.imgur.com/G5i9s9Z_d.webp?maxwidth=640&shape=thumb&fidelity=medium)

![x](https://i.imgur.com/l7X8AtP_d.webp?maxwidth=640&shape=thumb&fidelity=medium)

![x](https://i.imgur.com/ovoHDM2_d.webp?maxwidth=640&shape=thumb&fidelity=medium)

# Routing option #1: nPath Routing with Direct Server Return (DSR)

a.k.a. Asymmetric Routing using SNAT

- [Overview from F5](https://www.f5.com/services/resources/deployment-guides/npath-routing-direct-server-return-big-ip-v114-ltm)
- [Deployment guide PDF](https://www.f5.com/content/dam/f5/corp/global/pdf/deployment-guides/iapp-npath-dg.pdf)

a.k.a. “Web server responds directly to caller”

From the client’s POV, it’s a bit weird - it sent a packet to {*load balancer VIP*} but received a response from {*web server IP*}

Client 
   -> router 
      -> F5 frontside VIP 
         -> web server 
            -> router 
               -> Client

In this example, the source IP never changes (conceptually). The F5 is just acting as a router. Conceptually it works like this:
1. The firewall router forwards the packet to the VIP
1. F5 VIP module picks the correct server from the pool
1. F5 LTM forwards the packet to the chosen web server
1. The web server responds directly to the source IP from the packet

Great for performance of the F5 but “breaks” certain types of client communications. After all, most clients expect the “response” to come from the IP address that they sent the packet to. 
- Some clients will reject return traffic that they did not initiate

Also have to remember to preserve the port and have the web server return the request on the correct port. 

From the web server’s POV, the “source address” a the F5’s backside IP. Use `x-forwarded-for` to capture actual source IP from headers 

### More resources 

- [F5 manual for SNAT deployments](https://techdocs.f5.com/kb/en-us/products/big-ip_ltm/manuals/product/ltm-concepts-11-5-1/17.html#unique_2019501948)

# Routing option #2: Symmetric Routing

Easiest architecture to explain and understand - as far as the client knows, it sent a packet to {*load balancer VIP*} and it received a response from {*load balancer VIP*}

Also called inline routing. Load balancer uses SNAT to return directly back to client

Client 
   -> router 
      -> F5 frontside VIP 
         -> web server (SNAT back to self IP of F5)
            -> F5 backside VIP 
               -> router
                  -> client

Client receives the response from the IP that it sent the request to. 

## Full proxy mode

In Symmetric Routing, the F5 maintains two independent connections - one to the client, and a separate one to the web server. 

In a two-arm setup, the F5 uses SNAT on the backside when it sends the packet to the web server. This effectively “changes the source IP address” (to be the backside IP). 
