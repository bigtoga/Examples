### Policy, Policies

**Want to apply alerts automatically when a new subscription is added to the EA - how?** - Az Policy

<details>
   <summary>Virtual Machines</summary>
   
**How to visualize the different processes running on VMs?** - Azure Services Map

**How to collect Windows Security logs and store for x years?** - Azure Log Analytics Agent but also Diagnostics Agent
   
**How to collect Windows Performance counters?** - Azure Log Analytics Agent

**Have a registered .NET app installed on VM and want it to authenticate to Azure resources using VM Managed Service identity - how?**
- Have it use the *Azure Instance Metadata Service Identity* to generate the request token

**Low priority nodes**
- Become unavailable if Azure does not have enough capacity

**What VM types are not supported/allowed by Azure Batch Jobs?**
- A series
- Burstable

## HPC

**Which SKUs?** - H and N

**What is RDMA?** - remote direct memory access
- Requires InfiniBand networking
- low latency, high bandwidth 
- Also requires SR-IOV
   
## Accelerated Networking   

**Need network optimized compute - what?** - D, F, E, L, M support Accelerated Networking   
   
**Accelerated networking - what is it?** - reduces latency, jitter, and CPU utilization

**What settings do you need to enable?** - Single Root I/O Virtualization (SR-IOV)

</details>   


<details>
   <summary>Load Balancer, Traffic Manager, App Gateway </summary>
   
**Need SSL offloading** - App Gateway; Load Balancer does not support   

**Region failure - protect web app cheapest way?** - Traffic Manager
   
</details>   

<details>
   <summary>Backups, Azure Site Recovery </summary>

## RPO options

https://docs.microsoft.com/en-us/azure/site-recovery/site-recovery-failover

#### Recovery Point options

- **Latest** - use the latest point. Lowest RPO

- **Latest processed** - Use this option to fail over VMs to the latest recovery point already processed by Site Recovery. You can see the latest processed recovery point in the VM Latest Recovery Points. This option provides a low RTO as no time is spent to processing the unprocessed data

- **Latest app-consistent** - ail VMs over to the latest application consistent recovery point that's been processed by Site Recovery.

- **Latest multi-VM processed** - VMs that are part of a replication group failover to the latest common multi-VM consistent recovery point. Other virtual machines fail over to their latest processed recovery point. This option is only for recovery plans that have at least one VM with multi-VM consistency enabled.

- **Latest multi-VM app-consistent**


**Fastest RTO for a VM?** - ARS

**RPO for ASR?** 
- VMs - 1 day
- Database backups: 15 minutes

**RPO for Azure Backup?**
- 1 day

**Want long term retention of backups - how?** - Set `Long term retention` in Azure Backup

