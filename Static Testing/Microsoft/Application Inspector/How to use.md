### Two ways to use:

1. AppInspector.exe -s (source path)
2. dotnet AppInspector.dll -s (source path)

AFAICT they both do the same output - which is an output HTML file in the same folder as the exe/dll

rem Get help\
AppInspector.exe help\
AppInspector.exe analyze help\

rem -o requires file extension or else it creates a file w no extension
dotnet AppInspector.dll -s (source) -o "Results.html" -f html (default)

rem JSON output
dotnet AppInspector.dll -s (source) -o "Results.json" -f json

### Verify rules in place are valid
dotnet AppInspector.dll verifyrules
