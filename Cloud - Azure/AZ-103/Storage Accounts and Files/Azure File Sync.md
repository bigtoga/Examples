https://docs.microsoft.com/en-us/azure/storage/files/storage-sync-files-deployment-guide

# Prerequisites
1. An Azure file share in the same region that you want to deploy Azure File Sync
1. At least one supported instance of Windows Server or Windows Server cluster to sync with Azure File Sync
  - Windows 2019, 2016, 2012 R2
  - https://docs.microsoft.com/en-us/azure/storage/files/storage-sync-files-planning#windows-file-server-considerations
1. Az Powershell module requires Powershell 5.1+
1. Az Powershell module with Powershell 5.1 also requires .NET Framework 4.7.2+

# Steps to install
1. On-Prem VMs: Disable Internet Explorer Enhanced Security Configuration on the VM
1. Azure: In Azure Portal, search for **Azure File Sync** then **Creae** 
1. Azure: Provide a unique **name**, the subscription, the resource group, the location, then click **Create**
1. On-Prem VMs: From the VMs, install the [Azure File Sync Agent](https://go.microsoft.com/fwlink/?linkid=858257)
  - You must enter the details from the previous step
  - Note: A server can only participate in **one Storage Sync Service trust relationship**
  - Note: if you want to use a failover cluster as the source, you must install and register the agent on all nodes
1. On-Prem VMs: register each server/node with the Storage Sync Service in Azure
1. On-Prem VMs: 
