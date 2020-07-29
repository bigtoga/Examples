
	
How to find storage accounts that might be exposed on public internet
		
# If you find one with DefaultAction "Allow" and no IpRules and / or no VirtualNetworkRules, bingo		
`Get-AzStorageAccountNetworkRuleSet -ResourceGroupName myRG -Name myStorageAccount 
