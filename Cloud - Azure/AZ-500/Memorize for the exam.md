- Tagging is not an "administrative action" thus it will not trigger alerts

<details>
  <summary> Transfering subscriptions, tenants </summary>
  
- **What perm to transfer subscription to new tenant?** = Owner
- **How to transfer billing ownership?** - Azure portal
- **What happens on subscription transfer to new tenant?**
    - All users, groups, service principals who had RBAC **to manage subscriptions and resources** lose access
    - Only the user in the new account who accepts the transfer will have access
- **What can you transfer a subscription to?**
    - To another user or another tenant

</details>
  
<details>
  <summary> Web Apps </summary>

# Web Apps

- **Mutual authentication - how?**
    - TLS 1.2
    - Turn on incoming client certificates protocol setting for the Web App
- **Have a web app use a cert - how?**
    - 1. Security team uploads a certificate to the Web App
    - 2. Developer team updates the app settings for the Web App using `WEBSITE_LOAD_CERTIFICATES`
    - `az webapp config appsettings set --name myApp --resource-group rgApp --settings WEBSITE_LOAD_CERTIFICATES=<comma-separated-certificate-thumbprints>`

</details>
  
<details>
  <summary> Networking </summary>

# Networking

## Application Security Groups

- Scope is the virtual network - can reference all subnets in all virtual networks within the resource group
- Limited to "the virtual network of the first device added to the ASG"
- Cannot reference multiple ASGs in a single rule 
- https://docs.microsoft.com/en-us/azure/virtual-network/application-security-groups

</details>
  
<details>
  <summary> HDInsight & Apache </summary>
  
# HDInsight & Apache

