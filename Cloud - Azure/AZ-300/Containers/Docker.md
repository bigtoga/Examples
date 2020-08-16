# Run a Docker image as an app
1. Create an App Services plan
2. Create a web app for Linux

https://docs.microsoft.com/en-us/azure/app-service/configure-custom-container?pivots=platform-linux

# Steps to add to run a Powershell script when image loads
1. Put .ps1 file in the same location as the DockerFile
1. Add `RUN powershell "myfile.ps1"` to DockerFile

# Steps to register .NET dll when image loads
1. Put .dll file in the same location as the DockerFile
1. Add `FROM microsoft/dotnet:3.1-aspnetcore-runtime` to the DockerFile
1. Add `ENTRYPOINT ["dotnet", "mydll.dll"]` to the DockerFile
