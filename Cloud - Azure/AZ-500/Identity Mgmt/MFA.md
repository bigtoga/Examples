# Enabled, Enforced, and Disabled 

Users can have 3 states:
- Disabled
- Enabled - user has not gone through MFA onboarding. When they log in, they will be required to onboard and MFA
- Enforced - user has gone through MFA onboarding; MFA required for everything now
- https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates

Remember that Conditional Access takes precendence over any individual user settings!


# Options and their meaning

https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks

1. App passwords - https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-app-passwords
    - Used only for legacy apps that were built before "pauses" introduced by MFA
    - Don't work w Conditional Access
    - Turned **off by default**

2. Trusted IPs 
    - Skip MFA for Requests From Federated users on my intranet
        - You have ADFS
        - You have set up Office 365 as the relying party in ADFS
        - ADFS issues the `insidecorporatenetwork` claim set to "True" for users who authenticated using ADFS
        - Enable "Skip MFA for Requests From Federated users on my intranet" in Azure

```
<saml:Attribute AttributeName=”insidecorporatenetwork” AttributeNamespace=”http://schemas.microsoft.com/ws/2012/01″ a:OriginalIssuer=”CLIENT CONTEXT” xmlns:a=”http://schemas.xmlsoap.org/ws/2009/09/identity/claims”>

<saml:AttributeValue b:type=”tn:boolean” xmlns:tn=”http://www.w3.org/2001/XMLSchema” xmlns:b=”http://www.w3.org/2001/XMLSchema-instance”>true</saml:AttributeValue>

</saml:Attribute>
```

### Verification methods

Can choose:
- Microsoft Authenticator app
- OATH hardware token
- SMS
- Voice call

### Pricing

- Basic MFA is free for all users
- Upgrade for "all users"
    - P1 = Conditional Access available
    - P2 = risk-based conditional access, PIM, fraud alerts, reports, custom greetings, custom caller ID, trusted IPs, MFA for on-prem apps

Comparison:

![x](https://i.imgur.com/BY1fuws.png)
