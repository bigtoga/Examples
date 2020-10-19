
#region Connect
    $context = (Get-AzContext | Select -ExpandProperty Account)

    if($context -eq $null){
        Connect-AzAccount    

        $subscription = (Get-AzSubscription | Where {$_.Name -eq "Azure Pass - Sponsorship"}).Id

        Set-AzContext -SubscriptionId $subscription

        $context = (Get-AzContext | Select -ExpandProperty Account)

        WriteMessage -Message "Connected!" -Level 3;
    }
#endregion
