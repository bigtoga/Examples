# cluster-master security

In AKS, the Kubernetes master components are part of the managed service provided by Microsoft. 
- Each AKS cluster has its own single-tenanted, dedicated Kubernetes master to provide the API Server, Scheduler, etc
- This master is managed and maintained by Microsoft.

**By default, the Kubernetes API server uses a public IP address and a fully qualified domain name (FQDN)**. 
- You can control access to the API server using Kubernetes RBAC and Azure Active Directory

# Node security

AKS nodes are Azure virtual machines that you manage and maintain. 
- Linux nodes run an optimized Ubuntu distribution
- Windows Server nodes run an optimized Windows Server 2019 release
- Both use Moby as the container runtime

## Nodes - Updates, Patching

When an AKS cluster is created or scaled up, the **nodes are automatically deployed with the latest OS security updates and configurations.**

**Linux nodes** - The Azure platform automatically applies OS security patches to Linux nodes on a nightly basis. If a Linux OS security update requires a host reboot, 
that reboot is not automatically performed. You can manually reboot the Linux nodes, or a common approach is to use Kured, an open-source reboot daemon for Kubernetes. 
Kured runs as a DaemonSet and monitors each node for the presence of a file indicating that a reboot is required. 
Reboots are managed across the cluster using the same cordon and drain process as a cluster upgrade.

For Windows Server nodes, Windows Update does not automatically run and apply the latest updates. On a regular schedule around the Windows Update release cycle and your own validation process, you should perform an upgrade on the Windows Server node pool(s) in your AKS cluster. This upgrade process creates nodes that run the latest Windows Server image and patches, then removes the older nodes. Nodes are deployed into a private virtual network subnet, with no public IP addresses assigned. For troubleshooting and management purposes, SSH is enabled by default. This SSH access is only available using the internal IP address.

To provide storage, the nodes use Azure Managed Disks. For most VM node sizes, these are Premium disks backed by high-performance SSDs. The data stored on managed disks is automatically encrypted at rest within the Azure platform. To improve redundancy, these disks are also securely replicated within the Azure datacenter.

Kubernetes environments, in AKS or elsewhere, currently aren't completely safe for hostile multi-tenant usage. Additional security features such as Pod Security Policies or more fine-grained role-based access controls (RBAC) for nodes make exploits more difficult. However, for true security when running hostile multi-tenant workloads, a hypervisor is the only level of security that you should trust. The security domain for Kubernetes becomes the entire cluster, not an individual node. For these types of hostile multi-tenant workloads, you should use physically isolated cluster

To protect your customer data as you run application workloads in Azure Kubernetes Service (AKS), the security of your cluster is a key consideration.
