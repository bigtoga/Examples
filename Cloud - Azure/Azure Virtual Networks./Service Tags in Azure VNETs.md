https://docs.microsoft.com/en-us/azure/virtual-network/service-tags-overview

>> A service tag represents a group of IP address prefixes from a given Azure service. Microsoft manages the address prefixes encompassed by the service tag and automatically updates the service tag as addresses change, minimizing the complexity of frequent updates to network security rules.

>> You can use service tags to define network access controls on network security groups or Azure Firewall. Use service tags in place of specific IP addresses when you create security rules. By specifying the service tag name (for example, ApiManagement) in the appropriate source or destination field of a rule, you can allow or deny the traffic for the corresponding service.
