#1 Install node.js dev server from https://nodejs.org/en/

#2: Launch git bash in the folder you have the template file

where az

az login

alias az=az.cmd

# cd to the folder that has the template files:
cd /g/

FOLDER="G:\\Google Drive - Scott\\Github\\bigtoga\\Examples\\Azure\\AZ-301\\AZ-301 Labs\\allfiles\\AZ-301T03\\Module_01\\Labfiles\\Starter"

cd $FOLDER 

# Install Azure build blocks npm package
mkdir ~/.npm-global

# Update npm to use the new directory
npm config set prefix '~/.npm-global'

# Open the bash config file for editing (with vim):
vi ~/.bashrc

# Export 
export PATH="$HOME/.npm-global/bin:$PATH"

# Install the Azure building blocks
npm install -g @mspnp/azure-building-blocks

# Clone git repo:
git clone https://github.com/mspnp/template-building-blocks.git

cat ./template-building-blocks/scenarios/vnet/vnet-simple.json

SUBSCRIPTION_ID=$(az account list --query "[0].id" | tr -d '"')

# Create new resource group
RESOURCE_GROUP='AADesignLab0202-RG'
LOCATION='eastus'
az group create --name $RESOURCE_GROUP --location $LOCATION

# Deploy the building blocks:
azbb -g $RESOURCE_GROUP -s $SUBSCRIPTION_ID -l $LOCATION -p ./template-building-blocks/scenarios/vnet/vnet-simple.json --deploy
