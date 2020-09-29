# Identity Management

## Conditional Access Policies

**Require MFA for Azure portal?** - Tenant -> Security -> Conditional Access -> New Policy -> Cloud Apps -> Select users -> Grant -> Require MFA

## MFA

**How to enable / change MFA?** - In portal, search for Multi-Factor Authentication

**How to block/unblock users?** - In portal, search for Multi-Factor Authentication -> Block/Unblock users

**How to enable / set up fraud, fraud blocked sign-ins?** - Multi-Factor Authentication -> Fraud Alert

**Set up custom caller ID? Change # of PIN attempts?** - Multi-Factor Authentication -> Phone call settings

**One time bypass?** - Multi-Factor Authentication -> One-time bypass

**Caching?** - Multi-Factor Authentication -> Caching

**Activity report?** - Multi-Factor Authentication -> Activity Report

Lab 4 - https://github.com/MicrosoftLearning/AZ500-AzureSecurityTechnologies/blob/master/Instructions/Labs/LAB_04_MFAConditionalAccessandAADIdentityProtection.md

1. Assign P2 license to the user
2. In portal, go to Tenant -> Security -> and click on **Additional cloud-based MFA settings**
3. Configure it, then click Save
4. Go to Users blade -> Click on **Multi-factor Authentication** at the top
5. Configure

## How to set up Trusted IPs?
Option 1: 
1. In portal, search for trusted IPs
1. Click on Azure Named Locations

Option 2: 
1. In portal, go to Tenant -> Users -> Click on **Multi-factor Authentication** at the top
5. Click on **service settings**


# Priviliged Identity Management

**Grant someone privileged role use for a period**
1. Portal -search for Privileged...
2. Manage -> AD Roles -> Roles and assign
