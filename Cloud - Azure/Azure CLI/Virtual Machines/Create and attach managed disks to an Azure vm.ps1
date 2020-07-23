
# Attach only
$disk_name = $vm + "_Integration"
$disk_size_gb = 128
$disk_id=$(az disk show --resource-group $resource_group --name $disk_name --query 'id' -o tsv)
az vm disk attach --vm-name $vm --ids $disk_id

Clear-Host 

Clear-Host 

#region Login & setup
    $tenant_id = <your tenant id>
    az login --tenant $tenant_id

    # az account list --output table

    $non_prod_subscriptionId = <your subscription id>

    $resource_group = "myRG"
    $vm = "myVM"

    az vm stop --resource-group $resource_group --name $vm
    az vm deallocate --resource-group $resource_group --name $vm

    $all_disks_location = "eastus2"
    $all_disks_sku = "Premium_LRS"
    $all_disks_os_type = "Windows"
    $all_disks_max_shares = 1
    $all_disks_encryption_type = "EncryptionAtRestWithPlatformKey"

    $sep = "*" * 100
#endregion

#region SQLData1
    $disk_name = $vm + "_Data1"
    $disk_size_gb = 8192

    Write-Host $sep -ForegroundColor Gray
    Write-Host $vm -ForegroundColor Gray
    Write-Host "`t-  disk name: $disk_name" -ForegroundColor Gray
    Write-Host "`t- size in GB: $disk_size_gb" -ForegroundColor Gray
    Write-Host "`n`t... creating the disk and attaching to the vm" -ForegroundColor Gray

    # Create and attach all in one step
    az vm disk attach `
        --resource-group $resource_group `
        --vm-name $vm `
        --name disk_name `
        --size-gb disk_size_gb `
        --sku $all_disks_sku `
        --location $all_disks_location `
        --max-shares $all_disks_max_shares `
        --encryption-type $all_disks_encryption_type `
        --new

    Write-Host "`t$disk_name created and attached to $vm" -ForegroundColor Green    
    Write-Host $sep -ForegroundColor Gray
#endregion
