# Hub and Spoke configurations

https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke

https://docs.microsoft.com/en-us/azure/firewall/tutorial-hybrid-portal

## Scenario: Spoke routes all traffic through Hub-deployed Azure Firewall

1. vnet-hub - Connects to on-prem using S2S VPN w BGP route propagation enabled    
    - AzureFirewallSubnet
      - Azure Firewall deployed here
    - SubnetA
      - On-prem VMs 
2. vnet-spoke1 - Peered to vnet-hub
    - SubnetB
        - Azure VMs
        
**You want to require all traffic from SubnetB goes through Azure Firewall - how?**

You need two routes: 
1. `UDR-Hub-Spoke` from the hub gateway subnet to the spoke subnet through the firewall IP address
  - Route name: `ToSpoke`
  - Address prefix: 10.6.0.0/16
  - Next hop type: Virtual appliance 
  - Next hop address: private Azure Firewall IP
2. `UDR-DG` A default route from the spoke subnet through the Azure Firewall IP address 
  - Route name: `ToHub`
  - Address prefix: 0.0.0.0/0
  - Next hop type: Virtual appliance 
  - Next hop address: private Azure Firewall IP

Now you associate them:
3. Associate `UDR-Hub-Spoke`
  - Virtual network: vnet-spoke1
  - Subnet: SubnetB
4. Associate `UDR-DG`
  - Virtual network: vnet-hub
  - Subnet: GatewaySubnet
