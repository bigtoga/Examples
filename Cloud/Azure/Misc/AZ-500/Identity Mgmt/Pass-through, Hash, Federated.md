**We want to keep using on-prem Windows AD to manage - how?** - Pass-through

**We want login restrictions - how?** - Pass-through

**We want to minimize servers needed - how?** - Pass-through w seamless SSO (ADFS would require more servers)

**Want leaked credentials report?** - Has to use Password Hash in some way but can also use Seamless SSO or Federated. One variant has both Pass-thru and Hash w Seamless SSO

# Flowchart 

From https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn

![x](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/media/choose-ad-authn/azure-ad-authn-image1.png)
