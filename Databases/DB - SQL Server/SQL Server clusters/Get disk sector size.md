[Sector sizes supported by SQL Server](https://support.microsoft.com/en-us/topic/hard-disk-drive-sector-size-support-boundaries-in-sql-server-4d5b73fa-7dc4-1d8a-2735-556e6b60d046)
- 512 bytes
- 4,096 KB (4K)

To view the current drive's sector sizes: 
- `diskpart` followed by `select volume <VolumeNumber>` and then enter `filesystems` - *
- `fsutil fsinfo ntfsinfo [your drive]` - *Bytes Per Cluster is the equivalent of the allocation unit*
- `fsutil fsinfo sectorinfo`
- `Get-Disk` in PowerShell

You can do this a more "fun" way also: 
1. Create a new text file anywhere on the drive in question
2. Add 1 character to the file
3. **Right-click** on the file, go to **Properties** - the `Size on disk` = the drive's allocation unit
