2021-01-19

Agenda is here: https://aka.ms/ftalive-gov 

Azure Setup Guide is here: https://portal.azure.com/#blade/Microsoft_Azure_Resources/QuickstartPlaybookBlade/guideId/intro-azure-setup

# 1. Setup Guide Overview

Uses the [Azure setup guide](https://portal.azure.com/#blade/Microsoft_Azure_Resources/QuickstartPlaybookBlade/guideId/intro-azure-setup)

# 2. Organize Resources

https://portal.azure.com/#blade/Microsoft_Azure_Resources/QuickstartPlaybookBlade/guideId/intro-azure-setup

https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources?tabs=AzureManagementGroupsAndHierarchy 

## Resource Groups 

What belongs in a resource group? 
- Things w same lifecycle
- Things w same lock requirements
- Things you want to control permissions to on a group basis (vs. individual resource permissions)

Why do resource groups have to define a region? 
- This is where the metadata for that region is defined

## Subscriptions

Why would I have different subsriptions?
- DEV, STG, PROD, DR
- To bypass [limits of the Azure platform](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits)
- To separate billing by department/app/etc

## Management Groups

Why?
- Simplifies policies and permissions mgmt

## Naming Standards

Suggest we use the Cloud Adoption Framework's naming conventions - https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging

https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming

Scott: "Do you recommend that the Azure resource name matches the NetBIOS name of a VM?"
- Yes: "We've seen this make it easier to interact with teams managing or using the VMs but don't have access to Azure. This also helps when it comes down to costs as the the Azure VM name will be on your invoice."

Scott: "What about explicitly creating OS disk and NIC instead of letting Azure auto-create those?"
- "... it is common to start creating VMs through the Azure portal to get familiar with the platform. We will generally see a switch to automated deployments through scripts, ci/cd pipelines, ARM templates, etc. where there are more configuration options to control naming of additional resources. Then we'll see disk and NIC resources to be customized to your naming standards versus letting Azure pick the names instead."

## Tagging

How to apply same tag to multiple resources at once in the portal?
- Home -> All Resources -> Select the items you want -> Assign Tags

# 3. Managed Access

# 4. Manage Costs & Billing

# 5. Plan governance, security, and compliance

# 6. Establish monitoring and reporting

# 7. Stay current with Azure
