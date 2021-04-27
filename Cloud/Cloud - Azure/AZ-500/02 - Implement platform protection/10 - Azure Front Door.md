# Know for exam
- Split TCP
- Anycast 

https://docs.microsoft.com/en-us/azure/frontdoor/front-door-faq

Features: 
- dynamic site acceleration (DSA)
-TLS/SSL offloading and end to end TLS
- Web Application Firewall
- cookie-based session affinity
- url path-based routing
- free certificates 
- multiple domain management

# FAQs

**What is the difference between Azure Front Door and Azure Application Gateway?** 
- Both are L7 load balancers 
- Front Door is a global service and App Gateway is a regional service
- Use App Gateway allows you to load balance between your VMs/containers etc. that is within the scale unit
- Use Front Door to load balance between App Gateways
