# Docs: 
#    Get-AppxPackage: https://docs.microsoft.com/en-us/powershell/module/appx/get-appxpackage?view=win10-ps
#    Remove-AppxPackage: https://docs.microsoft.com/en-us/powershell/module/appx/remove-appxpackage?view=win10-ps

# Types of packages:
#    Provisioned - downloaded and will be installed at next reboot

# Careful - this will remove ALL packages
Get-AppxPackage | Remove-AppxPackage
Get-AppxProvisionedPackage -online | Remove-AppxProvisionedPackage -online

# List all for all users
Get-AppxPackage -allusers | format-table -AutoSize

# List all for just me
Get-AppxPackage -User Scott | `
    Where {$_.IsFramework -eq $false -and $_.NonRemovable -eq $false} `
    | Select Name, PackageFullName, InstallLocation `
    | Format-Table -AutoSize

# Cortana
Get-AppxPackage -Allusers -Package Microsoft.549981C3F5F10 | Remove-AppxPackage

# Facebook Instagram Beta
Get-AppxPackage -User Scott -Package "Facebook.InstagramBeta " | Remove-AppxPackage


Get-AppxPackage -User Scott -Package Microsoft.BingWeather_4.7.118.0_x86__8wekyb3d8bbwe
Remove-AppxPackage 


