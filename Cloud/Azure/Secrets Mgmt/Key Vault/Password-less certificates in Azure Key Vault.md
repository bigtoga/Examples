This is the default. When you create a new private/public certificate, it is password-less. You can later download, provide a password, then replace but by default the UI and Powershell create 
certificates without a password.

## Azure Premium Firewall

Azure Firewall requires password-less PFX (Pfx12) certificates [as of Oct 2021](https://docs.microsoft.com/en-us/azure/firewall/premium-certificates?WT.mc_id=Portal-Microsoft_Azure_HybridNetworking)

>> Ensure your CA certificate complies with the following requirements: When deployed as a Key Vault secret, you must use Password-less PFX (Pkcs12) with a certificate and a private key.

>> Alternatively, you can also use a key vault secret that's stored as a password-less, base-64 encoded PFX file. A PFX file is a digital certificate containing both private key and public key.

