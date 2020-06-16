

# List all virtual networks in subscription
az network vnet list

# Sometimes that doesn't work - be more specific
az network vnet list --subscription "My subscription" --query "[].[name]" -o tsv
