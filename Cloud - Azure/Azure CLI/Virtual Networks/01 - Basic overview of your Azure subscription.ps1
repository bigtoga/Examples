

# List all virtual networks in subscription
az network vnet list

# Sometimes that doesn't work - be more specific
$subscription = "My subscription"
az network vnet list --subscription $subscription --query "[].[name]" -o tsv

az network vnet list --subscription $subscription --query "[0].{vnet:name, cidr_Range:addressSpace.addressPrefixes[0]}" -o table
