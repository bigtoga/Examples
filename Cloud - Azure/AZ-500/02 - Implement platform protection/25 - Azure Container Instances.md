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
- Custom sizes - faster startup times than VMs (seconds)
- Container access
    - You expose your container groups directly to the internet with a **public IP address and a fully qualified domain name (FQDN)**. When you create a container instance, you can specify a custom DNS name label so your application is reachable at customlabel.azureregion.azurecontainer.io.
    - Also supports executing a command in a running container by providing an interactive shell to help with application development and troubleshooting. Access takes places over **HTTPS**, using TLS to secure client connections
- Container deployment - Deploy containers from DockerHub or Azure Container Registry
- Hypervisor-level security - Historically, containers have offered application dependency isolation and resource governance but have not been considered sufficiently hardened for hostile multi-tenant usage. Azure Container Instances guarantees your application is as isolated in a container as it would be in a VM.
- Isolation
- Co-scheduled groups
- Persistent storage 
- -Linux and Windows 
- Virtual network deployments - can deploy into a subnet within your virtual network
- Billing - Supports per-GB, per-CPU, and per-second billing

### ACI vs. AKS
Use AKS for massive apps that need to do dynamic discovery of other services in the environment
