1. Create storage account
  1. Disable public blobs
  1. Turn off public internet access
  1. Turn on vnet subnet access
  1. Enable your public IP if needed so that you can access
1. Create file share
  1. Get the URL - `storage_acct.file.core.windows.net`
1. Create private link for the file share
  1. Behind-the-scenes URL will be `storage_acct.privatelink.file.core.windows.net` but it will still resolve to public IP
  1. Tell it to create private DNS - it will create a new private DNS zone in Azure
  1. Go to **Configuration** and locate the private DNS IP
1. Go to Windows AD DNS and add A record for this to point to private DNS IP
  - Don't use a CNAME to the privatelink URL or the regular URL; has to be A record
1. Go back to the Azure File Share, click **Connect**, and copy the code - should look like this:

```powershell
# mystorage is the A record you created - make sure you can resolve to local IP:
$storage_account = "mystorage.mydomain.com"
Resolve-DnsName -Name $storage_account

# Create a credential and save the password so it will persist after reboot
cmd.exe /C "cmdkey /add:`"$storage_account`" /user:`"Azure\mystorageacctname`" /pass:`"123pnk9HK/3456Yz/456QDoqvJ2IEhnF/56324Y5V2CYA6GbKsx63zSUKcZaS/j7==`""

# Mount the drive
New-PSDrive -Name D -PSProvider FileSystem -Root "\\$storage_account\mysubfolder" -Persist
```
