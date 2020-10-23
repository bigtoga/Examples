1. Security team uploads a certificate to the Web App
2. Developer team updates the app settings for the Web App using `WEBSITE_LOAD_CERTIFICATES`

```shell
az webapp config appsettings set --name myApp --resource-group rgApp --settings WEBSITE_LOAD_CERTIFICATES=<comma-separated-certificate-thumbprints>
```

https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-certificate-in-code

