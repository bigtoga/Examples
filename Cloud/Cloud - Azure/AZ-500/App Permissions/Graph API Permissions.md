https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent

**Service on a VM needs to authenticate to tenant and access Microsoft Graph to read directory data. How?**
1. Add an app registration
2. Add an application permission
3. Grant permissions

# Graph API Permissions

Microsoft identity platform supports two types of permissions: **delegated permissions and application permissions**.
- **Delegated permissions are used by apps that have a signed-in user present**. For these apps, either the user or an administrator consents to the permissions that the app requests, and the app is delegated permission to act as the signed-in user when making calls to the target resource. Some delegated permissions can be consented to by non-administrative users, but some higher-privileged permissions require administrator consent. To learn which administrator roles can consent to delegated permissions, see Administrator role permissions in Azure AD.
- **Application permissions are used by apps that run without a signed-in user present**; for example, apps that run as background services or daemons. Application permissions can only be consented by an administrator.
