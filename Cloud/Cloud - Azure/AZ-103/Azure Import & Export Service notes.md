# Storage 
Azure Import/Export service supports the following types of storage accounts:

1. Standard General Purpose v2 storage accounts (recommended for most scenarios)
1. Blob Storage accounts
1. General Purpose v1 storage accounts (both Classic or Azure Resource Manager deployments)

# Misc
- a single import/export job cannot span across multiple storage accounts.

# Import Service
Supported:
- Azure Blob storage - Block Blobs and Page blobs supported
- Azure File storage	

# Export Service
Supported:
- BLOB storage only

Not supported:
- Azure File storage

# Disks - Supported
- SSD	2.5" -	SATA III
- HDD	2.5" or 3.5" - SATA II, SATA III

# Disks - Not Supported
- USBs.
- External HDD with built-in USB adaptor.
- Disks that are inside the casing of an external HDD.

# Limits
A single import/export job can have:
- A maximum of 10 HDD/SSDs.
- A mix of HDD/SSD of any size.
- Large number of drives can be spread across multiple jobs and there is no limits on the number of jobs that can be created. For import jobs, only the first data volume on the drive is processed. 
- The data volume must be formatted with NTFS.

When preparing hard drives and copying the data using the **WAImportExport tool**, you can use external USB adaptors. Most off-the-shelf USB 3.0 or later adaptors should work.

https://docs.microsoft.com/en-us/azure/storage/common/storage-import-export-requirements
