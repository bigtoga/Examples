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

# Terminology

**Workbooks** - Azure Monitor Workbooks are avialable for you to query/view metrics/details about "stuff". Not Sentinel-specific

**Playbooks** - automated response to an alert; built on Azure Logic Apps Designer. Sentinel specific. a.k.a. Security Playbooks

# Create and customize alerts

- **Cost for custom alerts?** - None; included in Basic Security Center

- **Why would you upgrade then?** - Azure Defender not included in Basic; reuired for advanced detections

- **Perms for creating custom alerts?** - possibly several layers:
    - Per https://docs.microsoft.com/en-us/azure/security-center/workflow-automation
    - Security admin role or Owner on the resource group
    - Must also have write permissions for the target resource
    - To work with Azure Logic Apps workflows, you must also have the following Logic Apps roles/permissions:
        - Logic App Operator permissions are required or Logic App read/trigger access (this role can't create or edit logic apps; only run existing ones)
        - Logic App Contributor permissions are required for Logic App creation and modification
        - If you want to use Logic App connectors, you may need additional credentials to sign in to their respective services (for example, your Outlook/Teams/Slack instances)
        
**What is required to create a custom alert rule in Sentinel?**
    - Create a Log Analytics workspace
    - Enable Sentinel


# How to 

- **How to automate mitigation of incidents using least administrative effort?**
    - Use a playbook (https://docs.microsoft.com/en-us/azure/sentinel/tutorial-respond-threats-playbook)

