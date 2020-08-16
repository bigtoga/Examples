# Resources 
- [Links to various scenario solutions](https://reddit.com/r/AZURE/comments/c1qpif/az300_prep_guide/)
- [github repo of resources](https://github.com/Piotr1215/az-300-prep-kit)
- [Study guide w links for scenarios](https://vaibhavgujral.com/2020/01/19/az-300-study-guide-microsoft-azure-architect-technologies/)
- [Detailed breakdown of the tasks you need to know](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE3VzwB)
- [Learning Paths for the exam](https://docs.microsoft.com/en-us/learn/certifications/exams/az-300)
- [AZ-300 labs](https://github.com/MicrosoftLearning/AZ-300-MicrosoftAzureArchitectTechnologies)


<details> <summary>CosmosDB</summary>


**How to add / remove items to the Cosmos DB**
- Know how this works in relation to the partition key

**How to query (read)**

**How does the partition key work when adding & reading data? Try different scenarios**

**How does it work with unique keys**

  </details> 
  
  
  <details> <summary>Virtual Machines</summary>  

**How to take backups on Linux VMs**

**How to move VM to new resource group**

**How to move VM to new resource group in different location**

**How to move VM to new vnet**
1. Delete the vm
2. Create a new vm
- you cannot attach a NIC from one resource group to a vm in a different rg 

**Can parts of a vm exist in different regions?**

**How to move a VM to another subscription?**
  
</details>

<details> <summary>Virtual Networks</summary>

**How to set up peering between two vnets in two different subscriptions?
- Set up two virtual network gateways

**If you love an unassigned public IP from one region to another with a different location, does the IP change?**

**When to use MPLS?**

**Steps to set up ExpressRoute**

</details>

<details> <summary>Load balancers, App Gateways</summary>

# Load balancers
**Skus for load balancer - differences**

# Public IPs
**Skus for public IP addresses - differences**

# App Gateways
**Skus for application gateways - differences**

**Auto scale limits - Standard**

</details>


<details> <summary>App Service Plans</summary>

**Skus and differences**

**Auto scale requirements and limits**

**Move web job to new resource group in new location - does location of web job change? Location of app service plan change?**


</details> 
  
<details> <summary>Identity and AAD</summary>

**How to require MFA for Azure Portal?**
1. Conditional Access
1. Select users
1. Select Cloud Apps
1. Select Grant

**How to have a web app use Azure AD for MFA authentication?**
1. Upgrade to Azure AD Premium
1. Set up new conditional access policy

</details> 