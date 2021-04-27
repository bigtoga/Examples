# The 2 Types of OAuth Grants
1. OAuth2 authorization code grant
    - Two service endpoints, `authorization` and `token`
    - `authorization` generates an authorization code
    - `token` passes the code and refresh token
2. OAuth2 implicit grant
    - Best practice - "... best approach you can pursue for applications that consume a Web API via JavaScript from a browser"
    - allows a client to obtain an access token directly from the authorization endpoint
    - never return refresh tokens to the client

**Have a mobile app that you want to use OAuth2 Implicit Grant with - how?**
- https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/v1-oauth2-implicit-grant-flow
1. Get the redirect URI for the app
1. Register app in Azure AD. Include the redirect URI.

