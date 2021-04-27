https://docs.microsoft.com/en-us/azure/active-directory/devices/overview#azure-ad-joined-devices

# Why?
Registering and joining devices to Azure AD gives your users Seamless Sign-on (SSO) to cloud resources. This process also allows administrators the 
ability to apply Conditional Access policies to resources based on the device they are accessed from.
- **Device-based Conditional Access policies require either hybrid Azure AD joined devices or compliant Azure AD joined or Azure AD registered devices.**

# Get a device in Azure
- Azure AD registered
  - Devices that are Azure AD *registered* are typically personally owned or mobile devices, and are signed in with a personal Microsoft account or another local account.
    - Windows 10, MacOs
    - iOS, Android
- Azure AD joined
    - Devices that are Azure AD *joined* are owned by an organization, and are signed in with an Azure AD account belonging to that organization. They exist only in the cloud.
      - Windows 10, Windows 2019 VMs in Azure
- Hybrid Azure AD joined
  - Devices that are hybrid Azure AD joined are owned by an organization, and are signed in with an Azure AD account belonging to that organization. They exist in the cloud **and** on-premises.
    - Windows 7, 8.1, or 10
    - Windows Server 2008 or newer
    
# Mobile Device Management (MDM) in Azure
Microsoft Intune, Microsoft Endpoint Configuration Manager, Group Policy (hybrid Azure AD join), Mobile Application Management (MAM) tools, or other third-party tools

# Tech Specs
The **primary refresh token (PRT)** contains information about the device and is required for SSO. **If you have a device-based Conditional Access policy set on an application, 
without the PRT, access is denied**. 

Hybrid Conditional Access policies require a hybrid state device and a valid user who is signed in.

