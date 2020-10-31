Exam topics:
- 3.3 Manage security alerts
    - Create and customize alerts
    - [Review and respond to alerts and recommendations](https://docs.microsoft.com/en-us/azure/security-center/security-center-managing-and-responding-alerts)
    - [Configure a playbook for a security event by using Azure Sentinel](https://docs.microsoft.com/en-us/azure/security-center/workflow-automation#how-to-create-a-security-playbook-from-security-center)
    - [Investigate escalated security incidents](https://docs.microsoft.com/en-us/azure/security-center/workflow-automation#how-to-create-a-security-playbook-from-security-center)
  - Tutorials 
      - [Incident Mgmt](https://docs.microsoft.com/en-us/azure/security-center/tutorial-security-incident)
      - [Playbooks for automated mitigations](https://docs.microsoft.com/en-us/azure/sentinel/tutorial-respond-threats-playbook)
  
# Permissions 

**What permissions to set up Sentinel?**
- Contributor at subscription level

**Custom permissions specific to Sentinel?**
- View incidents and workbooks - *Azure Sentinel Reader*
- Create and edit workbooks - *Azure Sentinel Contributor*
- Manage incidents - *Azure Sentinel Responder*

**What permissions to use at the resource group level?**
- Contributor or Reader to the resource group

# Create and customize alerts

**What is required to create a custom alert rule in Sentinel?**
- Create a Log Analytics workspace
- Enable Sentinel

# How to 

- **How to automate mitigation of incidents using least administrative effort?**
    - Use a playbook (https://docs.microsoft.com/en-us/azure/sentinel/tutorial-respond-threats-playbook)

