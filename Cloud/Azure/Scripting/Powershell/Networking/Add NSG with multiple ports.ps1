Clear-Host

$ErrorActionPreference = "Stop"
Set-Item Env:\SuppressAzurePowerShellBreakingChangeWarnings "true"

$target_subscription_name   = "My Subscription"
$target_subscription_id     = (Get-AzSubscription | Where-Object {$_.Name -eq $target_subscription_name}).Id

#region Use the correct subscription
    Set-AzContext -Subscription $target_subscription_id -WarningAction 0 | Out-Null
    Get-AzContext
#endregion

$name_rg_nsg            = "rg-MyNetwork"
$name_nsg               = "nsg-my-rules"
$location               = "centralus"
$target_IP         = "192.168.1.1"

$nsg = Get-AzNetworkSecurityGroup -Name $name_nsg -ResourceGroupName $name_rg_nsg 

# You have to put multiple IPs in parentheses!
$nsg | Add-AzNetworkSecurityRuleConfig -Name "Allow_Someone_In" `
    -Direction                  Inbound `
    -Priority                   956 `
    -Protocol                   * `
    -SourcePortRange            * `
    -DestinationPortRange       (123,456) `
    -SourceAddressPrefix        $target_IP `
    -DestinationAddressPrefix   * `
    -Access Allow 

$nsg | Set-AzNetworkSecurityGroup 


