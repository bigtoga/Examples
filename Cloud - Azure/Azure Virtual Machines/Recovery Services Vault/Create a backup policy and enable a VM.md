<#
    Get-Command *azrecoveryservices*

#>


Clear-Host 

Connect-AzAccount
$non_prod_subscriptionId = "cd50637f-7488-4e4d-9cf6-6a19d84ba7ab"
$context = Get-AzSubscription -SubscriptionId $non_prod_subscriptionId
Set-AzContext $context
Get-AzContext

#region Setup
    Set-StrictMode -Version 5.0 

#endregion

#region 1. Register the backup provider
    Register-AzResourceProvider -ProviderNamespace "Microsoft.RecoveryServices"

    Get-AzResourceProvider -ProviderNamespace "Microsoft.RecoveryServices"

#endregion

#region Naming
    $rsv_name = "rsv-App"
    $rsv_redundancy = "LocallyRedundant" #GeoRedundant

    $rgName = "rg-MyApp"
    $location = "eastus2"

    $vm_to_backup = "myVM"
#endregion

#region Tagging    
    $tag_AppOrPlatform = "MyApp"
    $tag_Environment = "App"
    $tag_Function = "Recovery Services Vault for VM backups in DEV"
    $tag_CreatedBy = "Scott Whigham"
    $tag_CreateDate = Get-Date
#endregion

New-AzRecoveryServicesVault -Name $rsv_name -ResourceGroupName $rgName -Location $location

$rsv = Get-AzRecoveryServicesVault -Name $rsv_name
Set-AzRecoveryServicesBackupProperty  -Vault $rsv -BackupStorageRedundancy $rsv_redundancy

Get-AzRecoveryServicesBackupProtectionPolicy -WorkloadType "AzureVM" -VaultId $rsv.ID

$schPol = Get-AzRecoveryServicesBackupSchedulePolicyObject -WorkloadType "AzureVM"
$UtcTime = Get-Date -Date "2020-07-30 21:00:00Z"
$UtcTime = $UtcTime.ToUniversalTime()
$schpol.ScheduleRunTimes[0] = $UtcTime

$retPol = Get-AzRecoveryServicesBackupRetentionPolicyObject -WorkloadType "AzureVM"

$backup_policy_name = "App-VM-Backup-Retenction-Policy"
New-AzRecoveryServicesBackupProtectionPolicy -Name $backup_policy_name  `
    -WorkloadType "AzureVM" -RetentionPolicy $retPol `
    -SchedulePolicy $schPol `
    -VaultId $rsv.ID
    
Get-AzRecoveryServicesBackupProtectionPolicy -WorkloadType "AzureVM" -VaultId $rsv.ID

$pol = Get-AzRecoveryServicesBackupProtectionPolicy -Name $backup_policy_name  -VaultId $rsv.ID

Enable-AzRecoveryServicesBackupProtection -Policy $pol `
    -Name $vm_to_backup `
    -ResourceGroupName `
    $rgName `
    -VaultId $rsv.ID 
