[Sector sizes supported by SQL Server](https://support.microsoft.com/en-us/topic/hard-disk-drive-sector-size-support-boundaries-in-sql-server-4d5b73fa-7dc4-1d8a-2735-556e6b60d046)
- 512 bytes
- 4,096 KB (4K)
- 64k

Long story short as per [this Azure VM checklist from MSFT](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/performance-guidelines-best-practices-checklist#storage)
- Data files should be on 64k sectors
- tempdb should be local and on default 4k

To view the current drive's sector sizes: 
- `diskpart` followed by `select volume <VolumeNumber>` and then enter `filesystems` - *
- `fsutil fsinfo ntfsinfo [your drive]` - *Bytes Per Cluster is the equivalent of the allocation unit*
- `fsutil fsinfo sectorinfo`
- `Get-Disk` in PowerShell

You can do this a more "fun" way also: 
1. Create a new text file anywhere on the drive in question
2. Add 1 character to the file
3. **Right-click** on the file, go to **Properties** - the `Size on disk` = the drive's allocation unit
