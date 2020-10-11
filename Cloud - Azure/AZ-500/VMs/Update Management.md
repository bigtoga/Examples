# Update Management Solutions

https://docs.microsoft.com/en-us/azure/automation/update-management/update-mgmt-overview

https://docs.microsoft.com/en-us/azure/automation/update-management/update-mgmt-manage-updates-for-vm

- Can be used to natively deploy to machines in multiple subscriptions in the same tenant
- AKS - not supported

### Operating Systems supported

Windows:
- Targeted to the OS - Windows Update Mgmt solutions cannot patch Linux but can patch Win 2008+
- Windows 7, 8, 10 are **not** supported
- Windows Nano not supported

Linux
- Targeted to Linux, meaning you only need 1 Linux Update Mgmt Solution and that can handle Red Hat, CentOS, Ubuntu
- Linux agents require access to an update repository (either private or public)
- Must support TLS 1.1 or TLS 1.2 
- Must have Python 2.x installed
- Only supported in certain regions
- CentOS also requires `yum` 

**Azure Automation Update Management** can do Azure VMs and on-prem VMs

Multiple options:
- Automation account
- Set up Update Management in the Azure portal
- Enable using a runbook
- From the VM blade in the portal
- Manually for non-Azure machines, including machines or servers registered with Azure Arc enabled servers

Behind the scenes, Machines that are managed by Update Management use the following configurations to perform assessment and to update deployments:
- Log Analytics agent for Windows or Linux
- PowerShell Desired State Configuration (DSC) for Linux
- Automation Hybrid Runbook Worker
- Microsoft Update or Windows Server Update Services (WSUS) for Windows machines

![x](https://docs.microsoft.com/en-us/azure/automation/update-management/media/update-mgmt-overview/update-mgmt-updateworkflow.png)
