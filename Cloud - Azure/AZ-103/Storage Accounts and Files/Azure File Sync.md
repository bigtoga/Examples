https://docs.microsoft.com/en-us/azure/storage/files/storage-sync-files-deployment-guide

# High-level overview of steps
The recommended steps to onboard on Azure File Sync for the first with zero downtime while preserving full file fidelity and access control list (ACL) are as follows:

1. Create the Azure File Share and create the **cloud endpoint** 
1. Deploy a Storage Sync Service (Azure File Sync in the portal)
1. Create a sync group
1. Install Azure File Sync agent on the server with the full data set.
1. Register that server 
1. Create a **server endpoint** on the share.
1. Let sync do the full upload to the Azure file share (cloud endpoint).
1. After the initial upload is complete, install Azure File Sync agent on each of the remaining servers.
1. Create new file shares on each of the remaining servers.
1. Create server endpoints on new file shares with cloud tiering policy, if desired. (This step requires additional storage to be available for the initial setup.)
1. Let Azure File Sync agent do a rapid restore of the full namespace without the actual data transfer. After the full namespace sync, sync engine will fill the local disk space based on the cloud tiering policy for the server endpoint.
1. Ensure sync completes and test your topology as desired.
1. Redirect users and applications to this new share.
1. You can optionally delete any duplicate shares on the servers.

# Prerequisites
1. An Azure file share in the same region that you want to deploy Azure File Sync
1. At least one supported instance of Windows Server or Windows Server cluster to sync with Azure File Sync
  - Windows 2019, 2016, 2012 R2
  - https://docs.microsoft.com/en-us/azure/storage/files/storage-sync-files-planning#windows-file-server-considerations
1. Az Powershell module requires Powershell 5.1+
1. Az Powershell module with Powershell 5.1 also requires .NET Framework 4.7.2+

# Steps to install
## Azure - create an Azure File Sync service
1. In Azure Portal, search for **Azure File Sync** then **Create** (hint: it's part of Marketplace)
1. Create the Azure File Sync service - Provide a unique **name**, the subscription, the resource group, the location, then click **Create**
  
## On-Premise VMs - install and configure the agent
1. On-Prem VMs: Disable Internet Explorer Enhanced Security Configuration on the VM
1. On-Prem VMs: From the VMs, install the [Azure File Sync Agent](https://go.microsoft.com/fwlink/?linkid=858257)
  - You must enter the details from the previous step
  - Note: A server can only participate in **one Storage Sync Service trust relationship**
  - Note: if you want to use a failover cluster as the source, you must install and register the agent on all nodes

## Azure - create a file share and sync group
1. Create an Azure File Share - this will be where your on-prem files will be synced in Azure
1. Go to the Storage Sync Services blade and create a **sync group**
  - A sync group must contain one cloud endpoint, which represents an Azure file share and one or more server endpoints
  - Provide the **name**, the **subscription**, the **storage account** that contains your Azure File Share, and the Azure File Share
    - A **cloud endpoint** is a pointer to an Azure file share

## Azure - add the on-prem VMs and source folders (a.k.a. a "server endpoint")
1. Go to the Sync Group in Azure Portal
1. Click **Add server endpoint**
    - A **server endpoint** represents a specific location on a registered server, such as a folder on a server volume
    - A server endpoint **must be a path on a registered server (rather than a mounted share)**
    - To use **cloud tiering**, the path must be on a non-system volume
    - Network attached storage (NAS) is not supported.
    - All server endpoints will sync with a cloud endpoint, making the cloud endpoint the hub
    - Enter the name of the server or cluster
    - Enter the path
    - Decide whether to use cloud tiering (archiving of infrequently accessed files)
    - Enter the desired Volume Free Space to reserve on the on-prem volume - 50% = ~ half the data is tiered to Azure Files
    
## Azure - configure the Azure Storage Account
1. Go to the storage account for your Azure Files share and go to **Firewalls and virtual networks**
1. Add your trusted on-prem VMs IPs
1. Make sure **Allow trusted Microsoft services to access this storage account** is checked

