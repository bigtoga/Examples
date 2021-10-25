Documentation: https://docs.microsoft.com/en-us/azure/firewall/premium-certificates?WT.mc_id=Portal-Microsoft_Azure_HybridNetworking

## Traffic Flow

1. Client issues a request that goes across the firewall (something like https://mysite/myendpoint)
2. Azure Firewall intercepts the request, decrypts it, inspects it, blocks it if IDS is enabled and it is "known bad"
3. Azure Firewall re-encrypts the traffic and forwards to the web server/load balancer/pod/etc
4. Web server/load balancer/pod validates the request against its own private key, then begins working the request
5. Web server/load balancer/pod sends response back to Azure Firewall
6. Azure Firewall then decrypts the response, inspects it, blocks it if IDS is enabled and it is "known bad"
7. Azure Firewall re-encrypts the traffic and sends it back to the original caller

1. Requires an intermediate CA certificate deployed to Azure Key Vault
   - This is basically a "lookup table" that allows the user/caller/browser/client to verify that the signature of the server certificate has not been revoked
   - Four types of certs:
       - Public key certificate - published by load balancer, app gateway, etc
       - Private key certificate - private storage on load balancer, app gateway, application, server, etc
       - Intermediate CA certificate
       - Root CA certificate - top-most certificate of the tree

## Requirements for the Intermediate CA Certificate

Ensure your CA certificate complies with the following requirements:
- When deployed as a Key Vault secret, **you must use Password-less PFX** (Pkcs12) with a certificate and a private key
- It must be a single certificate, and shouldn’t include the entire chain of certificates
- It must be an RSA private key with minimal size of 4096 bytes
- It must have the KeyUsage extension marked as Critical with the KeyCertSign flag (RFC 5280; 4.2.1.3 Key Usage)
- It must have the BasicContraints extension marked as Critical (RFC 5280; 4.2.1.9 Basic Constraints)
- The CA flag must be set to TRUE

## Integrating with Azure Key Vault

You can do this with a managed identity for the Azure Firewall
