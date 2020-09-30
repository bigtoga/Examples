New-AzResourceGroup -Name 'AZ500LAB10' -Location eastus

$kvName = 'az500kv' + $(Get-Random)
New-AzKeyVault -VaultName $kvName -ResourceGroupName 'AZ500LAB10' -Location 'eastus'

#########################################
# Add a new key

$kv = Get-AzKeyVault -ResourceGroupName 'AZ500LAB10'
$key = Add-AZKeyVaultKey -VaultName $kv.VaultName -Name 'MyLabKey' -Destination 'Software'

Get-AZKeyVaultKey -VaultName $kv.VaultName
$key.key.kid

# https://<key_vault_name>.vault.azure.net/keys/MyLabKey
# https://<key_vault_name>.vault.azure.net/keys/MyLabKey/<key_version>

##########################################
# Add a secret
$secretvalue = ConvertTo-SecureString 'Pa55w.rd1234' -AsPlainText -Force

$secret = Set-AZKeyVaultSecret -VaultName $kv.VaultName -Name 'SQLPassword' -SecretValue $secretvalue
Get-AZKeyVaultSecret -VaultName $kv.VaultName
