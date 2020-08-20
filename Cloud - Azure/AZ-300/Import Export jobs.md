Step 1: Attach an external disk to Server1 and then run waimportexport.exe
- Determine data to be imported, number of drives you need, destination blob location for your data in Azure storage.
- Use the **WAImportExport tool** to copy data to disk drives. Encrypt the disk drives with BitLocker.

Step 2: From the Azure portal, create an import job.
- Create an import job in your target storage account in Azure portal. Upload the drive journal files.

Step 3: Detach the external disks from Server1 and ship the disks to an Azure data center.
- Provide the return address and carrier account number for shipping the drives back to you.
- Ship the disk drives to the shipping address provided during job creation.

Step 4: From the Azure portal, update the import job
- Update the delivery tracking number in the import job details and submit the import job.
- The drives are received and processed at the Azure data center.
- The drives are shipped using your carrier account to the return address provided in the import job