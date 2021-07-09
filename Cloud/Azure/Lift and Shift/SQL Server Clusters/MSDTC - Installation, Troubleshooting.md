Configuring MSDTC for a SQL cluster in Azure is a mix of two things: 
- Configuring the Azure load balancer
- Configuring the cluster

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
- [DTCPing to validate basic connectivity, issues](https://www.microsoft.com/en-us/download/details.aspx?id=2868)
    - You have to run this on both nodes at the same time
- [DTCTester when you want to go deeper](https://www.microsoft.com/en-us/download/details.aspx?id=2868&ranMID=24542&ranEAID=TnL5HPStwNw&ranSiteID=TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag&epi=TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag&irgwc=1&OCID=AID2200057_aff_7593_1243925&tduid=%28ir__yd31nhn00wkfq3bhkk0sohzgke2xubrxr3pghrnh00%29%287593%29%281243925%29%28TnL5HPStwNw-tlaMfOcAKzOyg32uEqp9Ag%29%28%29&irclickid=_yd31nhn00wkfq3bhkk0sohzgke2xubrxr3pghrnh00) 
    - Only runs on one node

Older resources: 

- [Configure MSDTC through a firewall](https://docs.microsoft.com/en-us/troubleshoot/windows-server/application-management/configure-dtc-to-work-through-firewalls)
- [Troubleshooting MSDTC failed transactions](https://docs.microsoft.com/en-us/troubleshoot/windows/win32/cannot-start-transaction-ms-dtc)
- [Troubleshooting MSDTC configurations](https://docs.microsoft.com/en-us/biztalk/core/troubleshooting-problems-with-msdtc)
