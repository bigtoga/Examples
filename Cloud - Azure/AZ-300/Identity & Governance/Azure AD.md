# How to apply coditional access policies for different requirements?

1. Want everyone registered for MFA but only require for Risky sign-in
    - Configure **End user protection** (baseline policy)
    
2. Block access for users on Outlook 2010
    - Configure **Block legacy authentication**
    
3. MFA required for Portal, Powershell, or CLI
    - Configure **Require MFA for service management**
    

# You enable MFA for a user. What methods can they use to do the MFA?
- SMS/text
- Phone call
- Msft Authenticator app
- OAUTH hardware token

https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks

# How to require MFA for Azure Portal and only allow connections from office on premise?
https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks

1. Portal -> Azure AD
2. Multi-factor Authentication -> Additional cloud-based MFA settings -> Add trusted IPs to "Skip MFA 
3. Set Conditional Access Policy -> Locations -> All trusted locations = Yes

---

![x](https://i.imgur.com/HIS2Ubh.png)

----

![x](https://i.imgur.com/DFQ9vLO.png)

----

![x](https://i.imgur.com/B7vqwM7.png)
