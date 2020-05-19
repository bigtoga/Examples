[Home page](https://azure.microsoft.com/en-us/services/database-migration/)

To do the final migration:
1. Azure DMS tool takes the database offline
2. DMS Takes a backup
3. DMS 

To enroll a new database into Azure DMS:
1. Create a DMS Project in Azure Portal
   - Give it a name
   - Select source type (SQL Server)
   - Select target type (SQL VM, DBMI, or Azure SQL Database)
   - Select type of migration
      - Offline
      - **Online**
2. Provide the source and target info + credentials
   - Always encrypt connections
3. Define the share where the source SQL backups will be made to
1. Create/use an Azure Storage Account that DMS will copy the files into
   - Note: the target system does NOT have to have access to the files; DMS abstracts that
   - Must be an Azure Storage account
1. 
   
# Pricing depends on Online vs. Offline
Azure Database Migration Service (DMS) is a fully managed service that is designed for both operational database and data warehouse migrations
* Standard pricing tier supports offline (also called “one-time”) migrations. The Standard pricing tier, which offers 1-, 2-, and 4-vCore 
options, is generally available and free to customers
* Premium pricing tier supports offline and online migrations (also called "continuous migration") for business critical workloads that
require minimal downtime. The Premium pricing tier is generally available
* **Premium is free for six months** 
   - *DMS Premium 4-vCore is free for 6 months (183 days) from the DMS service creation date before incurring any charges*

# DMS Limitations
* 4 vCores max
* Customers can create 2 DMS services per subscription. To create additional services, please create a support ticket.
