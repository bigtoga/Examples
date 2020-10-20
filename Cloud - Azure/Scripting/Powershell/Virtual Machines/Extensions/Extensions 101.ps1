clear-host

# What extensions are available for a given VM?
Get-AzureVMAvailableExtension | Select ExtensionName, Publisher, CompanyName, Description | Out-gridView

# What publishers are available to you? 
Get-AzVMImagePublisher -Location "SouthCentralUS" | Where {$_.PublisherName -like "Microsoft*" -and $_.PublisherName -notlike "Test*" -and $_.Id -notlike "Test*"} 

# What extensions does that publisher make?
Get-AzVMExtensionImageType -PublisherName "Microsoft.Azure.Security" -Location "SouthCentralUS" | Get-AzVMExtensionImage | Select Type, Version, PublisherName

# What versions of the extension are there?
# Note - most of the version numbers are Major.Minor in the -TypeHandlerVersion but might be listed as 1.5.5.9
Get-AzVMExtensionImage -Type IaaSAntimalware -PublisherName "Microsoft.Azure.Security" -Location "SouthCentralUS" 

# Enable it

SettingsString = "{ ""AntimalwareEnabled"": true }"
Set-AzVMExtension -ResourceGroupName "foobar" -Location "SouthCentralUS" -VMName "MyVM1" `
  -Name "IaaSAntimalware" -Publisher "Microsoft.Azure.Security" -Type "IaaSAntimalware" -TypeHandlerVersion "1.5" -SettingString $SettingsString
