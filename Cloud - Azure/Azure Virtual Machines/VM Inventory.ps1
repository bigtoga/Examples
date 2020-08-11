Get-AzVMUsage -Location "eastus2"

Get-AzVM | % { $_.Name }

Get-Module -Name "Az.Compute" | Select -ExpandProperty ExportedCommands | Select -ExpandProperty Keys
