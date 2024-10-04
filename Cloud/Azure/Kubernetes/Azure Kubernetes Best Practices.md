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
5. Use Azure Bastion to connect directly to nodes ([source]())



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
 ([source]())
