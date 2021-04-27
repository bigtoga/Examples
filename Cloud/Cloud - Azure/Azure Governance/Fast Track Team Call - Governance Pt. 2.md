2021-01-21

Agenda is here: https://aka.ms/ftalive-gov 

Azure Setup Guide is here: https://portal.azure.com/#blade/Microsoft_Azure_Resources/QuickstartPlaybookBlade/guideId/intro-azure-setup

# 5. Plan governance, security, and compliance

## Azure Security Center

https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/govern-org-compliance?tabs=AzureSecurityCenter

- By default, it is enabled only for Free tier
- Azure Defender off/on: Portal -> Security Center -> Settings -> Azure Defender plans
- Auto-provisioning
    - Log Analytics on/off - auto-enroll VMs in LAWS
    - Microsoft Dependency Agent on/off
- Secure score: "We like to see everyone have at least a 72%"
- Azure Security Recommendations - "You have to implement all of the recommendations in a group to get the expected score increase the group says. You can't remediate 1 or 2 in a group and expect partial credit"

## Questions: 
- Scott: "We want to use Azure Bastion, not Just in Time. Can we disable that banner?"
    - No. JIT access does not require public IP addresses for access to the VMs. Unfortunately, the banner will persist if JIT is not enabled. More broadly, there are plans for more seamless integration between Bastion and JIT as these are rather separate services today
 
- Scott: "Where can we see performance impact of enabling disk encryption as Azure Defender recommends?"
    - Azure disk encryption specifically will leverage BitLocker for Windows and dm-crypt for Linux, and we would reference the performance impact on those encryption deployments.

- Scott: For Azure Defender plans, can we enable Defender for "some but not all Storage accounts"?
     - No, per subscription / resource type. We know customers have problems w this and feedback is acknowledged
     
- Is there a document/spreadsheet/checklist that a company should use to ensure that they discuss/decide "on all the right things"? Appreciate the overview of the tool but I think where we are is "If there was a set of steps/questions that our internal teams should go through to align/answer/decide, we sure could use that right about now."      

# 6. Establish monitoring and reporting

# 7. Stay current with Azure
