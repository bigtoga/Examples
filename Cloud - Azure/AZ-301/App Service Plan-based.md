
# App Service Plans
**Do I need a storage for my website code?** - no; they come with storage [docs](https://docs.microsoft.com/en-us/azure/app-service/overview-hosting-plans)


# Azure Batch Jobs
- Require public endpoints
- Number of nodes and VM size set using user-defined constants
- Supports dedicated nodes and **low priority nodes**
- Support all VMs **except A series**
- During the job execution:
    - All VMs can talk to each other
 - HPC (high performance computing)
 - Large scale parallel **if you enable Parallel task execution**
 - Two ways to authenticate:
    - Integrated Authentication - authenticates the user running the job
    - Managed Service Principal - an unattended app
