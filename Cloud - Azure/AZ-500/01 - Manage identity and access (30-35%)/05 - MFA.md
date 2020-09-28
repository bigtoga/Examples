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

**Fraud Alerts**
