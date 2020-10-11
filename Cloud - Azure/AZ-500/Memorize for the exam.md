- Tagging is not an "administrative action" thus it will not trigger alerts
- Azure Firewall requires that you create a new subnet first named `AzureFirewallSubnet`

<details>
  <summary> Transfering subscriptions, tenants </summary>
  
- Transfer subscription to new tenant = Owner

**How to transfer billing ownership?** - Azure portal

</details>
  
<details>
  <summary> VMs </summary>
  
# VMs 

- Disks for VMs are under `Microsoft.Compute/disks`

### Disk encryption 

- Azure Key Vault is regional 

**Disk encryption requirements?** - Cannot use A-series VMs

**How to enable disk encryption?**
1. Create an Azure Key Vault
2. Configure an Azure Key Vault access policy
3. Run `Set-AzVMDiskEncryptionExtension`
- https://docs.microsoft.com/en-us/azure/security/fundamentals/azure-disk-encryption-vms-vmss
- https://docs.microsoft.com/en-us/azure/virtual-machines/linux/disk-encryption-overview



**ARM Template settings for Log Analytics deployment w VM?**
- settings: workspaceId
- protectedSettings: workspaceKey
- https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/oms-windows

</details>

<details>
  <summary> Policies </summary>
  
# Policies

**Anti-malware reference?** 
- Microsoft.Compute/virtualMachines/extensions/type/**IaaSAntiMalware**
- Microsoft.Compute/virtualMachines/extensions/publisher/**Microsoft.Azure.Security**

**Resource groups?**
- Microsoft.Resources/subscriptions/resourceGroups

</details>

<details>
  <summary> Identity Management  </summary>
  
# Identity Management

**Have 1 dynamic group for all users and devices. What is best practice?** - 2 new groups, 1 for users and 1 for devices

## Conditional Access Policies

**Require MFA for Azure portal?** - Tenant -> Security -> Conditional Access -> New Policy -> Cloud Apps -> Select users -> Grant -> Require MFA

## MFA

**How to enable / change MFA?** - In portal, search for Multi-Factor Authentication

**How to block/unblock users?** - In portal, search for Multi-Factor Authentication -> Block/Unblock users

**How to enable / set up fraud, fraud blocked sign-ins?** - Multi-Factor Authentication -> Fraud Alert

**Set up custom caller ID? Change # of PIN attempts?** - Multi-Factor Authentication -> Phone call settings

**One time bypass?** - Multi-Factor Authentication -> One-time bypass

**Caching?** - Multi-Factor Authentication -> Caching

**Activity report?** - Multi-Factor Authentication -> Activity Report

Lab 4 - https://github.com/MicrosoftLearning/AZ500-AzureSecurityTechnologies/blob/master/Instructions/Labs/LAB_04_MFAConditionalAccessandAADIdentityProtection.md

1. Assign P2 license to the user
2. In portal, go to Tenant -> Security -> and click on **Additional cloud-based MFA settings**
3. Configure it, then click Save
4. Go to Users blade -> Click on **Multi-factor Authentication** at the top
5. Configure

## How to set up Trusted IPs?
Option 1: 
1. In portal, search for trusted IPs
1. Click on Azure Named Locations

Option 2: 
1. In portal, go to Tenant -> Users -> Click on **Multi-factor Authentication** at the top
5. Click on **service settings**

## Priviliged Identity Management

**Requirements?**
- P2
- Global administrator

**Grant someone privileged role use for a period**
1. Portal -search for Privileged...
2. Manage -> AD Roles -> Roles and assign

**Prevent permanent eligible assignment**
1. Portal -search for Privileged...
2. Manage -> AD Roles -> Roles and assign
3. Click on the role you want
4. Click on **Settings** and make changes to "Allow permanent eligible assignment"

**Change maximum length of assignment (i.e. time)?**
1. Portal -search for Privileged...
2. Manage -> AD Roles -> Roles and assign
3. Click on the role you want
4. Click on **Settings** and make changes to "Allow permanent eligible assignment" and "Allow permanent active assignment"

## Dynamic Groups

- Queries are not case sensitive
- Can use * as wildcard: "\*on" matches on anything that ends in "on" 

</details>

<details>
  <summary> Just in Time </summary>

- Just in time requires "Standard" version of Security Center, not default of Basic  

**ARM templates for RBAC?**
- Microsoft.Security/locations/jitNetworkAccessPolicies/initiate/action
- Microsoft.Compute/virtualMachines/read

</details>

<details>
  <summary>  </summary>
  
</details>

