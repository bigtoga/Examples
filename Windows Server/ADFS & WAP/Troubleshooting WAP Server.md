If you try to reconfigure a WAP server and it hangs on syncronizing all nodes in farm, check this: 

```bash

netsh http delete sslcert ipport=0.0.0.0:443

netsh http add sslcert ipport=0.0.0.0:443 certhash=<YOUR_NEW_THUMBPRINT> appid={5d89a20c-beab-4389-9447-324788eb944a} certstorename=MY sslctlstorename=AdfsTrustedDevices
```

Powershell can help too:

```powershell
cd cert: 

dir -recurse | where {$_.Thumbprint -eq “8F7AD90430AFDC0D39994618007C131236A864B4”} | Format-List -property *

Get-WebApplicationProxySslCertificate
```
