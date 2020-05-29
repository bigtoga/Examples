
```shell   
dotnet new webapp -o EnvironmentsSample

cd EnvironmentsSample

cd Properties

nano launchSettings.json
``` 

`/Properties/launchSettings.json` defines which environment you are using - The launchSettings.json file:
* Is only used on the local development machine
* Is not deployed
* contains profile settings

Example showing multiple environment definitions:
```shell
{
  “iisSettings”: {
    “windowsAuthentication”: false, 
    “anonymousAuthentication”: true, 
    “iisExpress”: {
      “applicationUrl”: “http://localhost:64645”,
      “sslPort”: 44366
    }
  },
  “profiles”: {
    “IIS Express”: {
      “commandName”: “IISExpress”,
      “launchBrowser”: true,
      “environmentVariables”: {
        “ASPNETCORE_ENVIRONMENT”: “Development”
      }
    },
    “IISX-Production”: {
      “commandName”: “IISExpress”,
      “launchBrowser”: true,
      “environmentVariables”: {
        “ASPNETCORE_ENVIRONMENT”: “Production”
      }
    },
    “IISX-Staging”: {
      “commandName”: “IISExpress”,
      “launchBrowser”: true,
      “environmentVariables”: {
        “ASPNETCORE_ENVIRONMENT”: “Staging”,
        “ASPNETCORE_DETAILEDERRORS”: “1”,
        “ASPNETCORE_SHUTDOWNTIMEOUTSECONDS”: “3”
      }
    },
    “EnvironmentsSample”: {
      “commandName”: “Project”,
      “launchBrowser”: true,
      “applicationUrl”: “https://localhost:5001;http://localhost:5000”,
      “environmentVariables”: {
        “ASPNETCORE_ENVIRONMENT”: “Development”
      }
    },
    “KestrelStaging”: {
      “commandName”: “Project”,
      “launchBrowser”: true,
      “applicationUrl”: “https://localhost:5001;http://localhost:5000”,
      “environmentVariables”: {
        “ASPNETCORE_ENVIRONMENT”: “Staging”
      }
    }
  }
}
```

When you are ready to run your app, you can launch “this app, this one time using Development environment” by setting the ASPNETCORE_ENVIRONMENT value in bash:
```shell   
set ASPNETCORE_ENVIRONMENT=Development 
dotnet run —no-launch-profile —verbosity normal
``` 
You can globally set this by adding it to the `path variable` in Windows also so that it always chooses Development. 
* When the ASPNETCORE_ENVIRONMENT environment variable is set globally, it takes effect for dotnet run in any command window opened after the value is set. 
* Environment values in launchSettings.json override values set in the system environment.