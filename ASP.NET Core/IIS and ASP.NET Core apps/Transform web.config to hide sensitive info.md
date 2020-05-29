Instead of embedding passwords and other sensitive data in web.config, **transform** during CI/CD. 

# Processing order of build transforms
You can transform in four ways and they occur in the following order:
1. Build transforms
2. Profile transforms
1. Environment transforms
1. 

## Build transforms 
Build configuration transforms are run first
1. Set up your project with multiple build configurations (Development, Staging, Release, etc)
1. Include a `web.{CONFIGURATION}.config` file for each build configuration (Debug|Release) requiring a web.config transformation

Example web.Production.config:
```shell  
<?xml version=“1.0”?>
<configuration xmlns:xdt=“http://schemas.microsoft.com/XML-Document-Transform”>
  <location>
    <system.webServer>
      <aspNetCore>
        <environmentVariables xdt:Transform=“InsertIfMissing”>
          <environmentVariable name=“Configuration_Specific” 
                               value=“Configuration_Specific_Value” 
                               xdt:Locator=“Match(name)” 
                               xdt:Transform=“InsertIfMissing” />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
```
The above transform will run whenever the app is called with `dotnet publish —configuration Production`

If you are using `msbuild.exe`, the MSBuild property for the configuration is `$(Configuration)`

## Profile transforms
These run after build transforms. 
1. Include a `web.{PROFILE}.config` file for each profile configuration requiring a web.config transformation

Example profile transform for a file named `web.FolderProfile.config
```shell   
<?xml version=“1.0”?>
<configuration xmlns:xdt=“http://schemas.microsoft.com/XML-Document-Transform”>
  <location>
    <system.webServer>
      <aspNetCore>
        <environmentVariables xdt:Transform=“InsertIfMissing”>
          <environmentVariable name=“Profile_Specific” 
                               value=“Profile_Specific_Value” 
                               xdt:Locator=“Match(name)” 
                               xdt:Transform=“InsertIfMissing” />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
```

You can then invoke both a build and a profile transform with the ASP.NET Core CLI:
```shell   
dotnet publish —configuration Production /p:PublishProfile=FolderProfile
``` 

The MSBuild property for the profile name is `$(PublishProfile)`

Note: If no profile is passed, the default profile name is `FileSystem` and `web.FileSystem.config` is applied if the file is present in the app’s content root.

## Environment transforms
These run third. 
1. Include a `web.{ENVIRONMENT}.config` file for each environment requiring a web.config transformation

Example `web.Production.config`:
```shell   
<?xml version=“1.0”?>
<configuration xmlns:xdt=“http://schemas.microsoft.com/XML-Document-Transform”>
  <location>
    <system.webServer>
      <aspNetCore>
        <environmentVariables xdt:Transform=“InsertIfMissing”>
          <environmentVariable name=“Environment_Specific” 
                               value=“Environment_Specific_Value” 
                               xdt:Locator=“Match(name)” 
                               xdt:Transform=“InsertIfMissing” />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
``` 

You can then invoke via the CLI:
```shell   
dotnet publish —configuration Release /p:EnvironmentName=Production
``` 

The MSBuild property for the environment is `$(EnvironmentName)`

**The `ASPNETCORE_ENVIRONMENT` environment variable is automatically added to the web.config file when the environment name is specified.**

## Custom transforms
Custom transformations are run last, after Build configuration, Profile, and Environment transforms.
1. Include a `{CUSTOM_NAME}.transform` file for each custom configuration requiring a web.config transformation

Example `custom.transform`:
```shell   
<?xml version=“1.0”?>
<configuration xmlns:xdt=“http://schemas.microsoft.com/XML-Document-Transform”>
  <location>
    <system.webServer>
      <aspNetCore>
        <environmentVariables xdt:Transform=“InsertIfMissing”>
          <environmentVariable name=“Custom_Specific” 
                               value=“Custom_Specific_Value” 
                               xdt:Locator=“Match(name)” 
                               xdt:Transform=“InsertIfMissing” />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
And invoking via CLI:
```shell   
dotnet publish —configuration Release /p:CustomTransformFileName=custom.transform
``` 

The MSBuild property for the profile name is `$(CustomTransformFileName)`

# Prevent any transformations 
Prevent web.config transformation
To prevent transformations of the web.config file, either (a) set the MSBuild property `$(IsWebConfigTransformDisabled)` or (b) use the 
.NET Core CLI:
```shell    
dotnet publish /p:IsWebConfigTransformDisabled=true

``` 


https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/transform-webconfig