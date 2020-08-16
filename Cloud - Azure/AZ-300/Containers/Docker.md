# Steps to add to run a Powershell
1. Put .ps1 file in the same location as the DockerFile
1. Add `RUN powershell "myfile.ps1"` to DockerFile

# Steps to register .NET dll
1. Put .dll file in the same location as the DockerFile
1. Add `FROM microsoft/dotnet:3.1-aspnetcore-runtime` to the DockerFile
1. Add `ENTRYPOINT ["dotnet", "mydll.dll"]` to the DockerFile
