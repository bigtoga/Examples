Clear-Host 

<#
    What: Deploys ASGs into an environment and associates VM NICs to the ASG based on search pattern in VM name
    
    FAQs
        1) Will this add new ASGs to the environment? Yes, if they do not already exist
        2) Will this delete any existing ASGs? No, it will only add new ASGs that are not currently deployed
        3) Will this add new VM-to-ASG associations? Yes, it will add new associations if they are not already found
        4) Will this delete/update any VM-to-ASG associations? No, it will only add new associations that are not currently deployed
        5) How does it know which VMs need which ASGs? By the VM name
    
#>

<#
    Variables are declared in a file named "Variables_Prod.ps1"
#>

#region Setup
    # Step 1: nullify any existing variables from prior executions 
    $subscription_name = $null
    $rg_asgs = $null
    $location = $null
    $tag_AppOrPlatform = $null
    $tag_Environment = $null
    $tag_CreatedBy = $null
    $tag_CreateDate = $null

    # Load the variables from external file using "dot source" style execution
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
    } elseif ($null -eq $tag_AppOrPlatform) {
        Write-Error "Variable 'tag_AppOrPlatform' is null. This is a required parameter"
        $variables_populated = $false
    } elseif ($null -eq $tag_Environment) {
        Write-Error "Variable 'tag_Environment' is null. This is a required parameter"
        $variables_populated = $false
    } elseif ($null -eq $tag_CreatedBy) {
        Write-Error "Variable 'tag_CreatedBy' is null. This is a required parameter"
        $variables_populated = $false
    } elseif ($null -eq $tag_CreateDate) {
        Write-Error "Variable 'tag_CreateDate' is null. This is a required parameter"
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

<# 
    Step 1: Connect to the correct subscription
    Step 2: Get all of the existing deployments/details
    Step 3: Detail what ASGs should be/contain
    Step 4: Match VMs by name to the ASGs they should belong to
    Step 5: Create ASGs if needed
    Step 6: Add/update VM NICs to add/update to correct ASGs
    Step 6: Detail the ASG to subnet mapping w port, protocol
    Step 7: Add/update subnet rules to include ASGs
#>

#region Step 1: Connect and use the correct subscription
    $context = (Get-AzContext -WarningAction SilentlyContinue | Select-Object -ExpandProperty Account)

    if($null -eq $context){Connect-AzAccount -WarningAction SilentlyContinue}

    # Ensure correct subscription is selected
    $subscription = (Get-AzSubscription -WarningAction SilentlyContinue | Where-Object {$_.Name -eq $subscription_name}).Id
    Set-AzContext -SubscriptionId $subscription -WarningAction SilentlyContinue
    $context = (Get-AzContext -WarningAction SilentlyContinue | Select-Object -ExpandProperty Account)
#endregion

#region Step 2: Get all of the existing deployments/details
    $vnet = Get-AzVirtualNetwork
    $asgs_existing = Get-AzApplicationSecurityGroup
    $vms = Get-AzVM -Location $location
    $attached_nics = Get-AzNetworkInterface | Where-Object {$null -ne $_.VirtualMachine.Id}

    #region Get the ASG assignments for each NIC
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
    #endregion
#endregion

#region Step 3: Detail what ASGs should be/contain
    $asgs_desired = @(
        "asg-ASG-1" ,
        "asg-ASG-2" 
    )
    
    # Declare as variables to reduce copy/paste errors
    $asg_1 =                    $asgs_desired -match @("Windows") 
    $asg_2 =                    $asgs_desired -match @("Linux")

#endregion

#region Step 4: Match VMs by name to the ASGs they should belong to
    $map_vms_to_asgs = $null
    $map_vms_to_asgs = New-Object System.Data.DataTable "Mapping_VMs_to_ASGs"
    $map_vms_to_asgs.Columns.Add("Subscription") | Out-Null;
    $map_vms_to_asgs.Columns.Add("ASG_Name") | Out-Null;
    $map_vms_to_asgs.Columns.Add("VM_Name") | Out-Null;
    $map_vms_to_asgs.Columns.Add("NIC_ID") | Out-Null;

    # Local function for reusability
    function map_vm_to_asg{
        param( 
        [Parameter(Mandatory=$True)] 
        [string[]] $search_terms, 
            
        [Parameter(Mandatory=$True)] 
        [string] $asg_Name
        ) 
        
        foreach($search_term in $search_terms){
            $matching_vms = $vms | Where-Object {$_.Name -like "*$search_term*"}
            Write-Host "   - '$search_term' found $($matching_vms.Length) VMs" -ForegroundColor Blue

            foreach($match in $matching_vms){
                $this_vm = ($vms | Where-Object {$_.Name -eq $match.Name})
                $vm_id = $this_vm.Id
                $nic_id = ($attached_nics | Where-Object {$_.VirtualMachine.Id -eq $vm_id}).Id

                $row = $map_vms_to_asgs.NewRow();
                $row.Subscription = $subscription_name;
                $row.ASG_Name = $asg_Name;
                $row.VM_Name = $this_vm.Name
                $row.NIC_ID = $nic_id
                $map_vms_to_asgs.Rows.Add($row);
                $row = $null
            }
        }
    }

    Write-Host "VMs matching search terms:" -ForegroundColor Blue 
    foreach($desired_asg in $asgs_desired){
        switch($desired_asg){
            # Note - do not break after a match since a VM can belong to multiple ASGs
            
            $asg_1 {
                map_vm_to_asg -search_terms @("Windows") -asg_name $_
            }
            $asg_2 {
                map_vm_to_asg -search_terms @("Linux") -asg_name $_
            }
        }
    }
#endregion

#region Step 5: Create ASGs if needed
    foreach($desired_asg in $asgs_desired){
        $this_asg = Get-AzApplicationSecurityGroup -ResourceGroupName $rg_asgs -Name $desired_asg -ErrorAction SilentlyContinue

        # Will create the ASG if it does not existing in this RG 
        if($null -eq $this_asg){
            $this_asg = New-AzApplicationSecurityGroup -ResourceGroupName $rg_asgs -Name $desired_asg -Location $location `
                -Tag @{App_or_Platform=$tag_AppOrPlatform; Environment=$tag_Environment; CreatedBy=$tag_CreatedBy; CreateDate=$tag_CreateDate} -WhatIf
        }
    }
#endregion

#region Step 6: Add/update VM NICs to add/update to correct ASGs
    foreach ($mapping in $map_vms_to_asgs) {
        # If it already is mapped, skip
        $this_vm = $null
        $this_nic = $null
        $this_asg = $null

        $this_asg = Get-AzApplicationSecurityGroup -ResourceGroupName $rg_asgs -Name $mapping.ASG_Name
        $this_vm = $vms | Where-Object {$_.Name -eq $mapping.VM_Name}
        $this_nic = Get-AzNetworkInterface -ResourceId ($attached_nics | Where-Object {$_.VirtualMachine.Id -eq $this_vm.Id}).Id

        $associated_asgs = $this_nic.IpConfigurations.ApplicationSecurityGroups.Name

        # Only associate if it is not already associated
        if($this_asg.Name -notin $associated_asgs){
            Write-Host "$($this_vm.Name) - associated to $($this_asg.Name)" -ForegroundColor Green
            $this_nic.IpConfigurations[0].ApplicationSecurityGroups = $this_asg
            $this_nic | Set-AzNetworkInterface | Out-Null
        } else {
            Write-Host "$($this_vm.Name) - already associated to $($this_asg.Name)" -ForegroundColor DarkGreen
        }
    }
#endregion
