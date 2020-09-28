# How do users get to use MFA?
Up to you. 

1. Call to phone - Places an automated voice call. The user answers the call and presses # in the phone keypad to authenticate. 
    - The phone number is not synchronized to on-premises Active Directory. 
    - A voice call to phone is important because it persists through a phone handset upgrade, allowing the user to register the mobile app on the new device

2. Text message to phone 
    - Two-way SMS means that the user must text back a particular code. Two-way SMS is deprecated and not supported after November 14, 2018. 
    - Users who are configured for two-way SMS are automatically switched to call to phone verification at that time.

3. Notification through mobile app
  - The Microsoft Authenticator app is available for Windows Phone, Android, and iOS. Push notifications through the mobile app provide the best user experience

4. Verification code from mobile app
    - The Microsoft Authenticator app generates a new OAUTH verification code every 30 seconds. The user enters the verification code into the sign-in interface. The Microsoft Authenticator app is available for Windows Phone, Android, and iOS. 
    - Verification code from mobile app can be used when the phone has no data connection or cellular signal.

✔️ There is also a selection to **cache passwords** so that users do not have to authenticate on trusted devices. The number of days before a user must re-authenticate on trusted devices can also be configured 
    - Between 1 to 60 days
    - default is 14 days

# Misc
**Trusted IPs** - Allows federated users or IP address ranges to bypass 2FA

**One-Time Bypass**

**Fraud Alerts** - Block user when fraud is reported 

- Configure the fraud alert feature so that your users can report fraudulent attempts to access their resources
- Users can report fraud attempts by using the mobile app or through their phone. 
- *Block user when fraud is reported* - If a user reports fraud, their account is blocked for 90 days or until an administrator unblocks their account. An administrator can review sign-ins by using the sign-in report and take appropriate action to prevent future fraud. An administrator can then unblock the user's account

**Account lockout**
*The account lockout settings are only applied when a pin code is entered for the MFA prompt* 

The following settings are available:
- Number of MFA denials to trigger account lockout
- Minutes until account lockout counter is reset
- Minutes until account is automatically unblocked

**Block and unblock users**
- If a user's device has been lost or stolen, you can block authentication attempts for the associated account.

Fraud Alerts

Code to report fraud during initial greeting - Code to report fraud during initial greeting: When users receive a phone call to perform two-step verification, they normally press # to confirm their sign-in. To report fraud, the user enters a code before pressing #. This code is 0 by default, but you can customize it.

Notifications
Email notifications can be configured when users report fraud alerts. These notifications are typically sent to identity administrators, as the user's account credentials are likely compromised.

OATH tokens
Azure AD supports the use of OATH-TOTP SHA-1 tokens that refresh codes every 30 or 60 seconds. Customers can purchase these tokens from the vendor of their choice.

Trusted IPs
Trusted IPs is a feature to allow federated users or IP address ranges to bypass two-step authentication. Notice there are two selections in this screenshot.

Which selections you can make depends on whether you have managed or federated tenants.

Managed tenants. For managed tenants, you can specify IP ranges that can skip MFA.

Federated tenants. For federated tenants, you can specify IP ranges and you can also exempt AD FS claims users.

✔️ The Trusted IPs bypass works only from inside of the company intranet. If you select the All Federated Users option and a user signs in from outside the company intranet, the user must authenticate by using two-step verification. The process is the same even if the user presents an AD FS claim.
