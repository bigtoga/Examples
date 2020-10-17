From this documentation: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription

# Step 1: Make sure the new subscription has the same resource providers registered

```powershell
clear-host 

#region Connect to Azure
    $context = (Get-AzContext | Select -ExpandProperty Account)

    if($context -eq $null){
        Connect-AzAccount    
    }
#endregion

#region Setup
    function ConnectToNewSubscription{
        $new_subscription = (Get-AzSubscription | Where {$_.Name -eq "Azure Pass - Sponsorship" -and $_.State -eq "Enabled"} -ErrorAction SilentlyContinue).Id

        Set-AzContext -SubscriptionId $new_subscription

        $context = (Get-AzContext | Select -ExpandProperty Account)

        WriteMessage -Message "Connected to $new_subscription" -Level 3;

        return;
    }
    function ConnectToOldSubscription{
        $old_subscription = (Get-AzSubscription | Where {$_.Name -eq "Azure Pass - Sponsorship" -and $_.State -eq "Warned"} -ErrorAction SilentlyContinue).Id

        Set-AzContext -SubscriptionId $old_subscription

        $context = (Get-AzContext | Select -ExpandProperty Account)

        WriteMessage -Message "Connected to $old_subscription" -Level 3;

        return;
    }
#endregion

#region Step 1: Make sure the new subscription has the same registered resource providers as the old one

    #region Get the resource providers 
        # Get old subscription's resource providers
        ConnectToOldSubscription
        $old_resource_providers = Get-AzResourceProvider -ListAvailable | Select-Object ProviderNamespace, RegistrationState | Sort-Object ProviderNamespace

        # New sub last so that you can remain "in context" of it for later
        ConnectToNewSubscription
        $new_resource_providers = Get-AzResourceProvider -ListAvailable | Select-Object ProviderNamespace, RegistrationState | Sort-Object ProviderNamespace
    #endregion 

    #region Create a custom object to report from 
        $final = @()

        foreach($old in $old_resource_providers){
            $new_value = ($new_resource_providers | Where {$_.ProviderNamespace -eq $old.ProviderNamespace}).RegistrationState
    
            $temp = New-Object -TypeName PSObject 
            $temp | Add-Member -MemberType NoteProperty -Name ProviderNamespace -Value $old.ProviderNamespace
            $temp | Add-Member -MemberType NoteProperty -Name Old -Value $old.RegistrationState
            $temp | Add-Member -MemberType NoteProperty -Name New -Value $new_value

            $final += $temp
        }
    #endregion

    #region Report on what is missing in the new subscription
        $fix_these = $final | Where {$_.New -ne $_.Old} | Sort-Object ProviderNamespace 

        Write-Host "These providers will be registered in the new subscription: "
        $fix_these
    #endregion

    #region Add the needed providers
        foreach($provider in $fix_these){
            Register-AzResourceProvider -ProviderNamespace $provider.ProviderNamespace | Out-Null
            Write-Host "   - registered $provider.ProviderNamespace" -ForegroundColor Gray
        }
    
    #endregion

    Write-Host "New subscription is updated to have all the same resource providers" -ForegroundColor Green

#endregion


```
