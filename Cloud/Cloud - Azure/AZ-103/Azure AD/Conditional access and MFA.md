Conditional Access overrides user settings - **if a user has MFA disabled for their user account but they also have a conditional access policy that requires MFA, the user is required to use MFA**

Microsoft: "You shouldn't enable or enforce users if you're using Conditional Access policies."

https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates

# Azure MFA States
1. Disabled	- The default state for a new user not enrolled in Azure Multi-Factor Authentication
1. Enabled - The user has been enrolled in Azure Multi-Factor Authentication, but hasn't registered authentication methods. They receive a prompt to register the next time they sign in.
1. Enforced - The user has been enrolled and has completed the registration process for Azure Multi-Factor Authentication.	

Important to know that for **Enabled** users, they will not be required to login using MFA this time but will be required the next time
