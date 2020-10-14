Install-ADDSForest –DomainName "myforest.com"

Install-ADDSDomain -Credential (Get-Credential CORP\EnterpriseAdmin1) -NewDomainName child -ParentDomainName "corp.contoso.com" -InstallDNS -CreateDNSDelegation -DomainMode Win2003 -ReplicationSourceDC "DC1.corp.contoso.com" -SiteName "Houston" -DatabasePath "D:\NTDS" -SYSVOLPath "D:\SYSVOL" -LogPath "E:\Logs" -NoRebootOnCompletion
