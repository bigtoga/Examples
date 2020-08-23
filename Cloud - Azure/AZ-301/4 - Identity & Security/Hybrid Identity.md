# Can you use ADFS to authenticate on-prem users?
Yes

https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-hybrid-identity

https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn

MSFT calls this **Hybrid Identity** - you can have users authenticate using on-prem credentials using one of 3 authentication methods for SSO:
- Password Hash 
- Pass-through
- ADFS / Federation
    - Requires password hash synch
    - Requires on-premise ADFS Server

![x](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/media/choose-ad-authn/azure-ad-authn-image1.png)
