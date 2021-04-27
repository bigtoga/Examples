### Steps
1. New RG
2. New AKV
3. New secret, thirdPartySecret
4. Bash:

~~~
# Is Azure CLI installed and available to bash?
where az 
where az.cmd 

# If not, install Azure CLI

# Then set alias:
alias az=az.cmd 

# Login!
# Will open browser and ask you to log in to the Azure portal
az login

# Define variables
RESOURCE_GROUP='asdgasdg'

# Alternate:
RESOURCE_GROUP=$(az resource list --query "[0].resourceGroup" --output tsv)
KEY_VAULT_NAME=$(az keyvault list --resource-group $RESOURCE_GROUP --query "[0].name" --output tsv)
echo $RESOURCE_GROUP

# List secrets in the key vault:
az keyvault secret list --vault-name $KEY_VAULT_NAME --output json

# List the secret's value:
az keyvault secret show --vault-name $KEY_VAULT_NAME --name thirdPartyKey --query value --output tsv

# Add a new secret
az keyvault secret set --vault-name $KEY_VAULT_NAME --name firstPartyKey --value 56f8a55119845511c81de488

# List the secrets again
az keyvault secret list --vault-name $KEY_VAULT_NAME --query "[*].{Id:id,Created:attributes.created}" --out table

# Get the ID
KEY_VAULT_ID=$(az keyvault list --resource-group $RESOURCE_GROUP --query "[0].id" --output tsv)
echo $KEY_VAULT_ID

# Escape the URL/path w regex:
KEY_VAULT_ID_REGEX="$(echo $KEY_VAULT_ID | sed -e 's/\\/\\\\/g; s/\//\\\//g; s/&/\\\&/g')"
echo $KEY_VAULT_ID_REGEX

# Copy the files from the lab folder to the current working directory
#    - Cloud Shell - upload the files 
#    - local shell - cd to the folder w the files

# Look at the template parameters - we're about to make changes:
cat vm-template.parameters.json

# Open the template parameters file, and replace the parameters with the values you need
sed -i.bak1 's/"$KEY_VAULT_ID"/"'"$KEY_VAULT_ID_REGEX"'"/' vm-template.parameters.json

# Look at the changes and verify evertything is okay
cat vm-template.parameters.json

# Deploy your new vm from a template:
az group deployment create --resource-group $RESOURCE_GROUP --template-file vm-template.json --parameters @vm-template.parameters.json

# After the deployment has completed, verify it:
PUBLIC_IP=$(az network public-ip list --resource-group $RESOURCE_GROUP --query "[0].ipAddress" --output tsv)

# List the vm password (secret):
az keyvault secret show --vault-name $KEY_VAULT_NAME --name vmPassword --query value --output tsv
ssh Student@$PUBLIC_IP

# Verify the RG you want to remove:
az group list --query "[?starts_with(name,'AADesignLab09')]".name --output tsv

# Now delete all:
az group list --query "[?starts_with(name,'AADesignLab09')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'

~~~

