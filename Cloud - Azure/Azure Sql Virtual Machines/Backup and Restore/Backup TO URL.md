
https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/sql-server-backup-to-url

>  SQL Server backup can use either blob type depending upon the Transact-SQL syntax used: If the storage key is used in the credential, page blob will be used; if the Shared Access Signature is used, block blob will be used.

Backup to block blob is only available in SQL Server 2016 or later version. Backup to block blob instead of page blob if you are running SQL Server 2016 or later.
