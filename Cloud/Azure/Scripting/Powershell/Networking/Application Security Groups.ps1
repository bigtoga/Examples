Clear-Host 

# Application Security Groups

<#
    Variables are declared in a file named "variables.ps1"
#>

# Load the variables from external file
$path_to_variables = "$env:HOMEDRIVE$env:HOMEPATH\Downloads\variables.ps1"
. $path_to_variables

#region Step 1: Connect and use the correct subscription
    $context = (Get-AzContext | Select-Object -ExpandProperty Account)

    if($null -eq $context){
        Connect-AzAccount    

        $subscription = (Get-AzSubscription | Where-Object {$_.Name -eq $subscription_name}).Id

        Set-AzContext -SubscriptionId $subscription

        $context = (Get-AzContext | Select-Object -ExpandProperty Account)

        Write-Host "Connected!" -ForegroundColor Green;
    }
#endregion

#region Step 2: Get all VMs in the current subscription
    $vms = Get-AzVM -Location $location

    Write-Host "The following VMs are in scope: "

    $vms | Select-Object Name | Sort-Object Name | Format-Table -AutoSize
#endregion

<# 
    Subnet list
    ASG list
    Which VMs belong in each ASG
    Which subnets the ASG should be bound to
    For each VM:
        1. Get it's active NIC
        2. Find out which ASGs it should belong
        3. Loop through each ASG it should be in
            3a. Test to see if it already belongs - if yes, continue, else add to ASG
#>

$asg = Get-AzApplicationSecurityGroup -ResourceGroupName $rg_asgs -Name $asg_name -ErrorAction SilentlyContinue

if($null -eq $asg){
    $asg = New-AzApplicationSecurityGroup -ResourceGroupName $rg_asgs -Name $asg_name -Location $location
}

$vmNic = Get-AzNetworkInterface -Name vm-nic01 -ResourceGroupName resourceGroup01
$vmNic.IpConfigurations[0].ApplicationSecurityGroups = $appAsg
$vmNic | Set-AzNetworkInterface