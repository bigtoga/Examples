# ADFS Urls
- https://localhost/adfs/ls/idpinitiatedsignon.htm (what I usually use for a health check)
- https://localhost/adfs/fs/federationserverservice.asmx
- https://localhost/federationmetadata/2007-06/federationmetadata.xml
- https://localhost/adfs/probe (although I've had trouble getting that to work for https)

To see more, open AD FS Management, go to **Service** and then **Endpoints**. Every row with a **Yes** under enabled should be available

You can also view them in PowerShell:
```powershell

Get-ADFSEndpoint 

# Get the federation metadata link:
Get-ADFSEndpoint | where Protocol -eq "Federation Metadata"

```
