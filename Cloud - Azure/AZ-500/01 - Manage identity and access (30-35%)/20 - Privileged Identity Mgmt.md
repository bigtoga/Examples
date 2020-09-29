# Best practices

Ensure there are always at least 2 Privileged Role Administrators

Prioritize protecting Azure AD Roles that have the greatest number of permissions

# Security in managing PIM
1. The "first user" of the tenant is a Global Administrator. This account has privileges others do not
2. By default, other Global Administrators other than the "first user" only have read-only access to Privileged Identity Management
3. Security Administrators only have read-only access to PIM
4. Security Readers also have read-only access to PIM

# Workflow to setup / configure

|  Step | Who?  |  Notes |
|---|---|---|
| Setup | Global Administrator (*first user*) | Assign user to the "Privileged Role Administrator" role (a.k.a. PIM Administrator) |
| Plan  | PIM Administrator  |  Determine roles & users that will be managed by PIM |
| Assign  |  PIM Administrator |  Assign users or current admins as eligible admins for specific Azure AD Roles |
| Activate | PIM User  |  Activate your eligible admin roles so they can get limited access to the privileged identity |
|  Approve |  PIM Approver |  View and approve |
| Audit  | PIM Administrator  |  View and export |
| Access Reviews  | Global Administrator  |  Verify intended designs are in place |

# PIM Scope

Two scopes:
1. Azure AD Roles 
  - Assign users to a role. Users must now elevate to use the privileges
  
2. Azure resources
  - Assign resources - now user has to elevate to configure

# Zero Trust 

![x](https://i.imgur.com/DmPp5xp.png)

![x](https://i.imgur.com/qpCaeXj.png)

![x](https://i.imgur.com/82PTqRI.png)

Onboarding:

![x](https://i.imgur.com/9FNVppB.png)
