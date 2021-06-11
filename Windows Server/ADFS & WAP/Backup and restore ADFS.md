Use the ADFS Rapid Restore Tool - https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/ad-fs-rapid-restore-tool
1. [Download the tool to your ADFS server](https://www.microsoft.com/en-us/download/details.aspx?id=56569)
2. In Powershell, run `import-module 'C:\Program Files (x86)\ADFS Rapid Recreation Tool\ADFSRapidRecreationTool.dll'`

`Get-AdfsSyncProperties` - Tells you whether you are using WID or SQL

3. Create backups using `Backup-ADFS` cmdlet

### Backup the AD FS configuration, with the DKM, to the File System, and has access to the DKM container contents (either domain admin or delegated)
Backup-ADFS -StorageType "FileSystem" -StoragePath "C:\Users\administrator\testExport\" -EncryptionPassword "password" -BackupComment "Clean Install of ADFS (FS)" -BackupDKM

