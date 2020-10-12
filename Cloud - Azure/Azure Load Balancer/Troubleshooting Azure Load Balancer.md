# Basic Steps

Assumptions:
- Port 80 website
- IP range of 10.10.10.4,5 for 2 backend VMs

### From one of the backend VMs 
1. Bastion to the VM and try to access any one of the other VMs 
  - From VM1, make sure you can hit http://vm2 and have it work
  - This rules out any NSGs blocking subnet traffic
  
1. `netstat -na | find "80"`  

What you should see:

| Protocol  | Destination  | Source  | Status
|---|---|---|
| TCP  | 0.0.0.0:80  | 0.0.0.0:0   | LISTENING
| TCP  | 10.10.10.4:80  | 168.63.129.16:<random integer> | ESTABLISHED
| TCP  | 10.10.10.4:<random integer>  | 168.63.129.16:80  | ESTABLISHED

# SQL Server Troubleshooting 

https://docs.microsoft.com/en-us/archive/blogs/sql_pfe_blog/trouble-shooting-availability-group-listener-in-azure-sql-vm

https://clusteringformeremortals.com/2016/01/06/troubleshooting-azure-ilb-connection-issues-in-a-sql-server-alwayson-fci-cluster/
