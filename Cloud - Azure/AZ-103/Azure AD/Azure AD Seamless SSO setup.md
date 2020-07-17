https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start

Azure AD Seamless SSO auto signs in corporate users connected to your on-premises network. Allows authentication to o365 apps etc.
1. 1. Add and verify a custom domain in Azure AD
1. Set up Azure AD Connect server using either Passthrough Authentication or password hash synchronization
  - A new user **AZUREADSSOACC** will be added to your on-prem Windows AD
  - Ensure Kerberos delegation is disabled on this account
1. Add the Azure AD URL to all users' Intranet Zone settings using Group Policy for `https://autologon.microsoftazuread-sso.com`

If you skip step 1 (which you can), your users will be prompted to sign in each time and you will have UPM issues

https://docs.microsoft.com/en-us/azure/active-directory/hybrid/plan-connect-userprincipalname
