Configuring MSDTC for a SQL cluster in Azure is a mix of two things: 
- Configuring the Azure load balancer
- Configuring the cluster

# Configure Azure Internal Load Balancer

- Standard Sku

[How to set up the load balancing rule](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-vnn-azure-load-balancer-configure?tabs=ilb#set-load-balancing-rules)
    1. Port - set to the TCP port that the SQL cluster is using
    2. Enable **Floating IP** (direct server return)
    3. Backend Port - set to the same port # as you set **Port**
    
[How to set up the health probe - in the ILB](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-vnn-azure-load-balancer-configure?tabs=ilb#configure-cluster-probe)
    1. Create the load balancer health probe - most people set to `59999`
    
[How to set up the cluster to respond to the probe](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-vnn-azure-load-balancer-configure?tabs=ilb#configure-cluster-probe)
    1. 

# To Test Whether MSDTC Is Working

```sql
-- Works:
SELECT COUNT(*) FROM sqlclusterinstanceA.master.sys.databases
SELECT COUNT(*) FROM sqlclusterinstanceB.master.sys.databases

-- Works:
BEGIN DISTRIBUTED TRANSACTION
	SELECT COUNT(*) FROM master.sys.databases
COMMIT TRANSACTION

-- Fails: Msg 3910: Transaction context in use by another session
BEGIN DISTRIBUTED TRANSACTION
	SELECT COUNT(*) FROM sqlclusterinstanceA.master.sys.databases
COMMIT TRANSACTION

-- Fails w timeout after 5-15 minutes: 
--		OLE DB provider "SQLNCLI11" for linked server "msqa" returned message "No transaction is active.".
--		Msg 7391: The operation could not be performed because OLE DB provider "SQLNCLI11" for linked server "msqa" was unable to begin a distributed transaction.
-- Wait type is PREEMPTIVE_COM_QUERYINTERFACE which means SQL Server sent a network call to the NIC/OS and is waiting for OS/NIC to respond. 
BEGIN DISTRIBUTED TRANSACTION
	SELECT COUNT(*) FROM sqlclusterinstanceB.master.sys.databases
COMMIT TRANSACTION

```

## Resources

- [Installing SQL FCI cluster with MSDTC (from 2019)](https://www.sqlservercentral.com/blogs/configure-sql-server-failover-cluster-instance-on-azure-virtual-machines-with-msdtc-sql-azure-msdtc)
- [Ryan's walkthrough video](https://www.youtube.com/watch?v=GS12sfOdC1o)

### Testing Tools

#### PowerShell - Test-Dtc

https://docs.microsoft.com/en-us/powershell/module/msdtc/test-dtc?view=windowsserver2019-ps

```powershell

# View the current MSDTC
Get-Dtc

# Test the local server
Test-Dtc -LocalComputerName "$env:COMPUTERNAME" -Verbose

# Test a remote server
Test-Dtc -LocalComputerName "$env:COMPUTERNAME" -RemoteComputerName "OtherServer" -ResourceManagerPort 17100 -Verbose
```

#### DTCPing

[DTCPing to validate basic connectivity, issues](https://www.microsoft.com/en-us/download/details.aspx?id=2868)

1. Login to node A and run DTCPing.exe
2. Login to node B and run DTCPing.exe
3. On node A, type the NetBIOS name of node B, and then click **Ping**
4. On node B, type the NetBIOS name of node A, and then click **Ping**
5. Test begins

DTCPing will:
1. Tests DNS resolution
2. Tests Remote Procedure Call (RPC) communication
3. Detects and display all the registry key settings touched by MSDTC
4. Tests DTC communication between the hosts
5. Logs the connection communication in the log files



- [DTCTester when you want to go deeper](https://www.microsoft.com/en-us/download/details.aspx?id=2868&ranMID=24542&ranEAID=TnL5HPStwNw&ranSiteID=TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag&epi=TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag&irgwc=1&OCID=AID2200057_aff_7593_1243925&tduid=%28ir__yd31nhn00wkfq3bhkk0sohzgke2xubrxr3pghrnh00%29%287593%29%281243925%29%28TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag%29%28%29&irclickid=_yd31nhn00wkfq3bhkk0sohzgke2xubrxr3pghrnh00) 
    - Only runs on one node

Older resources: 

- [Configure MSDTC through a firewall](https://docs.microsoft.com/en-us/troubleshoot/windows-server/application-management/configure-dtc-to-work-through-firewalls)
- [Troubleshooting MSDTC failed transactions](https://docs.microsoft.com/en-us/troubleshoot/windows/win32/cannot-start-transaction-ms-dtc)
- [Troubleshooting MSDTC configurations](https://docs.microsoft.com/en-us/biztalk/core/troubleshooting-problems-with-msdtc)
