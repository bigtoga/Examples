1. Get the role definition of an existing role, store in .json file -  `Get-AzRoleDefinition -Name "Reader" | Convert-To-Json | Out-File MyFile.json`
1. Edit the file to include what you want
1. `New-AzRoleDefinition -InputFile "MyFile.json"`
