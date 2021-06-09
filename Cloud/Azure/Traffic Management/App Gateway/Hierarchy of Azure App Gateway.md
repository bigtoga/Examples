Pre-App GW steps
- Provision Azure Key Vault
- Upload certificates needed 
- Generate a .CER for the trusted root certificate of the backend servers if needed

Once you have your app ready to go, stand up a new App Gateway:

1. Create the vnet 
2. Create the app gateway subnet
3. Provision a public IP adddress
4. Provision the app gateway
5. Allow Azure Key Vault access

Once you have the app gateway stood up, to add a website:
1. Create a backend pool
2. Create the HTTP settings 
      - If using SSL termination, configure only HTTP
      - If you want end-to-end TLS encryption, upload a certificate and configure HTTPS    
3. Add a listener - HTTP
4. Add a listener - HTTPS
5. Add a rule to redirect HTTP to HTTPS
6. Add a rule to accept HTTPS requests and forward them to the correct listener, backend pool

=====================================

# Traffic Flow

1. Traffic Manager
2. App Gateway
3. Listener
4. Rule
5. Backend pool

=====================================

# Common Errors

**Cannot test a health probe to resolve a 502 Bad Gateway error**
- Error "Nothing to test as no HTTP Settings selected. You can still save the probe now and associate HTTP settings later."

[Documentation on troubleshooting](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-backend-health-troubleshooting)
- The default probe request is sent in the format of <protocol>://127.0.0.1:<port>/
- The protocol and destination port are inherited from the HTTP settings
- 
