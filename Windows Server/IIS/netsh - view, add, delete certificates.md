Requires elevated shell. Shows you the certificate thumbprint *but*, if you want to use `netsh http add sslcert`

```shell
# Show all SSL certs for all websites
netsh http show sslcert

# Filter to only show the cert binding(s) for one website
netsh http show sslcert ipport=0.0.0.0:443
netsh http show sslcert hostnameport=my.url.com:443
```
