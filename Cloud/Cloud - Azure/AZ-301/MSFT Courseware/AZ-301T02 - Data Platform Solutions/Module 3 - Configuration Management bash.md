where az

az login

alias az=az.cmd

# Create new resource group
RESOURCE_GROUP='AADesignLab1202-RG'
LOCATION='eastus'
az group create --name $RESOURCE_GROUP --location $LOCATION

# Deploy a new VM using a template
FOLDER="G:\\Google Drive - Scott\\Github\\bigtoga\\Examples\\Azure\\AZ-301\\AZ-301 Labs\\allfiles\\AZ-301T02\\Module_03\\LabFiles\\Starter\\"
TEMPLATE="linux-template.json"
FILE=$FOLDER$TEMPLATE
notepad "$FILE" # works!

# This fails - "C:\Program is not recognized as an internal or external command..."
az group deployment create --resource-group $RESOURCE_GROUP --template-file "$FILE" --parameters password=Pa55w.rd1234

# Instead, cd to the folder that has the template files:
cd /g/
cd $FOLDER 
az group deployment create --resource-group $RESOURCE_GROUP --template-file $TEMPLATE --parameters password=Pa55w.rd1234

az group list --query "[?starts_with(name,'AADesignLab12')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
