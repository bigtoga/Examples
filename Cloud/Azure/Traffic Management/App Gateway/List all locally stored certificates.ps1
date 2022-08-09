<#
    Returns any certificates that are NOT in the Key Vault
#>
Clear-Host

$ErrorActionPreference = "Stop"

#region Variables
    $resource_type = "Microsoft.Network/applicationGateways"

    $subscriptions_to_check = @(
        "Subscription1"
        , "Subscription2"
        , "Subscription3"
    )
#endregion

#region Setup
    $p7b = New-Object System.Security.Cryptography.Pkcs.SignedCms

    $AppGateways = New-Object System.Data.DataTable "AppGateways"
    $AppGateways.Columns.Add("Subscription")       | Out-Null;
    $AppGateways.Columns.Add("AppGateway")         | Out-Null;
    $AppGateways.Columns.Add("Location")           | Out-Null;
    $AppGateways.Columns.Add("ResourceGroupName")  | Out-Null;
    
    $Sites = New-Object System.Data.DataTable "Certificates"
    $Sites.Columns.Add("Subscription")       | Out-Null;
    $Sites.Columns.Add("AppGateway")         | Out-Null;
    $Sites.Columns.Add("Location")           | Out-Null;
    $Sites.Columns.Add("Listener")           | Out-Null;
    $Sites.Columns.Add("HostName")           | Out-Null; # Only for single websites!
    $Sites.Columns.Add("Certificate")        | Out-Null;
    $Sites.Columns.Add("IsInKeyVault")       | Out-Null;
    $Sites.Columns.Add("Certificate")        | Out-Null;
    $Sites.Columns.Add("Thumbprint")         | Out-Null;
    $Sites.Columns.Add("Expires")            | Out-Null;
    $Sites.Columns.Add("KeyVaultSecretId")   | Out-Null;
    $Sites.Columns.Add("KeyVaultName")       | Out-Null;
#endregion

$subscriptions = Get-AzSubscription

foreach($sub in $subscriptions){
    if($sub.Name -notin $subscriptions_to_check){
        Write-Host "$($sub.Name) - skipped..." -ForegroundColor Gray
        continue;
    }

    #region 1. Use the right subscription
        $target_subscription_id     = (Get-AzSubscription | Where-Object {$_.Name -eq $sub.Name}).Id
        Set-AzContext -Subscription $target_subscription_id -WarningAction 0 | Out-Null
    #endregion

    #region 2. Get App GWs in subscription
        $temp  = Get-AzResource -ResourceType $resource_type

        # 2a: Get the App GW details
        foreach($appgw in $temp){
            $row                    = $AppGateways.NewRow();
            $row.Subscription       = $sub.Name
            $row.AppGateway         = $appgw.Name
            $row.Location           = $appgw.Location
            $row.ResourceGroupName  = $appgw.ResourceGroupName
            $AppGateways.Rows.Add($row); 

            #2b: Get the listeners for each AGW
            $obj_agw    = Get-AzApplicationGateway -Name $appgw.Name -ResourceGroupName $appgw.ResourceGroupName
            $listeners  = Get-AzApplicationGatewayHttpListener -ApplicationGateway $obj_agw | Where-Object {$_.Protocol -eq "Https"}
            
            # 2c: Get the certs
            foreach($listener in $listeners){
                $row                = $Sites.NewRow();
                $row.Subscription   = $sub.Name
                $row.AppGateway     = $obj_agw.Name
                $row.Location       = $obj_agw.Location
                $row.Listener       = $listener.Name
                $row.HostName       = $listener.HostName
                
                #region Get the cert name (the last value in the URL)
                    $row.Certificate    = $listener.SslCertificate.Id.Split("/")[-1]
        
                    $cert = Get-AzApplicationGatewaySslCertificate -ApplicationGateway $obj_agw -Name $row.Certificate

                    $is_in_key_vault    = (&{if($cert.KeyVaultSecretId -eq $null) {$false} else {$true}})
                    $row.IsInKeyVault   = $is_in_key_vault
            
                    if(!$is_in_key_vault){
                        $certBytes      = [Convert]::FromBase64String($cert.PublicCertData)
                        $p7b.Decode($certBytes)
                        $x509           = $p7b.Certificates[0]
                        $row.Thumbprint = $x509.Thumbprint;
                        $row.Expires    = $x509.NotAfter;
                    }
                    else {
                        # Cert is in Key Vault
                        $row.KeyVaultSecretId   = $cert.KeyVaultSecretId
                        $row.KeyVaultName       = $cert.KeyVaultSecretId.ToString().Substring(8, ($cert.KeyVaultSecretId.IndexOf(".")-8))
                    }
                #endregion
        
                $Sites.Rows.Add($row); 
            }
        }
    #endregion
}
$AppGateways | Sort-Object Subscription, AppGateway | Format-Table
$Sites | Where-Object {$_.IsInKeyVault -eq $false} | Select-Object Subscription, AppGateway, Location, Certificate, Expires | Format-Table
