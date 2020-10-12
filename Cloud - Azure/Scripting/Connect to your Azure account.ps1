#region Connect
    Connect-AzAccount

    Get-AzTenant

    $subscription = (Get-AzSubscription | Where {$_.Name -eq "Azure Pass - Sponsorship"}).Id

    Set-AzContext -SubscriptionId $subscription

    $context = (Get-AzContext | Select -ExpandProperty Account)

#endregion
