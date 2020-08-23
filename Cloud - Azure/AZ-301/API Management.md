<details>
  <summary>Basics</summary>

Each API consists of one or more **operations**. Each API can be added to one or more **products**. Developers subscribe to products - then they can call the API's operation. 

## API gateway is the endpoint that:

- Accepts API calls and routes them to your backends.
- Verifies API keys, JWT tokens, certificates, and other credentials.
- Enforces usage quotas and rate limits.
- Transforms your API on the fly without code modifications.
- Caches backend responses where set up.
- Logs call metadata for analytics purposes.

## Products 

Products are how APIs are surfaced to developers
- **Groups** are used to manage visibility to developers
- Products grant visibility7 to groups; developers can view and subscribe to Products
- Products can be **Open or Protected**. Protected products must be subscribed to before they can be used, while open products can be used without a subscription
- When a product is ready for use by developers, it can be published. Once it is published, it can be viewed (and in the case of protected products subscribed to) by developers.
- Subscription approval is configured at the product level and can either require administrator approval, or be auto-approved.

</details>  

<details>
  <summary>Pricing & SKUs</summary>
  
</details>  

<details>
  <summary>High Availability/DR/BC</summary>
  
</details>  

<details>
  <summary>Policies</summary>
  
**Want to convert XML into JSON, while also stripping headers on output - how many policies do I need?** - 2
- One to convert XML to JSON - the `xml-to-json` built in policy
- One to strip headers - the `set-header` built in policy
  
</details>  

<details>
  <summary>Networking-related</summary>
  
**How to expose to both vnet private and public internet?**
- https://docs.microsoft.com/en-us/azure/api-management/api-management-using-with-vnet
- Set virtual network to **External**
- Requires Premium and Developer SKUs

**vnet connectivity options**
- Off - default; not deployed to a vnet
- External - public internet
- Internal - internal only

**External and Internal both require dedicated subnet w no other resources except Azure API Mgmt Instances**
- Yes, those subnets can have multiple API Mgmt deployments

**Static or dynamic IPs?**
- Dynamic - [The VIP address of the API Management instance will change each time VNET is enabled or disabled](https://docs.microsoft.com/en-us/azure/api-management/api-management-using-with-vnet)
  
</details>  

<details>
  <summary>DNS</summary>
# Custom DNS
  
**Supported?** - Yes with Internal vnet deployment and Azure Private DNS or on-prem DNS
- https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances#name-resolution-that-uses-your-own-dns-server  

**Ports required?** - just 53 for DNS
  
</details>  

<details>
  <summary>Monitoring</summary>

**Outbound traffic monitor?** - Azure Monitor
</details>  

<details>
  <summary>Misc</summary>

**How to protect from DOS attack?** - enable rate throttling

**Enable OAuth2 for a web app using API Mgmt?**
https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad

1. Register the backend app in Azure AD (the API)
2. Register the front end / client in AAD (frontend that needs to consume the API)
3. In AAD, grant permissions to allow frontend to call backend
4. Configure **Developer Console** to use OAuth 2.0
5. Add the **validate-jwt policy** to validate the OAuth token on each request

**How to protect against CSRF?** - enable state
</details>  
