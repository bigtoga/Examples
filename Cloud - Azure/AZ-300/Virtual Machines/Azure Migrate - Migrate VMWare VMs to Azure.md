https://docs.microsoft.com/en-us/azure/migrate/tutorial-prepare-vmware

**Note that this is agentless**

# Perform an assessment 

1. Azure: 
  1.1 Create an Azure Migrate project
  1.2 From the Azure Portal, download the OVA file

2. On-Premise
  - Create a new collector VM
  - vSphere -> File -> Deploy OVF Template. Apply the downloaded template to register the appliance so that you can use the Server Migration Tool and Server Assessment Tool
  - Sign in from the VM to Azure Migrate tool and register the VM (appliance)
  - Configure the collector to start the discovery

3. Create an assessment
4. Review the assessment
