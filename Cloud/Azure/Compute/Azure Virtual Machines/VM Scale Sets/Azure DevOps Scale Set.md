<details>
        <summary>Basics of How Azure DevOps Runs Pipelines</summary>

# Basics of How Azure DevOps Runs Pipelines

1. You configure a **deployment group**
2. You configure a **deployment pool**
3. You configure an **agent pool** (Settings => Organization Settings => Pipelines)
4. You configure a pipeline to target a deployment group
5. The pipeline is executed / run
6. Azure DevOps creates a backend job
7. A new "compute resource" is spun up (VM, container, scale set)
8. The job reaches out to an **agent** installed on the "compute resource"
9. The agent runs the job
10. When the job completes, the "compute resource" is destroyed     

## Build Agents
- [How to how self-hosted **build** agents](https://learn.microsoft.com/en-us/training/modules/host-build-agent/)
- *A build agent is a system that performs build tasks. Think of it as a dedicated server that runs your build process.* ([source](https://learn.microsoft.com/en-us/training/modules/host-build-agent/2-choose-a-build-agent)
- When a build is triggered, Azure Pipelines selects an available build agent from the configured **agent pool**
- When you have self-hosted agents, you install the agent on the VM and it is then added to the agent pool

## Releases


        
</details>

<details>
        <summary>Options for Running Build and Release Pipelines within Azure DevOps</summary>
# Options for Running Build and Release Pipelines within Azure DevOps

[Core documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser)

## Option 1: Use the [Microsoft Hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml)
- Free tier, Premium options
- The agent pool is called **Azure Pipelines** in the UI

## Option 2: TFS Server
- Not discussed here

## Option 3: Self-Hosted Agents
- [Windows agents docs](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops)
- This is [what the Azure DevOps dev team uses](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops#hardware-specs)
        - *...the **hosted agents code** using pipelines that utilize hosted agents*
        - *...the bulk of Azure DevOps code is built by 24 CPU VMs that each run 4 self-hosted agents*

## Option 4: Azure VM Scale Set Agents (a.k.a. Scale Set Agents)
- A type/form of self-hosted agents
- Auto-scale
- You define "minimum number of standby VMs" and "maximum number of total VMs" and ADO manages the rest

[How to configure the agent settings](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser#configure-agent-capabilities)

</details>

<details>
        <summary>Why Use Self-Hosted Azure DevOps Agents?</summary>
        
# Why Use Self-Hosted Azure DevOps Agents?

The [Microsoft Hosted Agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml) have limitations:
1. Limited hardware = limited runs + long build times (as of 2023-03, these VMs are auto-managed by Azure and are 2 CPU, 7GB of RAM)
2. Only 10GB of free space for artifacts and you cannot increase it
3. No private link or vnet integration or even VPN/ExpressRoute; these are shared VMs on a public cloud
4. Max of 10 parallel jobs / 6 hours each for free tier
5. No ability to write to a UNC file share
6. Full builds only; no incremental builds
6. Integration with a vnet / private resource is near impossible
     - There is no Service Tag for Azure DevOps which means you have to identify the IP address range 
     - You must then whitelist inbound IP if you want to deploy code 
7. [Full list of limitations](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml#capabilities-and-limitations)

### Scale Set Agents

The [documentation on VMSS agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops):
- Self-hosted agents
- Use these when you need more memory, CPU, or IO than Microsoft hosted agents allow
- You need more agents than MSFT allows

</details>


<details>
        <summary>Basics of Self-Hosted Agents</summary>
        
# Basics of Self-Hosted Agents
        
## Overview

1. Provision a "compute resource" in your private network
2. Grant it network access to your servers that you want to "deploy code to" 
3. Enroll it as an "agent" in the "agent pool" in Azure DevOps
4.         

## Networking
        
Azure DevOps self-hosted agents use a **pull** model: 
- *(To determine when/what to run,) communication is always initiated by the agent (to Azure DevOps)* ([source](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser#communication-with-tfs))
- Uses port 443 outbound from the VM
- As a result, there is no need to whitelist inbound IPs or have a public IP on the VM/scale set
        
## Setup of the Agent
1. Create your agent pool in Azure DevOps organization settings
2. Create your VM/scale set
3. Register the agent 
    - You run the auto-generated code from inside Azure DevOps
    - This installs the agent and registers this VM to the agent pool
4. Once registered, the agent starts polling to see if there are any jobs in the queue
5. Once a job is available, the agent downloads the job
        
![General networking model](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/media/agent-connections-devops.png?view=azure-devops)        
        
</details>

<details>
        <summary>Build Pipelines and Self-Hosted Agents</summary>
        
# Build Pipelines and Self-Hosted Agents

1. Create your VM 
2. Create an agent pool in Microsoft Azure DevOps.
3. Create an access token to authenticate your agent with Azure DevOps
4. Configure your VM with the software that's required 
5. Configure your agent to connect to Azure DevOps so that it can receive build jobs.
6. Verify that the agent is connected to Azure DevOps and ready to receive build jobs.
        
</details>


<details>
        <summary>Release Pipelines and Self-Hosted Agents</summary>
        
# Release Pipelines and Self-Hosted Agents

        
</details>

<details>
        <summary>VM Scale Set Agents</summary>
        
# VM Scale Set Agents

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

</details>

<details>
        <summary>Best Practices</summary>
# Best Practices

## Self-Hosted Agents

1. Run 1 agent per VM ([source](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser#install))
    - However, [other documentation says it is fine to have more than 1 per VM](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser#can-i-install-multiple-self-hosted-agents-on-the-same-machine)
    - "Can I install multiple self-hosted agents on the same machine?" Yes. This approach can work well for agents that run jobs that don't consume many shared resources. For example, you could try it for agents that run releases that mostly orchestrate deployments and don't do much work on the agent itself.
    - ([source](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser#can-i-install-multiple-self-hosted-agents-on-the-same-machine))
        
## Security
        
1. Have the identity that runs the agent be different from the identity that has permissions to connect the agent to the pool ([source](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops#permissions))
    - In other words, if your personal account is "the account with permissions to connect the agent to the pool", do not run the agent using your personal account
    - Instead, set up a dedicated account just for the agent to run under

</details>

<details>
        <summary>Questions</summary>
# Questions
        
## Builds


        
## Releases
        

</details>        

