$rg = "rg1"
$appgw_name = "appgw1"

$appgw = Get-AzApplicationGateway -ResourceGroupName $rg -Name $appgw_name

Stop-AzApplicationGateway -ApplicationGateway $appgw

Start-AzApplicationGateway -ApplicationGateway $appgw
