
Get-AzNetworkInterface -ResourceGroupName sqltest | Where {$_.VirtualMachine -eq $null} | Remove-AzNetworkInterface -WhatIf 
