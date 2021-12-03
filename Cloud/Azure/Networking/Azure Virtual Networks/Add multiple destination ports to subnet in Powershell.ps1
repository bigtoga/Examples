# Use an array
        $ports_destination = (80, 443)
        
        $nsg | Add-AzNetworkSecurityRuleConfig -Name "Allow_Corporate_Office" `
        -Direction                  Inbound `
        -Priority                   125 `
        -Protocol                   "TCP" `
        -SourcePortRange            * `
        -DestinationPortRange       $ports_destination `
        -SourceAddressPrefix        $ipv4_Corporate_Office `
        -DestinationAddressPrefix   $subnet_range_local `
        -Access Allow
        
