1. TLS 1.2
2. Turn on **Incoming client certificates**
    - `az webapp update --set clientCertEnabled=true --name <app_name> --resource-group <group_name>`

https://docs.microsoft.com/en-us/azure/app-service/app-service-web-configure-tls-mutual-auth
