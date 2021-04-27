Azure Data Migration Assistant (DMA) has one option: **online**
- Suitable for small databases only
- Limited by number of concurrent processes 

Azure Data Migration Services (DMS) has two options:
* Online = least downtime
* Offline = backup, copy, restore

If you are going from on-prem SQL to Azure SQL VM, must be offline
