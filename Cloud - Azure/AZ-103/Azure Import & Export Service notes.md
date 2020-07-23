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

https://docs.microsoft.com/en-us/azure/storage/common/storage-import-export-requirements
