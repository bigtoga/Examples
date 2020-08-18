Below are some of my key lessons learned from previous Azure engagements that will be critical to the success of any Azure migration
1. Define the Business Case
1. Perform a Cost Analysis/Comparison
1. Assess Cloud / Azure Readiness
1. Identify a POC, Hosting Vendor, How to Accelerate POC, Managed Services requirements
1. Executive Buying & Approval for POC
1. Execute POC, Evaluate Hosting Vendor, Consulting Services, Mgd Svcs
1. Document Lessons Learned, Define Changes Wanted, Cost Optimizations
1. Define Timeline to Migrate PROD, Business Requirements for DR, High Level Designs for DEV, UAT, PROD, DR
1. Identify , Hosting Vendor, How to Accelerate POC, Managed Services requirements for all environments
1. Define how you will migrate data, files, VMs to PROD (hardest), then DR, DEV, UAT
1. Decommission POC
1. Execute on DEV, Document Lessons Learned, Define Changes Wanted, Cost Optimizations, Decommission on-prem hardware
1. Execute on STG, Document Lessons Learned, Define Changes Wanted, Cost Optimizations, Decommission on-prem hardware
1. Execute on DR, Document Lessons Learned, Define Changes Wanted, Cost Optimizations, Decommission on-prem hardware
1. Execute on PROD, Document Lessons Learned, Define Changes Wanted, Cost Optimizations, Decommission on-prem hardware
1. Perform DR test until successful
1. Decommission any remaining on-premise hardware

# Over-arching Lessons
- Planning and building a migration strategy are key to successful migration to a cloud environment. Strategy must be jointly developed and agreed upon by business and IT teams to be fully aware of the changes
- Workload analysis and discovery is a critical process to make sure that your team understands the potential impacts of moving certain workloads in different migration waves
- It is recommended to provision a new active directory server in Azure and use the native replication capability within active directory
- Long term operational efficiency is driven by automation. Automation should drive infrastructure & service provisioning, environment and application testing, workflows, monitoring and alerting, and problem resolution
- Data insights on performance, root cause analysis, and resiliency are critical to long term infrastructure support improvements
- Perform regular inter-regional service moves as a matter of operational practice. Don’t wait for the outage to occur. Chaos testing is described in deeper detail in the appendix to this proposal
- Improved business outcomes are realized when the business and IT operations teams can agree on shared KPIs and OKRs

# Step 1: Define the Business Case
## Pre-Migration: Strategy
- Follow MSFT's Cloud Adoption Framework to (a) convince execs to provide proper resources + time, (b) the set aside time w teams to document needful (why we are doing this, what expected outcomes are)

## Pre-Migration: Security & Risk
- Have Security involved from beginning to avoid re-work, delays

## 

# Pre-Migration: Data, Files, Infrastrucutre Migration
- Identify migration options early on, whether to use Azure Import/Export (i.e., Data Box), Azure Migrate, and/or Azure Site Recovery. If Azure Data Box is required, engage Microsoft early on to minimize delays in the process
- Identify where all of the data storage location for all of the data that must be migrated. Try to centralize them to minimize the transfer time from on- premise environment to Azure Data Box
- Azure Migration should run for at least 15 – 30 days to appropriately monitor and track the current environment metadata. If the current documentation does not provide dependency mapping, it is recommended to use Azure Migrate Agent to build dependency mapping chart
- Only move the data that are necessary going forward. This is an opportunity to remove any unused data or out-of-date archives which can help reduce migration cost and decrease timeline
