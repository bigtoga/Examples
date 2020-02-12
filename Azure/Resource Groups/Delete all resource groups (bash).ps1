# Help!
az group list --help

# List all
az group list --output table

# Delete a subset
az group list --query "[?starts_with(name,'AADesignLab09')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'

# Delete all!
az group list --output tsv | select -p name | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
