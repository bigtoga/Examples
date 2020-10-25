# Access Reviews

- Ideal for finding stale access assignments
- Scope can be Azure roles, AD group members, or application access
- Can create recurring access reviews
- Azure AD Premium P2
- Requires Global administrator or User administrator
- Can be grouped into **programs**
    - One program for Compliance, and another program for a business goal
- Can be created via API

**If the reviews are marked "Members (self)", who can review?**
- Only the creating member (a.k.a. self-reviews)

**If the reviewer does not respond by the end date, then what?**
- Depends on the Auto apply and the "Should reviewer not respond" values
- Should reviewer not respond options:
    - No change - leave the user's access unchanged
    - Remove access - remove the user's access
    - Approve access
    - Take recommendations - take the system's recommendation (which is generally "Send an email")
    
**How to create new access review?**
- 1. Create a new access review program
- 2. Create a new access review control (this is not an audit so make it a control)
- 3. Set the access reviewers to Group Owners

# Create an Access Review

https://docs.microsoft.com/bs-cyrl-ba/azure/active-directory/governance/create-access-review

1. Upgrade to P2
2. Global admin or user administrator
3. Azure Portal - search for **Identity Governance**
4. New Access review
5. Define who or what it applies to
    - Can just include Guest users or everyone
6. Assign the Reviewers
    - Group Owners 
    - Selected Users 
    - Members (self)
7. Select the Programs this is in
8. Define **completion settings** (what happens when it is finished)
    - Auto-apply results to resource? 
    - If reviewers do not respond
        - No change
        - Remove access
        - Approve access
        - Take recommendations
    - Action to apply on denied users
        - If someone gets denied as a result of this review, what happens next?
        - Remove membership
        - Block user from signing-in for 30 days, then remove from the tenant
