

$disk_name = $vm + "_J_Drive"
az vm disk detach `
        --resource-group $resource_group `
        --vm-name $vm `
        --name $disk_name 


$disk_id=$(az disk show --resource-group $resource_group --name $disk_name --query 'id' -o tsv)
az disk delete --name $disk_name --resource-group $resource_group
