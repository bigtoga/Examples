Search this doc for "TBD" to find questions that still need answering 

<details><summary>1. Virtual Networking</summary>

# vnet Peering
1. **When a peering status says "Disconnected", how to resolve?**
   - Delete and recreate
  
2. What does **Gateway Transit disabled/enabled do**?
   - For a VPN configured with ExpressRoute
   - https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview
   - "Gateway Transit is a peering property that enables a virtual network to utilize a VPN/ExpressRoute gateway in a peered virtual network. Gateway transit works for both cross premises and network-to-network connectivity. Traffic to the gateway (ingress or egress) in the peered virtual network incurs virtual network peering charges on the spoke VNet (or non-gateway VNet)"
   
# Default routes
1. By default, can Azure virtual machines connect to the internet?
   - TBD but I think No
   
# VPNs - Point to site
1. **What are the steps?**
   - https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal
   - 1. Create an Azure vnet
   - 2. Create an Azure vnet gateway (which includes an Azure gateway subnet)
   - 3. Get a root private/public key certificates
   - 4. Generate a client certificate (a.k.a. "export a certificate") - this is the private cert
   - 5. Configure the vnet gateway/VPN in Azure - Add the client's IP address to the vnet gateway's client address pool, set authentication to Azure certificate, upload public cert.
   - 6. On the user's laptop, install the exported client certificate
   - 7. Generate the download files in Azure -> Download VPN client (https://docs.microsoft.com/en-us/azure/vpn-gateway/point-to-site-vpn-client-configuration-azure-cert)
   - 8. Install on user's laptop
   
   
</details>

<details><summary>2. Virtual Machine related</summary>

1. **How do you move managed data disk to another VM?**
   - TBD
   
# Storage-related

1. **What type of storage is needed to store virtual disk files for Azure VMs?**
   - TBD but I think Blob storage
</details>



<details><summary>3. Managing Secrets</summary>

1. **ARM deployments - how to make sure password is not stored in plaintext in json file?**
   - Azure Key Vault
    

2. **ARM deployments - what is needed to access Azure Key Vault secret during ARM template deployment?**
   - Access Policy is used if Azure things are talking to other Azure things
   - https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-tutorial-use-key-vault?tabs=CLI
</details>


<details><summary>4. Storage </summary>

1. **What is URL of an Azure File Share?**
   - TBD but I think https://**name_of_storage_acct**.file.core.windows.net/**name_of_file_share**
</details>
