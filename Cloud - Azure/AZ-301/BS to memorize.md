<details>
   <summary>Virtual Machines</summary>
   
**Accelerated networking - what is it?** - reduces latency, jitter, and CPU utilization

**How to collect Windows Security logs and store for x years?** - Azure Log Analytics Agent but also Diagnostics Agent
   
**How to collect Windows Performance counters?** - Azure Log Analytics Agent

**Have a registered .NET app installed on VM and want it to authenticate to Azure resources using VM Managed Service identity - how?**
- Have it use the *Azure Instance Metadata Service Identity* to generate the request token

**Low priority nodes**
- Become unavailable if Azure does not have enough capacity

**What VM types are not supported/allowed by Azure Batch Jobs?**
- A series
- Burstable

</details>   


<details>
   <summary>Load Balancer, Traffic Manager, App Gateway </summary>

**Region failure - protect web app cheapest way?** - Traffic Manager
   
</details>   

<details>
   <summary>Backups, Azure Site Recovery </summary>
   
**Fastest RTO for a VM?** - ARS

**RPO for ASR?** 
- VMs - 1 day
- Database backups: 15 minutes

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
   
**Synapse - "petabytes of data and complex queries"**

# Cosmos DB
- 99.99% SLA
- Crazy fast read/write even worldwide (<10ms read, <15ms write for worldwide)

## Azure SQL
**Company has SQL licenses already - should they migrate to a fixed-size DTU or vCore Azure SQL database?** - vCore   
   
**MSFT recommended way to migrate database to Azure?** - old way was BACPAC uploaded to Azure BLOB storage   

**Want long term retention of Azure SQL Database backups?** 
- https://docs.microsoft.com/en-us/azure/azure-sql/database/long-term-retention-overview
- Full backups taken automatically
- Long Term Retention copies these to different blobs for long term storage
- LTR policy has 4 settings:
      - Weekly backup retention (W) - one backup every week will be copied to the long-term storage
      - Monthly backup retention (M) - first backup of each month will be copied to the long-term storage
      - Yearly backup retention (Y) - one backup during the week specified by WeekOfYear will be copied to the long-term storage
      - Week of year (WeekOfYear) - only used w Y

</details>   

<details>
   <summary>Identity, Azure AD </summary>
   
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

**Want to monitor on-prem VMs in Azure - how?** - Install Microsoft Monitoring Agent

**Max retention you can set for raw data points?** - 730 days

**How to monitor traffic to VM from outside?** - Traffic Analytics

**Want report showing all "write" activity - how?** - Activity Log

**Give ability to view resource usage and performance data only?** - Log Analytics

**Give ability to visualize relationships between application components** - App Insights

</details>   

<details>
   <summary>Storage</summary>
   
**Table storage - SLA?** - 99.99%

**Table storage - speed?** - Fast.

**How to rehydrate archive tier BLOB data?**
- Change tier to hot or cool
- May take 15 hours for large blobs; lots of small blobs may take longer

**Want to use SMB file share on Windows 2016 - what performance tier?** - Standard only; Premium only allows BLOBs

</details>   

<details>
   <summary>Networking</summary>
   
**VPN Gateways - only VpnGw1+ support active-active gateways**

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
   
</details>   
