# Disaster Recovery and High Availability

### Scenario: Goal 1: During normal operations, want at least 2 readable copies of `Sales` database. Goal 2: Ensure that `Sales` remains available if a datacenter fails. How?

**Use Business Critical tier with Availability Zone**
- Premium or Business Critical tiers both leverage the **Premium availability model**
- "Premium availability" integrates compute resources (sqlservr.exe process) and storage (locally attached SSD) on a single node
- High availability is achieved by replicating both compute and storage to additional nodes creating a three to four-node cluster
- By default, the cluster of nodes for the premium availability model is created in the same datacenter
- Azure SQL Database can place different replicas of the Business Critical database to different availability zones in the same region
- To eliminate a single point of failure, the control ring is also duplicated across multiple zones as three gateway rings (GW)
- Reference: https://docs.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla
