az group list --query "[?starts_with(name,'AADesignLab09')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
