<details>
   <summary>Virtual Machines</summary>

**How to collect Windows Security logs and store for x years?** - Azure Log Analytics Agent
   
**How to collect Windows Performance counters?** - Azure Log Analytics Agent

**Have a registered .NET app installed on VM and want it to authenticate to Azure resources using VM Managed Service identity - how?**
- Have it use the *Azure Instance Metadata Service Identity* to generate the request token

**Low priority nodes**
- Become unavailable if Azure does not have enough capacity

**Azure Batch Jobs support all VMs except A series**

</details>   


<details>
   <summary>Load Balancer, Traffic Manager, App Gateway </summary>

**Region failure - protect web app cheapest way?** - Traffic Manager
   
</details>   

<details>
   <summary>Backups, Azure Site Recovery </summary>

**Want long term retention of backups - how?** - Set `Long term retention` in Azure Backup

**Diff. b/w Azure Backup and Azure Site Recovery?** 
- ASR use cases:
   - Business continuity and disaster recovery
   - Want to replicate VM configuration and data to Azure or to another datacenter
- Azure Backup - more granular

</details>   

<details>
   <summary>SQL </summary>
   
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

**P2 customer - Want to get alerts whenever roles are activated + provide JIT access** - PIM

**P2 customer - ability to conduct access reviews** - PIM

**MFA for risky sign ins?** - P2 (PIM)

**Time bound access?** - P2 (PIM)

**Which SKUs support JIT?** - P1 and P2

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
   <summary> Logging, Monitoring, Analytics </summary>

**Max retention you can set for raw data points?** - 730 days

**How to monitor traffic to VM from outside?** - Traffic Analytics

</details>   

<details>
   <summary>Storage</summary>

**How to rehydrate archive tier BLOB data?**
- Change tier to hot or cool
- May take 15 hours for large blobs; lots of small blobs may take longer

</details>   

<details>
   <summary> </summary>
   
</details>   

<details>
   <summary> </summary>
   
</details>   

<details>
   <summary> </summary>
   
</details>   
