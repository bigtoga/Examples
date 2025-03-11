https://kubernetes.io/docs/tutorials/kubernetes-basics/

[https://azure.microsoft.com/en-us/products/kubernetes-service](https://learn.microsoft.com/en-us/training/modules/intro-to-kubernetes/)



# Architecture

1. Cluster
   - **Control Plane** coordinates and manages the cluster
   - **Nodes** are the workers that run the applications (in Azure, these are the virtual machines deployed and managed by the cluster)
  
![basics](https://learn.microsoft.com/en-us/training/modules/intro-to-kubernetes/media/3-diagram-cluster.svg)

![edit](https://learn.microsoft.com/en-us/training/modules/intro-to-kubernetes/media/3-cluster-architecture-components.svg)

# Control Plane

Responsible for:
- API server (front end to your Kubernetes cluster's control plane)
- Backing store (persistent storage in which your Kubernetes cluster saves its completed configuration)
- Scheduler (responsible for the assignment of workloads across all nodes. The scheduler monitors the cluster for newly created containers and assigns them to nodes)
- Controller manager (Kubernetes uses controllers to track object states in the cluster)
- Cloud controller manager

# Nodes

Each node runs:
- kubelet (agent that runs on each node in the cluster and monitors work requests from the API server)
- Kube-proxy (manages internal networking for the node using iptables and IPVs)
- Container runtime (the engine that runs your container image)

# kubectl

Manage the cluster

```bash

kubectl get

kubectl describe

kubectl logs

kubectl exec
```