**After a restore, want a custom script to run - how?** - Azure Automation Runbooks (https://docs.microsoft.com/en-us/azure/site-recovery/site-recovery-runbook-automation)

**Where to define custom scripts to run?** - In ASR, customize *Recovery plan*

**Diff. b/w Azure Backup and Azure Site Recovery?** 
- ASR use cases:
   - Business continuity and disaster recovery
   - Want to replicate VM configuration and data to Azure or to another datacenter
- Azure Backup - more granular

</details>   

<details>
   <summary>Data </summary>

## Azure Data Factory

**Need to copy 500GB of files to Azure - how?**
- Import/Export
- ADF

**Azure Data Factory - need to copy files from on-prem into Azure Blob storage. How?**
- Install the *Integration Runtime*
   
**Synapse - "petabytes of data and complex queries"**

## Cosmos DB
- 99.99% SLA
- Crazy fast read/write even worldwide (<10ms read, <15ms write for worldwide)
- Can authenticate apps using Managed Service Identity

## Azure SQL

**Where to send Azure SQL Database audit data?** - Log Analytics, Event Hub, or a Storage Account

**Company has SQL licenses already - should they migrate to a fixed-size DTU or vCore Azure SQL database?** - vCore   
   
**MSFT recommended way to migrate database to Azure?** - old way was BACPAC uploaded to Azure BLOB storage   

#### Backups and retention

**Which editions allow long term retention?**
- All except SQL DW

**Want long term retention of Azure SQL Database backups?** 
- https://docs.microsoft.com/en-us/azure/azure-sql/database/long-term-retention-overview
- Full backups taken automatically
- Long Term Retention copies these to different blobs for long term storage
- LTR policy has 4 settings:
      - Weekly backup retention (W) - one backup every week will be copied to the long-term storage
      - Monthly backup retention (M) - first backup of each month will be copied to the long-term storage
      - Yearly backup retention (Y) - one backup during the week specified by WeekOfYear will be copied to the long-term storage
      - Week of year (WeekOfYear) - only used w Y

**What are the default retentions?**
- Basic - 7 days
- Standard - 35 days
- Premium - 35 days
- SQL DW - snapshots every 7 days

</details>   

<details>
   <summary>Identity, Azure AD </summary>
   
**AD DS - what can it do?** - domain join, group policy, LDAP, Kerberos, NTLM, fully compatible w Windows AD
   
**Azure AD Id. Protection vs. PIM?** - almost always going to be PIM
   
# Which SKUs support...   

**JIT?** - P1 and P2

**Time bound access?** - P2 (PIM)

**Custom groups?** - P1


# How to...

**P2 customer - Want to get alerts whenever roles are activated + provide JIT access** - PIM

**P2 customer - ability to conduct access reviews** - PIM

**MFA for risky sign ins?** - P2 (PIM)





**
</details>   

<details>
   <summary>ADFS </summary>
# ADFS
   
**Can you authenticate on-prem users to AAD using ADFS?** - Yes
   
**How to monitor - ADFS?** - Active Direction Federation Services Health Check in Log Analytics

**How to monitor - WAP?** - Azure AD Connect Health
   
</details>   

<details>
   <summary>App Services Plan-based</summary>

**Want to run image processing app 1x per hour but not get charged when compute is not running - how?**
- Azure Functions
- Azure Web Jobs
- Azure Logic App **with recurring trigger** - if that's not in reqs, the answer is "No" for these

</details>   

<details>
   <summary> Logging, Monitoring, Analytics </summary>
   
### Log Analytics vs. Azure Monitor - which one?

- Metrics on Azure infrastructure? AzMon
- Status on functionality within Azure infrastructure? AzMon (which is which Service Health lives)
- Notice of security advisories? AzMon, within Service Health

**Microsoft Monitoring Agent = Log Analytics Agent**

**Want to monitor on-prem VMs in Azure - how?** - Install Microsoft Monitoring Agent

**Max retention you can set for raw data points?** - 730 days

**How to monitor traffic to VM from outside?** - Traffic Analytics

**Want report showing all "write" activity - how?** - Activity Log

**Give ability to view resource usage and performance data only?** - Log Analytics

**Give ability to visualize relationships between application components** - App Insights

</details>   

<details>
   <summary>Storage</summary>
   
**StorSimple - uses Azure Storage Blob account to copy snapshots of the data**
   
**Table storage - SLA?** - 99.99%

**Table storage - speed?** - Fast.

**How to rehydrate archive tier BLOB data?**
- Change tier to hot or cool
- May take 15 hours for large blobs; lots of small blobs may take longer

**Want to use SMB file share on Windows 2016 - what performance tier?** - Standard only; Premium only allows BLOBs

</details>   

<details>
   <summary>Networking</summary>
   
**ExpressRoute and poor VM network perf - how to monitor?** - Network Watcher w IP Flow Verify
- ExpressRoute = Network Watcher
- Log Analytics can monitor NSG flow logs but not ER
   
**On-prem - all traffic to Azure subnet must flow through virtual appliance. How?**
1. ExpressRoute
2. Route table w forced tunneling
   
**What offers redundant pair of cross connections?** ExpressRoute (acc. to Udemy)   
   
**VPN Gateways**
-  - only VpnGw1+ support active-active gateways
- Cannot have address in same address space as on prem
- Use /27 CIDR

**Can you create a vnet peering between Classic and Resource Manager vnets?** - Yes

**Can you create a vnet peering between Classic and Classic?** - No

# Scenario: Company has deployed apps to Azure VMs. Certificates for point-to-site VPN have been created by on-premise CA. How to set up P2S on each laptop?

- https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-certificates-point-to-site
- https://docs.microsoft.com/en-us/azure/vpn-gateway/point-to-site-how-to-vpn-client-install-azure-cert
- https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal#installclientcert

**What goes in the Personal certificate store on each laptop?** - User certificate that has the private key
- \Current Users\Personal\Certificates

**What goes in the Computer Personal store on each laptop?** - User certificate that has the private key
- https://stackoverflow.com/questions/5671772/why-is-there-a-computer-personal-certificates-store-and-also-current-user-per
- \Computer\Personal\Certificates

**What goes in the Azure VPN Gateway?** - the root CA certificate that has the public key

</details>   

<details>
   <summary>Container-based</summary>

**Modernize legacy ASP/etc app that is frail - simplest way?** - Use ACR
</details>   

<details>
   <summary>Misc </summary>
   
**Large-scale parallel... high performance computing... HPC... intrinsically parallel... ** - Azure Batch Jobs   

**Region-specific services - must create in each region**
- Key Vault
- Load Balancer
- Application Gateway
- VM Scale Sets

**ITSM?** - yes. Using the ITSM Connector with:
- ServiceNow
- System Center Service Manager
- Provance
- Cherwell

With ITSMC, you can:
- Create work items in ITSM tool, based on your Azure alerts (metric alerts, Activity Log alerts and Log Analytics alerts)
- Optionally, you can sync your incident and change request data from your ITSM tool to an Azure Log Analytics workspace.

**Wire Data has been replaced by Service Map**
</details>   
