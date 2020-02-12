# the lab says to upload .json file and run New-AzResourceGroupDeployment -ResourceGroupName $rg2.ResourceGroupName -TemplateFile "./az-100-04b_01_azuredeploy.json" -TemplateParameterFile "./az-100-04_azuredeploy.parameters.json" -AsJob

# I want to reference raw github file
$location = "eastus"
$rg1 = Net-AzResourceGroup -Name 'az1000401-RG' -Location $location

$raw_deploy_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_05/VNet_Peering_and_Service_Chaining/az-100-04_01_azuredeploy.json"
$raw_params_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_05/VNet_Peering_and_Service_Chaining/az-100-04_azuredeploy.parameters.json"

# Use "TemplateUri" and "TemplateParameterUri" when you want to deploy from https
New-AzResourceGroupDeployment -ResourceGroupName $rg1.ResourceGroupName -TemplateUri $raw_deploy_file `
  -TemplateParameterUri $raw_params_file -AsJob

# Azure CLI: az group deployment create -g arm-template --template-uri $raw_deploy_file --parameters $raw_params_file

