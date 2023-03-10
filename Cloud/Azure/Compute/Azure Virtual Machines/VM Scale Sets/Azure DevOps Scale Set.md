# Basics of How Azure DevOps Runs Pipelines

1. You configure a **deployment group**
2. You configure a **deployment pool**
3. You configure a pipeline to target a deployment group
4. The pipeline is executed / run
5. Azure DevOps creates a backend **job**
6. A new "compute resource" is spun up (VM, container, scale set)
7. The job reaches out to an **agent** installed on the "compute resource"
8. The agent runs the job
9. When the job completes, the "compute resource" is destroyed

# Options for Running Build and Release Pipelines within Azure DevOps

[Core documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser)

- Option 1: Use the [Microsoft Hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml)
    - Free tier, Premium options
    - The agent pool is called **Azure Pipelines** in the UI

- Option 2: TFS Server
    - Not discussed here

- Option 3: Self-Hosted Agents
    - [Windows agents docs](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops)
    - This is [what the Azure DevOps dev team uses](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops#hardware-specs)
        - *...the **hosted agents code** using pipelines that utilize hosted agents*
        - *...the bulk of Azure DevOps code is built by 24 CPU VMs that each run 4 self-hosted agents*

# Why Use Self-Hosted Azure DevOps Agents?

The [Microsoft Hosted Agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml) have limitations:
1. Limited hardware = limited runs + long build times (as of 2023-03, these VMs are auto-managed by Azure and are 2 CPU, 7GB of RAM)
2. Only 10GB of free space for artifacts and you cannot increase it
3. No private link or vnet integration or even VPN/ExpressRoute; these are shared VMs on a public cloud
4. Max of 10 parallel jobs / 6 hours each for free tier
5. No ability to write to a UNC file share
6. Integration with a vnet / private resource is near impossible
     - There is no Service Tag for Azure DevOps which means you have to identify the IP address range 
     - You must then whitelist inbound IP if you want to deploy code 
7. [Full list of limitations](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml#capabilities-and-limitations)

### Scale Set Agents

The [documentation on VMSS agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops):
- Self-hosted agents
- Use these when you need more memory, CPU, or IO than Microsoft hosted agents allow
- You need more agents than MSFT allows

# Details

The "type of agent pool" matters: 
1. It can allow you to dynamically create VMs if there are jobs in pool queue. When queue is empty all created machines are deleted. 

When you create VMSS, you can specify startup script that applies to each VM at startup. We use simple PowerShell script as we need to preinstall only simple dependencies but it could anything

# Steps to configure

### Azure:
1. Create and configure your VM
2. Deprovision and generalize the VM
3. Create a new custom VM image
4. Deploy a scale set that uses the image

### Azure DevOps:
1. Create a deployment group
2. Choose the "type of target" (Windows or Linux)
3. Windows => copy the auto-created Powershell script
