Documentation: 
- https://docs.microsoft.com/en-us/azure/firewall/premium-certificates?WT.mc_id=Portal-Microsoft_Azure_HybridNetworking
- [Using Enterprise CA Certificates w Azure Firewall](https://docs.microsoft.com/en-us/azure/firewall/premium-deploy-certificates-enterprise-ca)
- [Great Youtube video from MSFT that talks about TLS inspection w AzFW](https://www.youtube.com/watch?v=A-hWyZZsFVY)
- [John Savill video - TLS inspection starts at about 1hr 00 min](https://www.youtube.com/watch?v=JiUerkqyW0g)
- [Azure Firewall sample rules, workbooks, etc](https://github.com/Azure/Azure-Network-Security/tree/master/Azure%20Firewall)
- [How to create an intermediate CA certification in Azure Key Vault](https://docs.microsoft.com/en-us/azure/firewall/premium-certificates#azure-key-vault)

# TLS Inspection in Azure Firewall Premium

When should you use/enable this? 
- You have a key / PKI server already in your network (i.e. you are your own Root Certicate Authority (CA)). You have deployed the public key certificates to all of your VMs. Now you deploy the Intermediate CA private key to Azure Key Vault, then grant a managed identity for Azure Firewall the ability to view/use that certificate. Now you only allow traffic that uses these keys (inter-network traffic only)
- If you want the same capability but don't want to manage a key server, then you can have Azure Firewall automatically provision a new key vault + new certificates. However, once you do that, all traffic that is included in your Application Rules will stop until you also deploy the public key to each VM

**Note**: This is **not** for inspecting customer-facing website requests - use App Gateway WAF for that. This is for two types of flow:
- East/west traffic (inter-vnet)
- Outbound to internet

You can see this easily [in the documentation](https://docs.microsoft.com/en-us/azure/firewall/premium-certificates): "Azure Firewall Premium can intercept **outbound** HTTP/S traffic and auto-generate a server certificate for www.website.com."

### Inter-network traffic without TLS inspection

- Encrypted traffic flows remain encrypted throughout the network
- Destination server name is still visible to Azure Firewall via SNI extension
- Application Rules only able to filter traffic based on FQDN (Az FW can only see hostname; it cannot see the full URL)
- Encrypted headers and body will not be inspected by IDS/IPS (IDPS)

### Inter-network traffic with TLS inspection
- Encrypted traffic is decrypted by AzFW then re-encrypted for downstream transmissions
- Application Rules can now inspect full destination URL (to do URL traffic filtering)
- IDPS can match body, headers against signatures of "known bad"

## Traffic Flow

1. vnet client issues a request that goes across Azure Firewall (something like https://mysite/myendpoint)
2. Azure Firewall decrypts the request and inspects/processes if enabled. Blocks if "known bad"
3. Azure Firewall sends the request to the backend node (web server)
4. Web server/load balancer/pod validates the request against its own private key, then begins working the request
5. Web server/load balancer/pod sends response back to Azure Firewall
6. Azure Firewall then decrypts the response, inspects it, blocks it if IDS is enabled and it is "known bad"
7. Azure Firewall re-encrypts the traffic and sends it back to the original caller

## How Azure Firewall re-encrypts the traffic

When you enable TLS Inspection, you provide Azure Firewall with an **Intermediate CA Certificate** *for each URL/domain that you want it to be able to inspect*. 

## Requirements for the Intermediate CA Certificate

Requires an intermediate CA certificate deployed to Azure Key Vault
   - This is basically a "lookup table" that allows the user/caller/browser/client to verify that the signature of the server certificate has not been revoked
   - Four types of certs:
       - Public key certificate - published by load balancer, app gateway, etc
       - Private key certificate - private storage on load balancer, app gateway, application, server, etc
       - Intermediate CA certificate
       - Root CA certificate - top-most certificate of the tree

Ensure your CA certificate complies with the following requirements:
- When deployed as a Key Vault secret, **you must use Password-less PFX** (Pkcs12) with a certificate and a private key
- It must be a single certificate, and shouldn’t include the entire chain of certificates
- It must be an RSA private key with minimal size of 4096 bytes
- It must have the KeyUsage extension marked as Critical with the KeyCertSign flag (RFC 5280; 4.2.1.3 Key Usage)
- It must have the BasicContraints extension marked as Critical (RFC 5280; 4.2.1.9 Basic Constraints)
- The CA flag must be set to TRUE

 - Missing KeyUsage mandatory values KeyCertSign
 - Missing BasicConstraint mandatory values CA and no path constraints

## Integrating with Azure Key Vault

You can do this with a managed identity for the Azure Firewall
