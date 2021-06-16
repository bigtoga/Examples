# So many reasons

[Documentation on troubleshooting 502 gateway errors](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-troubleshooting-502)

1. No healthy nodes (all failed probe)
2. Request timeout exceeded (check HTTP Settings for Request Timeout - defaults to 20 seconds)
