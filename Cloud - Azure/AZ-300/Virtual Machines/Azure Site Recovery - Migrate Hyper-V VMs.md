https://docs.microsoft.com/en-us/azure/site-recovery/hyper-v-azure-tutorial

# Azure steps
1. Create a new Recovery Services Vault
1. Go to the new vault, then **Site Recovery** -> **Prepare Infrastructure**
1. Set up your **Protection Goal** 
    - Machines are on-prem
    - Want to replicate to Azure
    - Save
1. Set up a **Hyper-V Site**
1. Download the installer for the **Microsoft Azure Site Recovery Provider**
1. Download the vault registration key. You need this key to install the Provider.

# On-prem steps
1. Install the provider on the Hyper-V server
1. Run the tool - > Prepare Infrastructure -> Target then select the resource group and the Resource Manager deployment model
1. Set up a **replication policy** -> Prepare infrastructure > Replication Settings > +Create and associate
      - Copy frequency - default is **5 minutes**
      - Recovery point retention - default of 2 hours; max of 24 hours
      - App-consistent snapshot frequency - will create every 1 hr
      - Initial replication start time
1. Enable replication    
