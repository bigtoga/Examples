Get-AzVMUsage -Location "eastus2"

Get-AzVM | % { $_.Name }

Get-Module -Name "Az.Compute" | Select -ExpandProperty ExportedCommands | Select -ExpandProperty Keys

```

Get-AzVM
Get-AzVMSize
Get-AzDisk
Get-AzComputeResourceSku
Get-AzVMImageSku
Get-AzVMUsage



Get-AzAvailabilitySet
Get-AzContainerService
Get-AzGallery
Get-AzGalleryImageDefinition
Get-AzGalleryImageVersion
Get-AzImage
Get-AzProximityPlacementGroup
Get-AzRemoteDesktopFile
Get-AzSnapshot
Get-AzVMAccessExtension
Get-AzVMADDomainExtension
Get-AzVMAEMExtension
Get-AzVMBootDiagnosticsData
Get-AzVMChefExtension
Get-AzVMCustomScriptExtension
Get-AzVMDiagnosticsExtension
Get-AzVMDiskEncryptionStatus
Get-AzVMDscExtension
Get-AzVMDscExtensionStatus
Get-AzVMExtension
Get-AzVMExtensionImage
Get-AzVMExtensionImageType
Get-AzVMImage
Get-AzVMImageOffer
Get-AzVMImagePublisher
Get-AzVMRunCommandDocument
Get-AzVMSqlServerExtension
Get-AzVmss
Get-AzVmssDiskEncryption
Get-AzVmssRollingUpgrade
Get-AzVmssSku
Get-AzVmssVM
Get-AzVmssVMDiskEncryption
```
