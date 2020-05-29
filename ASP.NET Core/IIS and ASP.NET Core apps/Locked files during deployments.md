Crap model for IIS - basically they want you off of “IIS on VMs” and into Azure App Service leveraging a blue/green deployment model
* .dll Files loaded by ASP.NET Core engine are locked in memory by default 
* Only 3 ways to “unlock” so you can deploy 

# Option 1: Stop the app using app_offline.htm
- Use `Web Deploy` and reference `Microsoft.NET.Sdk.Web` in the project file
- When Web Deploy is executed, an app_offline.htm file is created and the ASP.NET Core Module gracefully shuts down the app and serves the app_offline.htm file during the deployment
- Existing requests are allowed to finish 
- When deployment has finished, Web Deploy will remove app_offline.htm

# Option 2: Stop the app pool
Nuclear option since existing requests are killed 

# Option 3: Manually deploy an app_offline.htm 

Example PowerShell:
```shell   
$pathToApp = ‘PATH_TO_APP’

# Gracefully shutdown the AppPool
New-Item -Path $pathToApp app_offline.htm

# Write robocopy script here to deploy the app

# Restart the AppPool
Remove-Item -Path $pathToApp app_offline.htm
``` 




https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/ - look for the section “Locked deployment files”