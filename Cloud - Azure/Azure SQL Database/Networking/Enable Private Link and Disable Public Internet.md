1. Create your vnet
2. Create a dedicated subnet
1. Create your managed instance and assign it to the subnet
1. Click on your managed instance and go to Virtual Network
1. Disable Public Endpoint
1. Set your minimum TLS version you want to accept
1. Set the connection type (private endpoint) to "Redirect"
  - Redirect mode enables direct connectivity to the Managed Instance resource - fastest
  - More details [on connection types](https://docs.microsoft.com/en-us/azure/azure-sql/managed-instance/connection-types-overview)
