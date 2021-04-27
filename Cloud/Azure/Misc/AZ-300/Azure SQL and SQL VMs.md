Always On on VMs - use floating IP/direct return

**You are developing an app that references data which is shared across multiple Azure SQL databases. The app must guarantee transactional consistency for changes across several different sharing key values. You need to manage the transactions. What should you implement?**
- Elastic database transactions with horizontal partitioning
- https://docs.microsoft.com/mt-mt/azure/sql-database/sql-database-elastic-transactions-overview?view=azurermps-6.13.0
    - "Elastic database transactions for Azure SQL Database allow you to run transactions that span several databases in SQL Database."
    - Sharding - Consider cases where you need to guarantee transactional consistency for changes across several different sharding key values.
