Identity Protection is a tool that allows organizations to accomplish three key tasks:
- Automate the detection and remediation of identity-based risks
- Investigate risks using data in the portal
- Export risk detection data to third-party utilities for further analysis

## Azure MFA registration policy
Identity Protection can help organizations roll out Azure Multi-Factor Authentication (MFA) using a Conditional Access policy requiring registration at sign-in. Enabling this policy is a great way to ensure new users in your organization have registered for MFA on their first day. 

## Risk Policies

**User risk policy**

**Sign-in risk policy**
Identity Protection analyzes signals from each sign-in, both real-time and offline, and calculates a risk score based on the probability that the sign-in wasn't performed by the user. Administrators can decide based on this risk score signal to enforce organizational requirements. Administrators can choose to:
1. block access
2. allow access
3. allow access but require multi-factor authentication.

If risk is detected, users can perform multi-factor authentication to self-remediate and close the risky sign-in event to prevent unnecessary noise for administrators.

**Custom Conditional Access policy**
Administrators can also choose to create a custom Conditional Access policy including sign-in risk as an assignment condition.

![x](https://i.imgur.com/Sawp0dx.png)
