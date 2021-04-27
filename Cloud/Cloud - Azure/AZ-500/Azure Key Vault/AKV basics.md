# Soft-delete and Purge

https://docs.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview#scenarios

- You must enable soft-delete on your key vaults immediately. The ability to opt out of soft-delete will be deprecated by the end of the year, and soft-delete protection will automatically be turned on for all key vaults. See full details here

Key Vault's soft-delete feature:
- Allows recovery of the deleted vaults and deleted key vault objects (for example, keys, secrets, certificates)
- Configurable period of 7 to 90 calendar days
- If no configuration is specified the default recovery period will be set to 90 days. 

**Want to permanently delete a secret - how if soft-delete is enabled?**
1. User deletes the object, which puts it into the soft-deleted state. 
2. A user with purge permissions must purge the object in the soft-deleted state

```powershell

($resource = Get-AzResource -ResourceId (Get-AzKeyVault -VaultName "ContosoVault").ResourceId).Properties | Add-Member -MemberType "NoteProperty" -Name "enableSoftDelete" -Value "true"

Set-AzResource -resourceid $resource.ResourceId -Properties $resource.Properties
```

**Want to make sure any deleted secrets are retained for 90 days - how?**
- Enable purge protection

`New-AzKeyVault ... -EnablePurgeProtection`
