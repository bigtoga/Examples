# https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-4.7.0

if ($PSVersionTable.PSEdition -eq 'Desktop' -and (Get-Module -Name AzureRM -ListAvailable)) {
    Write-Warning -Message ('Az module not installed. Having both the AzureRM and ' +
      'Az modules installed at the same time is not supported.')
} else {
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}


# If you get errors about NuGet or PowershellGet
#     1. Close Powershell
#     2. Launch as Administrator
#     3. Make sure you are using TLS 1.2

# Configure to use TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Install Azure module
Install-Module -Name Az -AllowClobber  -Force
