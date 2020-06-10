Environment overview:
- IaaS environment with Windows 2016 Active Directory-based domain (WAD) `MYSITE`
- Azure AD tenant with custom vanity domain for `mysite.com`
- Azure AD Connect enabled and WAD is in sync with AAD
- Writeback enabled on AAD so that changes can be made in either 
- You have DNS servers inside your WAD

# Basics of DNS in Azure
DNS can be created/managed in multiple places:
- Public DNS
  - From Azure DNS (public)
  - From another DNS provider
  - From your own public DNS servers
- Private DNS
  - From Azure DNS (private)
  - From your Windows Active Directory DNS
