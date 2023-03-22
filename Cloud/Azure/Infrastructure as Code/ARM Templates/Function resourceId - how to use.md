


```json
        "resourceId_In_Same_RG":                "[resourceId('Microsoft.Network/virtualNetworks/subnets', parameters('name_vnet'), 'AzureFirewallSubnet')]"
        "resourceId_In_Same_RG":                "[resourceId('Microsoft.Network/publicIPPrefixes', parameters('pip_prefix_name'))]"

        "resourceId_In_Different_RG":           "[resourceId(parameters('name_rg'), 'Microsoft.Network/publicIPAddresses', parameters('name_pip'))]",        
        "resourceId_In_Different_RG":           "[resourceId(parameters('name_vnet_rg'), 'Microsoft.Network/virtualNetworks', parameters('name_vnet'))]",

        "resourceId_In_Different_Subscription":  "[resourceId('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', parameters('name_rg'), 'Microsoft.Network/publicIPAddresses', parameters('name_pip'))]", 
```        
