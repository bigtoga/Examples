https://docs.microsoft.com/en-us/azure/backup/backup-azure-restore-files-from-vm

1. Azure Portal -> VM blade
1. Backups -> click **File Recovery**
1. Select the recovery point
1. Enter a password for the executable, then **Download** the script to browse/recover the files
1. Make sure you have the right machine - https://docs.microsoft.com/en-us/azure/backup/backup-azure-restore-files-from-vm#selecting-the-right-machine-to-run-the-script
   - You may have to initiate the restore on / from another VM
1. Run the downloaded executable, enter the password
1. Behind the scenes, the script will mount the volume + recovery point and assign a drive letter
1. Use Windows Explorer / File Explorer to copy/recover the files you need
1. Unmount / remove the drives - Portal -> File Recovery -> **Unmount Disks**
