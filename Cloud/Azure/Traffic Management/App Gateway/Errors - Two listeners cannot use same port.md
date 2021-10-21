As of October 2021, you cannot have the same port being shared across the app gateway frontends. Example:
- Have a port 80 listener bound to `frontend_public`
- Have a port 80 listener bound to `frontend_private`

It just won't work

Solution/workaround - build your app gateways so that one serves only public sites, and another serves only private sites (even though you have a public ip)

Resources:
- https://stackoverflow.com/questions/66523796/two-frontend-ports-of-application-gateway-are-using-the-same-port-443-azure-ap
- https://github.com/MicrosoftDocs/azure-docs/issues/23652
