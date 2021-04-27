# After creating the registered app + creating a client-side secret, allow access to AKV

$applicationId = '50ac12d5-00b9-4633-b29b-3f89498ce5e2'
$kvName = (Get-AzKeyVault -ResourceGroupName 'AZ500LAB10').VaultName

Set-AZKeyVaultAccessPolicy -VaultName $kvName -ResourceGroupName AZ500LAB10 -ServicePrincipalName $applicationId -PermissionsToKeys get,wrapKey,unwrapKey,sign,verify,list

Install-Package Microsoft.SqlServer.Management.AlwaysEncrypted.AzureKeyVaultProvider
Install-Package Microsoft.IdentityModel.Clients.ActiveDirectory
