# Seamless SSO
PTA is basically asking Azure AD to offload password verification from the cloud to your local active directory, you get to use extra features not available on Azure by doing that such as **password expiry**: https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta#what-is-azure-active-directory-pass-through-authentication

**Seamless SSO** is basically a allowing your users to perform auto login to compatible application while they are inside the corp network, **authentication is using Kerberos**, that’s why your users need a line of sight to your domain controllers: https://docs.microsoft.com/en-us/azure/active-directory/hybrid/tshoot-connect-sso#troubleshooting-checklist

If you want Seamless SSO while being outside the corp network, you’ll need to join the user devices to Azure AD, authentication will happen by using **Primary Refresh Tokens** (PRT): https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#resource-access
Seamless SSO and Azure AD Join PRT authentication can be enabled together for best user experience



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
