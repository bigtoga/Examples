https://docs.microsoft.com/en-us/azure/backup/backup-azure-restore-files-from-vm

# Scenarios requiring you to run the restore script/executable on/from a different VM
- If the VM uses Windows Storage Spaces
- If the VM is a **large disk VM** (16+ disks on a VM or a VM with each disk > 4TB in size)

# Normal "not large" VMs/disks - notes 
- File recovery process attaches **all** disks from the backup when you run the executable
- File recovery has a "significant impact" on the VM itself

# Large disk VMs - notes
- Keep a separate restore server (Azure VM D2v3 VMs) for file recovery. You can use that only for file recovery and then shut it down when not required. 
- Restoring on the original machine isn't recommended since it will have significant impact on the VM itself

# Basic steps for small/normal disk and file recovery
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

# If your volume is a "large disk" (16+ disks or 4TB+)
https://docs.microsoft.com/en-us/azure/backup/backup-azure-restore-files-from-vm#file-recovery-from-virtual-machine-backups-having-large-disks


# If you want to restore files from one machine's backup on to a different machine
