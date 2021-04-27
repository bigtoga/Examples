Identity Protection is a tool that allows organizations to accomplish three key tasks:
- Automate the detection and remediation of identity-based risks
- Investigate risks using data in the portal
- Export risk detection data to third-party utilities for further analysis

## Azure MFA registration policy
Identity Protection can help organizations roll out Azure Multi-Factor Authentication (MFA) using a Conditional Access policy requiring registration at sign-in. Enabling this policy is a great way to ensure new users in your organization have registered for MFA on their first day. 

## Risk Policies

Azure Active Directory detects **six types of risk detections**:
- Users with leaked credentials - When cybercriminals compromise valid passwords of legitimate users, they often share those credentials.
- Sign-ins from anonymous IP addresses - This risk detection type identifies users who have successfully signed in from an IP address that has been identified as an anonymous proxy IP address.
- Impossible travel to atypical locations - This risk detection type identifies two sign-ins originating from geographically distant locations, where at least one of the locations may also be atypical for the user, given past behavior.
- Sign-ins from infected devices - This risk detection type identifies sign-ins from devices infected with malware, that are known to actively communicate with a bot server.
- Sign-in from unfamiliar locations - This risk detection type considers past sign-in locations (IP, Latitude / Longitude and ASN) to determine new / unfamiliar locations.
- Sign-ins from IP addresses with suspicious activity - This risk detection type identifies IP addresses from which a high number of failed sign-in attempts were seen, across multiple user accounts, over a short period of time.

**Azure AD Premium P1 edition** - advanced detections (such as unfamiliar sign-in properties) are not covered by your license, and will appear under the name *Sign-in with additional risk detected*. Additionally, the risk level and risk detail fields are hidden.

**User risk policy** - User risk is a calculation of *probability that an identity has been compromised*. Administrators can decide based on this **risk score signal** to enforce organizational requirements. Administrators can choose to:
1. block access
2. allow access
3. allow access but require a password change using Azure AD self-service password reset

**Sign-in risk policy**
Fraudulent sign-in for one-specific sign-in event. Think "Logging in from China". Identity Protection analyzes signals from each sign-in, both real-time and offline, and calculates a risk score based on the probability that the sign-in wasn't performed by the user. Administrators can decide based on this risk score signal to enforce organizational requirements. Administrators can choose to:
1. block access
2. allow access
3. allow access but require multi-factor authentication.

If risk is detected, users can perform multi-factor authentication to self-remediate and close the risky sign-in event to prevent unnecessary noise for administrators.

*Location* - allow you to use **named locations**. You can configure IPv4 or location data.
- Only IP ranges can be marked as a trusted location

**Difference between User risk and Sign-in policy?** - Frequency. One-time = sign-in risk; repeated = user risk

**Custom Conditional Access policy**
Administrators can also choose to create a custom Conditional Access policy including sign-in risk as an assignment condition.

![x](https://i.imgur.com/Sawp0dx.png)
