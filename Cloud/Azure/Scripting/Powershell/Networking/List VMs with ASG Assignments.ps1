Clear-Host 
<#
    Variables are declared in a file named "Variables_<environment>.ps1"
#>

#region Setup
    # Step 1: nullify any existing variables from prior executions 
    $subscription_name = $null
    $rg_asgs = $null
    $location = $null

    # Load the variables from external file using "dot source" style execution
    #$path_to_variables = "$env:HOMEDRIVE$env:HOMEPATH\Downloads\Variables_Staging.ps1"
    $path_to_variables = "$env:HOMEDRIVE$env:HOMEPATH\Downloads\Variables_Prod.ps1"
    . $path_to_variables

    $variables_populated = $true;
    if($null -eq $subscription_name){
        Write-Error "Variable 'subscription_name' is null. This is a required parameter"
        $variables_populated = $false
    } elseif ($null -eq $rg_asgs) {
        Write-Error "Variable 'rg_asgs' is null. This is a required parameter"
        $variables_populated = $false
    } elseif ($null -eq $location) {
        Write-Error "Variable 'location' is null. This is a required parameter"
        $variables_populated = $false
    }
    
    if($false -eq $variables_populated){
        # Terminate execution of the script and force user to address/fix (exit closes the console; return just stops executing the script)
        return
    } else {
        Write-Host "Variables set:" -ForegroundColor Blue
        Write-Host "   - subscription_name: '$subscription_name'" -ForegroundColor Blue
        Write-Host "   - rg_asgs: '$rg_asgs'" -ForegroundColor Blue
        Write-Host "   - location: '$location'" -ForegroundColor Blue
    }
#endregion    

#region Step 1: Connect and use the correct subscription
    $context = (Get-AzContext -WarningAction SilentlyContinue | Select-Object -ExpandProperty Account)

    if($null -eq $context){Connect-AzAccount -WarningAction SilentlyContinue}

    #region Ensure correct subscription is selected
    $subscription = (Get-AzSubscription -WarningAction SilentlyContinue | Where-Object {$_.Name -eq $subscription_name}).Id
    Set-AzContext -SubscriptionId $subscription -WarningAction SilentlyContinue
    $context = (Get-AzContext -WarningAction SilentlyContinue | Select-Object -ExpandProperty Account)
    #endregion
#endregion

#region Step 2: Get all of the existing deployments/details
    $vms = Get-AzVM
    $attached_nics = Get-AzNetworkInterface | Where-Object {$null -ne $_.VirtualMachine.Id}
    # $publicIps = Get-AzPublicIpAddress
    # $asg_assignments = $attached_nics.IpConfigurations.ApplicationSecurityGroups.Id
    $asgs_existing = Get-AzApplicationSecurityGroup
    $vnet = Get-AzVirtualNetwork -ResourceGroupName $rg_vnet
    $subnets = Get-AzVirtualNetworkSubnetConfig -VirtualNetwork $vnet
#endregion

#region Step 3: Get VM details
    $vm_details = $null
    $vm_details = New-Object System.Data.DataTable "VMDetails"
    $vm_details.Columns.Add("Subscription") | Out-Null;
    $vm_details.Columns.Add("VM") | Out-Null;
    $vm_details.Columns.Add("Region") | Out-Null;
    $vm_details.Columns.Add("Priority") | Out-Null;
    $vm_details.Columns.Add("Size") | Out-Null;
    $vm_details.Columns.Add("Subnet") | Out-Null;
    $vm_details.Columns.Add("PrivateIpAddress") | Out-Null;
    $vm_details.Columns.Add("PrivateIpType") | Out-Null;
    $vm_details.Columns.Add("ASGs") | Out-Null;
    $vm_details.Columns.Add("NIC") | Out-Null;

    foreach($nic in $attached_nics){
        $vm = $vms | Where-Object -Property Id -eq $nic.VirtualMachine.id 

        $row = $vm_details.NewRow();
        $row.Subscription = $subscription_name
        $row.VM = $vm.Name
        $row.Region = $vm.Location
        $row.Subnet = ($subnets | Where-Object {$_.Id -eq $nic.IpConfigurations.Subnet.ID}).Name
        $row.PrivateIpAddress = $nic.IpConfigurations.PrivateIpAddress
        $row.PrivateIpType = $nic.IpConfigurations.PrivateIpAllocationMethod
        $row.NIC = $nic.Name

        $current_size = $vm.HardwareProfile.VmSize
        $split = $current_size -split '_', 2
        $row.Priority = $split[0]
        $row.Size = $split[1]
        
        $asg_list = @()
        foreach($id in $nic.IpConfigurations[0].ApplicationSecurityGroups.Id){
            $asg_list += ($asgs_existing | Where-Object {$_.Id -eq $id}).Name
        }
        $row.ASGs = $asg_list -join ", "

        $vm_details.Rows.Add($row);
        $row = $null
    }

    # $vm_details | Format-Table -AutoSize

    $vm_details | Export-Csv "$env:HOMEDRIVE$env:HOMEPATH\Desktop\$subscription_name - VM details.csv" -NoTypeInformation -Force
#endregion

#region Step 4: Get existing details
    $asg_details = $null
    $asg_details = New-Object System.Data.DataTable "ASGDetails"
    $asg_details.Columns.Add("Subscription") | Out-Null;
    $asg_details.Columns.Add("ASG") | Out-Null;
    $asg_details.Columns.Add("VM") | Out-Null;

    foreach ($vm in $vm_details) {
        foreach ($asg in $asgs_existing) {
            if($vm.ASGs -match $asg.Name){
                $row = $null
                $row = $asg_details.NewRow();
                $row.Subscription = $subscription_name
                $row.VM = $vm.VM
                $row.ASG = $asg.Name
                $asg_details.Rows.Add($row);
            }
        }
    }

    $asg_details | Export-Csv "$env:HOMEDRIVE$env:HOMEPATH\Desktop\$subscription_name - ASG details.csv" -NoTypeInformation -Force
#endregion
