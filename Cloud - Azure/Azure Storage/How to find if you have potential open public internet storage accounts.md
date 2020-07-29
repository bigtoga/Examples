
	
How to find storage accounts that might be exposed on public internet
		
# If you find one with DefaultAction "Allow" and no IpRules and / or no VirtualNetworkRules, bingo		
`Get-AzStorageAccountNetworkRuleSet -ResourceGroupName myRG -Name myStorageAccount`

```powershell

$arr = @()
Get-AzStorageAccount | % {
    $rg = $_.ResourceGroupName
    $sa = $_.StorageAccountName
    $obj = New-Object PSObject
    $obj | Add-Member NoteProperty ResourceGroup $rg
    $obj | Add-Member NoteProperty Name $sa
    $obj | Add-Member NoteProperty HttpsOnly $_.EnableHttpsTrafficOnly
    $obj | Add-Member NoteProperty Kind $_.Kind
  
    $arr += $obj

    $rules = Get-AzStorageAccountNetworkRuleSet -ResourceGroupName $_.ResourceGroupName -Name $_.StorageAccountName

    if($rules.VirtualNetworkRules -notcontains "Microsoft.Network/virtualNetworks"){
        Write-Host "$sa ($rg) has public internet access enabled" -ForegroundColor Yellow
    }
  }
$arr | ft -auto
```
