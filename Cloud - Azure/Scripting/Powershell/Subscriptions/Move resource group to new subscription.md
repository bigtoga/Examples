Note - this can totally be done all from the portal...
1. Go to the old subscription
2. Go to the resource group
3. Click Move
4. Validate

From this documentation: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription

<details>
    <summary>Step 1: Make sure the new subscription has the same resource providers registered</summary>
    
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
</details>

<details>
    <summary>Step 2: Validate the move with REST API</summary>
    
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

#region Variables
    # https://docs.microsoft.com/en-us/rest/api/azure/#acquire-an-access-token

    $tenantId = (Get-AzTenant | Where {$_.Name -eq "Default Directory"}).Id
    $clientId = "a6caff90-4717-40a6-9849-acc10e1652cb" # App Registration -> Register new app -> Give it permissions -> Create a secret -> Enter the Application ID (a.k.a. the client ID)
    $clientSecret = "Sd_9r2b3Y4_Iv~Rg47x5r2Z.W9g~aTIu2L" # Enter Client Secret.
    $resource = "https://management.core.windows.net/"
    $subscriptionId = (Get-AzContext).Subscription.Id

    $resource_group_name = "sqltest"

#endregion

#region Step 1: Request an access token (a.k.a. a bearer token)
    ConnectToOldSubscription

    $requestAccessTokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/token"

    $body = "grant_type=client_credentials&client_id=$clientId&client_secret=$clientSecret&resource=$resource"

    $token = Invoke-RestMethod -Method Post -Uri $requestAccessTokenUri -Body $body -ContentType 'application/x-www-form-urlencoded'

    Write-Host ""
    Write-Host "Connected!" -ForegroundColor Green
    Write-Output $token
#endregion

#region Step 2: View the resource groups in the old subscription (just to make sure)
    $resourceGroupApiUri = "https://management.azure.com/subscriptions/$SubscriptionId/resourcegroups?api-version=2017-05-10"

    $headers = @{}

    $headers.Add("Authorization","$($token.token_type) "+ " " + "$($token.access_token)")

    $resourceGroups = Invoke-RestMethod -Method Get -Uri $resourceGroupApiUri -Headers $headers

    Write-Output $resourceGroups
#endregion

#region Step 3: Validate the move operation
    $post_url = "https://management.azure.com/subscriptions/$subscriptionId/resourceGroups/$resource_group_name/validateMoveResources?api-version=2019-05-10"

    $headers = @{}

    $headers.Add("Authorization","$($token.token_type) "+ " " + "$($token.access_token)")

    $resourceGroups = Invoke-RestMethod -Method Get -Uri $resourceGroupApiUri -Headers $headers

    Write-Output $resourceGroups
#endregion
```
</details>
