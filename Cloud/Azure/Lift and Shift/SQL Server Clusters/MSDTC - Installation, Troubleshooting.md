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
- [DTCPing to validate](https://www.microsoft.com/en-us/download/details.aspx?id=2868)
    - You have to run this on both nodes at the same time
