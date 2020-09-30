# Containers 
- Docker required for Windows

|  Feature 	|  Description 	|
|---	|---	|
| Isolation  	| Typically provides lightweight isolation from the host and other containers, but doesn't provide as strong a security boundary as a VM. (You can increase the security by using Hyper-V isolation mode to isolate each container in a lightweight VM) |
| OS 	| Runs the user mode portion of an operating system, and can be tailored to contain just the needed services for your app, using fewer system resources.|
| Deployment  	|  Deploy individual containers by using Docker via command line; deploy multiple containers by using an orchestrator such as Azure Kubernetes Service. 	|
| Persistent Storage  	| Use Azure Disks for local storage for a single node, or Azure Files (SMB shares) for storage shared by multiple nodes or servers.	|
| Fault tolerance   	| If a cluster node fails, any containers running on it are rapidly recreated by the orchestrator on another cluster node. |
| Networking  	| Uses an isolated view of a virtual network adapter, providing a little less virtualization–the host's firewall is shared with containers–while using less resources.|

# ACI

Azure Container Instances (ACI), is a PaaS service for scenarios that can operate in isolated containers, including simple applications, task automation, and build jobs
  - For scenarios where you need full container orchestration, including service discovery across multiple containers, automatic scaling, and coordinated application upgrades, we recommend Azure Kubernetes Service.

- PaaS 
- Custom sizes - fast startup times
- Public IP and DNS 
- Hypervisor-level security
- Isolation
- Co-scheduled groups
- Persistent storage 
- -Linux and Windows 
- Virtual network deployments

### ACI vs. AKS
Use AKS for massive apps that need to do dynamic discovery of other services in the environment
