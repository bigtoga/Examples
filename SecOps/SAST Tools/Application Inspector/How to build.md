1. cd to Google Drive/Github/Microsoft/Static Testing/ApplicationInspector
2. git pull
3. Requires .NET Core 3.0. 
4. cd to the root source folder
5. dotnet build -c Release # builds a release that requires user to have .NET Core 3.0 installed
6. dotnet publish -c Release -r win-x64 # Portable version

Release is now in ../bin/Release