- https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-overview
    - [Why use HDInsight?](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-overview#why-should-i-use-azure-hdinsight) - optimized clusters for Apache-based things like Hadoop, Spark, more; end to end SLA; integrates w Azure Monitor; globally available; support Python, .NET; Azure AD integrated
- [Domain join](https://docs.microsoft.com/en-us/azure/hdinsight/domain-joined/apache-domain-joined-configure-using-azure-adds)
    - **Enterprise Security Package (ESP) clusters provide multiuser access on Azure HDInsight cluster connected to an Azure AD domain**
    - **Requires Global administrator to enable**
    - **Can required trusted IPs and MFA**
  
- **How to allow HDInsight to be available to users authenticating through on-premise?**
    - **Password Hash sync** with AD Connect is required for on-prem hybrid    
    - Configuring Azure AD DS is also required - - it is the only supported way for HDInsight to perform authentication. AD Connect from on-prem to Azure AD syncs the user identity, then Azure AD DS authenticates to HDInsights
    - Create a VPN between on-prem and Azure    
    - Create a custom DNS server in the Azure Virtual Network
    - Configure the virtual network to use the custom DNS server instead of the default Azure Recursive Resolver
    - Configure forwarding between the custom DNS server and your on-premises DNS server
    - https://docs.microsoft.com/en-us/azure/hdinsight/domain-joined/apache-domain-joined-create-configure-enterprise-security-cluster

</details>
  
<details>
  <summary> Key Vault </summary>
# Key Vault

- **Soft-delete length?** - 90 days
- **Default settings** - can delete, can purge (i.e. soft-delete is not enabled)
- **After an object is soft-deleted, can it still be accessed?** - No, has to be restored to be accessible
- **After an object is soft-deleted, can you still see that it exists as soft-deleted?** - Yes, it shows up in lists of the resources
- **When soft-delete is enabled, can you actually hard delete?** - Yes
- **When soft-delete is enabled, how do you prevent hard delete?** - Enable purge protection
- **How to create automation runbook to rotate storage account keys and save to AKV?**
    - Create automation account
    - Import the AzureRM Powershell modules into the account 
    - Create a connection resource in the Automation Account
    - Run the `Set-AzureRmKeyVaultAccessPolicy` cmdlet
- **How to assign VM access using Azure CLI?**
    - `az vm identity assign...`
    - `az keyvault set-policy ... --secret-permissions get list`
- **Where can you restore a key, secret, or certificate?**    
    - Same subscription, and either the same geography or the paired region
    - https://docs.microsoft.com/en-us/azure/key-vault/general/backup#design-considerations
  
</details>
  
<details>
  <summary> Data </summary>
  
# Azure SQL and Web Apps

- **Setup Azure SQL Database to allow Azure AD accounts - how?** 
    - Step 1: When you created Azure SQL database, you created it with a SQL login
    - Step 2: Now create another administrator based on an existing Azure AD account
    - Step 3: Proceed to add the other Azure AD accounts using `CREATE USER myuser@mydomain.onmicrosoft.com FROM EXTERNAL PROVIDER`
- **Want to have secure access from web app to Azure SQL but also authenticate Azure AD users - how?**
    - AAD System Managed Identity
    - AAD User Assigned Managed Identity
    - Create contained users in Azure SQL database
- **Different ways to authenticate in SSMS?**
    - AAD Integrated - use when you are already logged in to your Windows or AAD domain
    - AAD Password - use when you want to use your Windows credentials but your local machine is not joined with the domain
    - AAD MFA (interactive)
- **Get alerts for threats in SQL?**
    - Advanced Data Security Server settings
  
# Cosmos DB

**What permissions needed to grant web app work w CosmosDB?**
    - CosmosDB: Create database users and generate resource tokens
    - Web App: Authenticate AD Users and relay resource tokens

</details>
  
<details>
  <summary> VMs </summary>
  
# VMs 

- **How to capture all network packets sent to a VM?** - Network Watcher and **variable packet capture**
- **Update Mgmt and automation scope?** - Just OS and subscription; not regional and not resource group specific
    - VM1 from RG1 in East US and VM2 from RG29 in Central US - as long as they are either "both Windows" or "both Linux" and in same sub, they can go together

### Template and Policies namespaces
- **Deploying Anti-malware?**
    - Microsoft.Compute/virtualMachines/extensions/type == **IaaSAntiMalware**
    - Microsoft.Compute/virtualMachines/extensions/publisher == **Microsoft.Azure/IaaSAntiMalware**
- **Disks for VMs are under `Microsoft.Compute/disks`**
- **Resource groups?** - Microsoft.Resources/subscriptions/resourceGroups
- **Just in time requirements?**
    - Microsoft.Security/locations/jitNetworkAccessPolicies/initiate/action
    - Microsoft.Compute/virtualMachines/**read**
- **Event Hub, not Grid**    

### Security Application Controls

- **Part of Security Center, aka adaptive application controls**
    - https://docs.microsoft.com/en-us/azure/security-center/security-center-adaptive-application
    - Requires Azure Defender for servers
    - Supported on Azure VMs, on-prem, Azure Arc enabled VMs    
- **Permissions:  req'd for Security Application Controls?**
    - Contributor and Security Admin - edit, list
    - Security Reader, Reader - view groups and lists of known-safe apps
- **How to prevent unwanted software / malware running on VMs?** = Azure Security Application Controls
- **How to block attempts to run malicious apps?** = Azure Security Application Controls

-------------------------------------------
### Log Analytics integration 

- **How to ensure that System event logs from VMs are logged in LAW?** - LAW -> **Advanced Settings** -> Data -> Windows Event Logs -> Enter "System"
- **How to deploy LAW to all VMs?** 
    - enable Automatic provisioning (once enabled, it is enabled on all existing and new VMs)
    - Off by default
    - Automatic provisioning is "strongly recommended" (source: https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-data-collection)
- **ARM Template settings for Log Analytics deployment w VM?**
    - settings: workspaceId
    - protectedSettings: workspaceKey
    - https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/oms-windows
- **Ensure LAW only has certain VMs in it**
    - Create a new computer group
    - Create a new scope configuration and include the computer group (can include other groups as well if needed)
    - Apply the scope to your LAW solution (one solution can only have one scope)

-------------------------------------------
### Disk encryption 

- **Azure Key Vault is regional **
- **Can VM1 use Azure Disk Encryption?** - Yes, as long as "Allow trusted Microsoft services to bypass this firewall" is enabled for your Key Vault
- **Disk encryption requirements?** 
    - Cannot use A-series VMs
    - Cannot use Basic tier VMs
    - Cannot use Gen2 VMs
    - Cannot use on custom images for Linux (Like a Daily build)
    - Requires 2GB+ RAM
    
- **How to enable disk encryption?**
    1. Create an Azure Key Vault
    2. Configure an Azure Key Vault access policy
    3. Run `Set-AzVMDiskEncryptionExtension`
    - https://docs.microsoft.com/en-us/azure/security/fundamentals/azure-disk-encryption-vms-vmss
    - https://docs.microsoft.com/en-us/azure/virtual-machines/linux/disk-encryption-overview

</details>

<details>
  <summary> Identity Management  </summary>
  
# Identity Management

**Have 1 dynamic group for all users and devices. What is best practice?** - 2 new groups, 1 for users and 1 for devices

**How to enable passwordless access?** - Use *one* of these:
- Windows Hello for Business
- Microsoft Authenticator app
- FIDO2 security keys

## AD Joining config

**By default, 3 entities get added to an AD joined device's Local Administrators group** - 
- Azure AD global Administrator
- Azure AD Device Administrator
- User performing the AD join process

You can specify additional in setup

## MFA

- **Require MFA for Azure portal?** - Tenant -> Security -> Conditional Access -> New Policy -> Cloud Apps -> Select users -> Grant -> Require MFA
- **User belongs to Grp1 which is marked `Include` for MFA and user belongs to Grp2 which is marked `Exclude` for MFA. Who wins?** Exclude wins - user will not be prompted for MFA
- **How to enable / change MFA?** - In portal, search for Multi-Factor Authentication
- **How to block/unblock users?** - In portal, search for Multi-Factor Authentication -> Block/Unblock users
- **How to enable / set up fraud, fraud blocked sign-ins?** - Multi-Factor Authentication -> Fraud Alert
- **Set up custom caller ID? Change # of PIN attempts?** - Multi-Factor Authentication -> Phone call settings
- **One time bypass?** - Multi-Factor Authentication -> One-time bypass
- **Caching?** - Multi-Factor Authentication -> Caching
- **Activity report?** - Multi-Factor Authentication -> Activity Report
    - Lab 4 - https://github.com/MicrosoftLearning/AZ500-AzureSecurityTechnologies/blob/master/Instructions/Labs/LAB_04_MFAConditionalAccessandAADIdentityProtection.md
    1. Assign P2 license to the user
    2. In portal, go to Tenant -> Security -> and click on **Additional cloud-based MFA settings**
    3. Configure it, then click Save
    4. Go to Users blade -> Click on **Multi-factor Authentication** at the top
    5. Configure
- **How to set up Trusted IPs?**
    - Option 1: 
      - 1. In portal, search for trusted IPs
      - 2. Click on Azure Named Locations
    - Option 2: 
      - 1. In portal, go to Tenant -> Users -> Click on **Multi-factor Authentication** at the top
      - 2. Click on **service settings**

## Priviliged Identity Management

- **Requirements?**
    - P2
    - Global administrator
- **Can a user in a group that is marked as the Approvers for a privilege approve their own request?**
  - No, you cannot approve your own requests regardless
- **Grant someone privileged role use for a period**
    - 1. Portal -search for Privileged...
    - 2. Manage -> AD Roles -> Roles and assign
- **Prevent permanent eligible assignment?**
    - 1. Portal -search for Privileged...
    - 2. Manage -> AD Roles -> Roles and assign
    - 3. Click on the role you want
    - 4. Click on **Settings** and make changes to "Allow permanent eligible assignment"
- **Change maximum length of assignment (i.e. time)?**
    - 1. Portal -search for Privileged...
    - 2. Manage -> AD Roles -> Roles and assign
    - 3. Click on the role you want
    - 4. Click on **Settings** and make changes to "Allow permanent eligible assignment" and "Allow permanent active assignment"

## Dynamic Groups

- Queries are not case sensitive
- Can use * as wildcard: "\*on" matches on anything that ends in "on" 

</details>

<details>
  <summary> Just in Time </summary>

# Just in Time

- Just in time requires "Standard" version of Security Center, not default of Basic  
- Requires an NSG "somewhere" - can be attached to subnet or NIC 

</details>

<details>
  <summary> Azure Firewall  </summary>
  
- Azure Firewall requires that you create a new subnet first named `AzureFirewallSubnet`
- **How to record all Azure Firewall logs?** - Diagnostics settings - https://docs.microsoft.com/en-us/azure/firewall/firewall-diagnostics
- **How to allow RDP from the internet?** - Create a NAT collection and configure the NSG
- **Allow certain FQDNs access through Azure Firewall?** - Application collection rules allow certain domains outbound
    - Action = Allow
    - Rules: Target FQDNs
    - Source type: IP address
    - Source: 10.2.0.0/24 (All VMs on your local subnet)
    - Target FQDNS: `www.google.com`

</details>

  
<details>
  <summary> Containerization </summary>

# Kubernetes

- **Want to deploy K8s cluster and allow AAD users to auth - how?**
1. Create server application
2. Create client application
3. Deploy the cluster
4. Create an RBAC binding

</details>
