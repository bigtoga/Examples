# Service Endpoints
- When Service Endpoints are enabled, the PaaS resource sees traffic coming from your vNets private IP, not its public IP
- Traffic "leaves the virtual network" (b/c it uses PaaS public IP)
- Another advantage of using service endpoints is that traffic is routed to the Azure resources optimally. Even if you have UDRs on your vNet to route internet traffic back on-premises or through a firewall device, using a Service Endpoint means traffic is sent directly to the Azure Resource.
- Your private Azure resource still uses the public IP address to access the Azure PaaS service; it just routes internally through Azure network and not over public internet
- Service Endpoints cannot be used by traffic originating on-premises, through VPN or Express Route, only for traffic coming from your Azure Virtual Network. 
    - If you want to allow, your on-premises resources access you would need to whitelist their public IPs as well
    
# Private Link
- Newer than Service Endpoints
- Integrates the multi-tenant Azure PaaS resource into your virtual network
- PaaS service has a private IP in your vnet
- Traffic does not "leave the virtual network"
- when enabled, you are granting access to a specific PaaS resource in your virtual network. That means you can control egress to PaaS resources. 
    - For example, if you wanted to, you could use NSG’s to block access to all Azure SQL databases and then use Private Link to grant access only to your specific Azure SQL Server.
- Unlike Service Endpoints, Private Link allows access from resources on your on-premises network through VPN or ExpressRoute, and from peered networks. You can also connect to resources across region.
- Join your PaaS resource to your vNet and give it a private IP
- Limit your egress to only your specific PaaS services and prevent data leakage
- Support access from on-premises and peered networks
- Connect to resource across regions and even Azure AD tenants

### Approvals

Azure Private Link works on an **approval call flow model** wherein the Private Link service consumer can request a connection to the service provider for consuming the service. The service provider can then decide whether to allow the consumer to connect or not. Azure Private Link enables the service providers to manage the private endpoint connection on their resources

There are two connection approval methods that a Private Link service consumer can choose from:

Automatic: If the service consumer has RBAC permissions on the service provider resource, the consumer can choose the automatic approval method. In this case, when the request reaches the service provider resource, no action is required from the service provider and the connection is automatically approved.

Manual: On the contrary, if the service consumer doesn’t have RBAC permissions on the service provider resource, the consumer can choose the manual approval method. In this case, the connection request appears on the service resources as Pending. The service provider has to manually approve the request before connections can be established. In manual cases, service consumer can also specify a message with the request to provide more context to the service provider.

The service provider has following options to choose from for all Private Endpoint connections:

Approved

Reject

Remove

# How to decide?

Complexity vs. Configurability?
- Service Endpoints are more straightforward and easier to set up than Private Link but less configurable
- Private Link is superior in almost every other way
