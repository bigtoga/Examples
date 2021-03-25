# Resources
- [Troubleshoot load balancer VM connectivity](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-troubleshoot-connectivity-problem-between-vms)

# Assumptions for this guide
- You have a "Port 80 website" to test (simplest test)
- IP range of 10.10.10.4, 5 for 2 backend VMs
- Load balancer has outbound rules configured so that VMs can access the internet
- Flow is Azure LB -> NSG1 -> NIC1 -> VM1 and Azure LB -> NSG1 -> NIC2 -> VM2
- Load balancer config:
  - Using the [default public IP of 168.63.129.16](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview#probesource)
  - Standard load balancer with public IP
  - Load balancer and VMs are in the same subnet
  - Inbound and outbound rules configured
- When you launch a browser to the public IP of the front side of the load balancer, it is failing to load

<details>
  <summary>First Steps</summary>

## Azure Portal

<details>
  <summary>Can the VMs load each other's web site?</summary>
1. Open up an Azure Bastion session to your 2 VMs
1. Load up http://localhost on each - make sure local web server is working
1. Make sure each VM can load the website of the other VM
  
Fix the above if broken before continuing
</details>

<details>
<summary>Are the health checks working?</summary>
- Go to the load balancer and load the **Metrics** or **Insights** blade:
  - Data Path Availability - tells you end-to-end availability (frontend => backend => NIC => Port on the VM and back again)
  - Health Probe Status - "Can the load balancer see the VMs on the backside?"
  - Both should be close to 100% in a healthy config

</details>

<details>
<summary>Are there any configuration problems with the load balancer?</summary>
- Go to the load balancer and load the **Metrics** or **Insights** blade:
  - Data Path Availability - tells you end-to-end availability (frontend => backend => NIC => Port on the VM and back again)
  - Health Probe Status - "Can the load balancer see the VMs on the backside?"
  - Both should be close to 100% in a healthy config

</details>


lbal-name | Diagnose and solve problems



4. Check that the local Windows Firewall isn't blocking anything for port 80 from 168.63.129.16

</details>

<details>
  <summary>First Steps</summary>

</details>


<details>
  <summary>Start from your laptop</summary>

</details>

## Start in the Azure Portal

**Are the load balancer health probes up or down?**

  
**
  



**Network Watcher -> Effective Security Rules**
- Choose the VM, NIC
- Should be empty as long as NICs have nothing specific

**Network Watcher -> Connection Troubleshoot**
- Choose VM1 as source and VM2 as destination with port 80
- Verifies the two servers can talk to each other on the given port

**Network Watcher -> IP Flow Verify**
- Choose the VM, then the NIC, then TCP
    - Local IP address is the NIC's address, use your laptop IP for Remote IP Address
    - Inbound test tells you "Can the Remote IP address make a call to the NIC on the given port?"
      - You should see "Access Allowed" and the name of the rule that allows this      
      - Example: "Access allowed. Security rule: Internet. Network security group: nsg1"
    - Outbound test verifies whether "from the VM" you can connect
      - Example: "Access allowed. Security rule: AllowInternetOutbound. Network security group: nsg1"

**Network Watcher -> NSG Flow Logs**
- Click on the NSG
- Enable flow logs (may require new storage account)
- 
  
### Azure Monitor
1. Service Health
2. Resource Health
3. Click through 

### From one of the backend VMs 
1. Bastion to the VM and try to access any one of the other VMs 
  - From VM1, make sure you can hit http://vm2 and have it work
  - This rules out any NSGs blocking subnet traffic
  
2. `netstat -na | find "80"`  

What you should see:

| Protocol  | Destination  | Source  | Status
|---|---|---|
| TCP  | 0.0.0.0:80  | 0.0.0.0:0   | LISTENING
| TCP  | 10.10.10.4:80  | 168.63.129.16:<random integer> | ESTABLISHED
| TCP  | 10.10.10.4:<random integer>  | 168.63.129.16:80  | ESTABLISHED
  
3. Use `Test-NetConnection` instead of PsPing to tcpPing ([documentation](https://docs.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=win10-ps#examples))
- Test-NetConnection -Port 80 -InformationLevel "Detailed"
- Test-NetConnection -ComputerName "www.microsoft.com" -InformationLevel "Detailed" -DiagnoseRouting
    - You can also add ` -ConstrainInterface 5` if you want to only test eth5
- 
- 
  
4. Install Wireshark, reboot, do a packet capture
- Query for `ip.addr == 168.63.129.16`
- Query for `ip.dst == 168.63.129.16`
- Query for `http` or `tcp.port == 80`

You need to make certain that the Azure Services IP addresses for load balancers (168.63.129.16) are not being blocked by an NSG

# SQL Server Troubleshooting 

https://docs.microsoft.com/en-us/archive/blogs/sql_pfe_blog/trouble-shooting-availability-group-listener-in-azure-sql-vm

https://clusteringformeremortals.com/2016/01/06/troubleshooting-azure-ilb-connection-issues-in-a-sql-server-alwayson-fci-cluster/

https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-troubleshoot

https://docs.microsoft.com/en-us/learn/modules/troubleshoot-inbound-connectivity-azure-load-balancer/3-diagnose-issues-by-reviewing-configurations-and-metrics
