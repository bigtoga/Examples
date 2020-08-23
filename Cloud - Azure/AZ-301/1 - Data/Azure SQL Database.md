# Server-Level Firewall rules - Azure SQL Database and Synapse (not DBMI)

https://docs.microsoft.com/en-us/azure/azure-sql/database/firewall-configure

- Up to 128 rules
- If you have **Allow Azure Services and resources to access this server** enabled, that counts as 1 rule
- Must connect to **master** database as that's where these are stored


# Database-Level Firewall Rules

- Require Server-Level rules to be set up first
- Execute  `sp_set_database_firewall_rule`

# Microsoft best practices
- "We recommend that you use database-level IP firewall rules whenever possible"
- "Use server-level IP firewall rules for administrators, ... [or] when you have many databases that have the same access requirements, and you don't want to configure each database individually."
