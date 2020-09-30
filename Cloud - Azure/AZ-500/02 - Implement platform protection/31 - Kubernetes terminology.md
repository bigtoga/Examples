Jeff on implementing K8s: 'I think it came about because someone at Google was looking at Docker Swarm and said, "Hold my beer - I think I can do better than that"'

# Kubernetes cluster architecture

## Cluster master
When you create an AKS cluster, a cluster master is automatically created and configured. 
- managed Azure resource abstracted from the user
- no cost for the cluster master (you only pay for the *nodes* that are part of the AKS cluster)

The cluster master includes the following core Kubernetes components:
- `kube-apiserver` - The API server is how the underlying Kubernetes APIs are exposed. This component provides the interaction for management tools, such as kubectl or the Kubernetes dashboard.
- `etcd` - To maintain the state of your Kubernetes cluster and configuration, the highly available etcd is a key value store within Kubernetes.
- `kube-scheduler` - When you create or scale applications, the Scheduler determines what nodes can run the workload and starts them.
- `kube-controller-manager` - The Controller Manager oversees a number of smaller Controllers that perform actions such as replicating pods and handling node operations.

AKS provides a **single-tenant cluster master**, with a dedicated API server, Scheduler, etc. You define the number and size of the nodes, and the Azure platform configures the secure communication between the cluster master and nodes. Interaction with the cluster master occurs through Kubernetes APIs, such as `kubectl` or the Kubernetes dashboard.

This managed cluster master means that you do not need to configure components like a highly available store, but it also means that you cannot access the cluster master directly. **Upgrades to Kubernetes are orchestrated through the Azure CLI or Azure portal, which upgrades the cluster master and then the nodes**. To troubleshoot possible issues, you can review the cluster master logs through Azure Log Analytics.

If you need to configure the cluster master in a particular way or need direct access to them, you can deploy your own Kubernetes cluster using `aks-engine`.

## Nodes and node pools
To run your applications and supporting services, you need a Kubernetes node. **An AKS cluster has one or more nodes, which is an Azure virtual machine (VM) that runs the Kubernetes node components and container runtime**
- The `kubelet` is the Kubernetes agent that processes the orchestration requests from the control plane and scheduling of running the requested containers.
- Virtual networking is handled by the `kube-proxy` on each node. The proxy routes network traffic and manages IP addressing for services and pods.
`- The `container runtime` is the component that allows containerized applications to run and interact with additional resources such as the virtual network and storage. In AKS, Moby is used as the container runtime`.
