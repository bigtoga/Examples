2021-01-29

# Best Practices for SQL Server AlwayOn deployment in Azure IaaS

	· List of things customers may miss
			o Availability zones need to be set
			o When deciding what to do, size everything and azure migrate and collect data on their environment
					§ Helps you decide what size VMs you will need
			o Make sure to pay attention to the IO constraints of the VM size and the discs themselves
					§ A lot of VM sques to cover and it’s really important you select the right size
			o Storage - what image you will use and if you install your own image, highly recommend when you attach your storage you do storage spaces
					§ You will be able to scale more easily in the future
			o Common miss - SQL server IaaS extension. An extension you install from the portal
					§ After installation, you will be able to manage it directly from the portal
          
	· Documentation
			o What are the best practices for configuring Azure IaaS VMs for SQL Server?
	                -Review the following links for deployment planning, performance considerations, and configuration best practices.
	                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices
	                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/storage-configuration
	                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/business-continuity-high-availability-disaster-recovery-hadr-overview
	                                - https://docs.microsoft.com/en-us/archive/blogs/sqlserverstorageengine/storage-configuration-guidelines-for-sql-server-on-azure-vm
	                                - https://techcommunity.microsoft.com/t5/sql-server/optimize-oltp-performance-with-sql-server-on-azure-vm/ba-p/916794
	                                - https://docs.microsoft.com/en-us/azure/virtual-machines/linux/disk-performance-linux
	                                - https://docs.microsoft.com/en-us/azure/virtual-machines/premium-storage-performance 
	                -A couple commonly missed items from the links above.
	                                -Make sure to place VMs in an SQL Server AOAG cluster in separate Availability Sets or Zones at deployment.
	                                -Make sure that both your VM size and disk configuration meets your storage performance requirements.
	                                -Validate your storage configuration after VM deployment to ensure that the performance is as expected using a tool like Diskspd or PerfInsights.
	                                -When using a SQL Server VM image from the Portal storage is deployed and mounted to the VM using Storage Spaces, if using your own image be sure to create storage spaces and pools to enable easier scaling later if needed
                                  
	o What are the best practices for configuring SQL Server AlwaysOn Availability Groups on Azure IaaS VMs?
		                -Review the following links for deployment planning and a step-by-step tutorial.
		                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-overview
		                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/hadr-cluster-best-practices
		                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-manually-configure-prerequisites-tutorial
		                                - https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-manually-configure-tutorial
                                   
		                -Keep in mind the potential for CPU thread exhaustion with a large number of databases in an AlwaysOn Availability Group and pick your VM compute size appropriately.
		                                - https://www.sqlshack.com/max-worker-threads-for-sql-server-always-on-availability-group-databases/
 
 




