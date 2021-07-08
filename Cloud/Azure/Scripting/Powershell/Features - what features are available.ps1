Get-AzProviderFeature -ListAvailable

Get-AzProviderFeature -ListAvailable | Where {$_.RegistrationState -ne "NotRegistered"}

Get-AzProviderFeature -ProviderNamespace "Microsoft.NetApp"

Get-AzProviderFeature -FeatureName "AllowPreReleaseRegions" -ProviderNamespace "Microsoft.Compute"
