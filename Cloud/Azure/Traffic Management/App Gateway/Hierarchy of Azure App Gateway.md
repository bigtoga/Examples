Pre-App GW steps
- Provision Azure Key Vault
- Upload certificates needed 

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
