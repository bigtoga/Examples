# DTUs 

DTU model provides fixed combinations of compute, storage, and IO resources

DTU stands for Database Transaction Unit and is a combined measure of compute, storage, and IO resources. **Think of the DTU model as a simple, preconfigured purchase option.**

Because your logical server can hold more than one database, there's also the idea of eDTUs, or **elastic Database Transaction Units**. This option enables you to choose one price, but allow each database in the pool to consume fewer or greater resources depending on current load.

# vCores

vCore model enables you to configure resources independently. For example, with the vCore model you can increase storage capacity but keep the existing amount of compute and IO throughput.

# Elastic pools
When you create your Azure SQL database, you can create a SQL elastic pool.

**SQL elastic pools relate to eDTUs**. They enable you to buy a set of compute and storage resources that are shared among all the databases in the pool. Each database can use the resources they need, within the limits you set, depending on current load.

