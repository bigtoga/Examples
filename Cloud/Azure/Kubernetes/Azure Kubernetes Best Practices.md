# Azure Kubernetes Best Practices

Resources:
- [Microsoft's AKS BP](https://learn.microsoft.com/en-us/azure/aks/best-practices)
    - [Cluster Operator Best Practices](https://learn.microsoft.com/en-us/azure/aks/best-practices#cluster-operator-best-practices)
    - [Network Best Practices](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network)
 
# Network Best Practices

Source: https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network

1. Use Azure CNI networking in AKS for integration with existing virtual networks ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network#choose-the-appropriate-network-model))
2. Deploy behind Azure App Gateway to be able to leverage WAF ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network#secure-traffic-with-a-web-application-firewall-waf))
3. Use network policies to allow or deny traffic to pods. By default, all traffic is allowed between pods within a cluster. For improved security, define rules that limit pod communication. ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network#control-traffic-flow-with-network-policies))
    - More details: [Secure traffic between pods with network policies](https://learn.microsoft.com/en-us/azure/aks/use-network-policies)         
5. Use Azure Bastion to connect directly to nodes ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network#securely-connect-to-nodes-through-a-bastion-host))
6. Control access to management plane through NSGs ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-network#securely-connect-to-nodes-through-a-bastion-host))
7. Use 3 separate subnets for AKS as per AKS Baseline ([source](https://github.com/mspnp/aks-baseline/blob/main/network-team/topology.md))

# Multi-Tenancy & Cluster Operations

Source: https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-cluster-isolation

1. Design clusters for multi-tenancy - share the same cluster with / for multiple teams and workloads. Use namespaces to break these up
2. Separate teams and projects using logical isolation. Minimize the number of physical AKS clusters you deploy to isolate teams or applications. ([source](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-cluster-isolation#logically-isolated-clusters))



 
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
 ([source]())
