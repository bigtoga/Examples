Get-AzVMUsage -Location "eastus2"

Get-Module -Name "Az.Compute" | Select -ExpandProperty ExportedCommands | Select -ExpandProperty Keys
