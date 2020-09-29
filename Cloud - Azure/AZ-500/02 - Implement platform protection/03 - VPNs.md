# VPN Forced Tunneling

- Redirect internet-bound traffic back to company's on-prem infrastructure for inspection and auditing
- Internet-bound traffic from VMs, by default, always traverses "from Azure network infrastructure directly out to the internet", without inspection or audit
- **You configure forced tunneling in Azure via virtual network User Defined Routes (UDR). Redirecting traffic to an on-premises site is expressed as a default route to the Azure VPN gateway. This example uses UDRs to create a routing table to first add a default route and then associate the routing table with your virtual network subnets to enable forced tunneling on those subnets.**
