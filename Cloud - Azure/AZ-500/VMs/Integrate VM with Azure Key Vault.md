```shell

# Create a new system assigned identity:
az vm identity assign -name myVM --resource-group myRG

$identity = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Give the identity permissions to access the key vault
az keyvault set-policy -name myPolicy -object-id $identity --secret-permissions get list
