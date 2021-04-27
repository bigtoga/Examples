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
RESOURCE_GROUP='rgScott'

# Alternate:
RESOURCE_GROUP=$(az resource list --query "[0].resourceGroup" --output tsv)

echo $RESOURCE_GROUP
