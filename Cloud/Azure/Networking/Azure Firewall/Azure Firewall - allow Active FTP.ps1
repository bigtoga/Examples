$azFw = Get-AzFirewall -Name "fw-mine" -ResourceGroupName "rg-Mine"
$azFw.AllowActiveFTP = $true

$azFw | Set-AzFirewall
