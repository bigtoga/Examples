## Path-based routing

Use this to break up applications from a monolith into smaller sub applications/macro or micro services

I have two URLs on the same TLD and I want them to be handled by two different backend pools
- URL: https://mydomain/images/* - I want to be handled by backend pool named `pool-Images`
- URL: https://mydomain/videos/* - I want to be handled by `pool-Videos`

Resources:
- [App Gateway request routing rules](https://docs.microsoft.com/en-us/azure/application-gateway/configuration-request-routing-rules) - defines `basic` and `path-based` rules
- [Example URL path map](https://docs.microsoft.com/en-us/azure/application-gateway/url-route-overview)

## Path-based redirects

Use this to 301 redirect to a new URL. Three options:
1. Global redirection - Redirects from one listener to another listener on the gateway. Use this to force HTTP to HTTPS redirection for ex.
2. Path-based redirection - 301 redirect https://mydomain/cart/* to https://mydomain/shopping-cart/*
3. Redirect to external site

Resources:
- [Redirection basics](https://docs.microsoft.com/en-us/azure/application-gateway/configuration-request-routing-rules#redirection-setting)
- [Overview of redirection with App GW](https://docs.microsoft.com/en-us/azure/application-gateway/redirect-overview)
