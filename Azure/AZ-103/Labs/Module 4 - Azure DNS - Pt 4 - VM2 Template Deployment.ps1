# the lab says to upload .json file and run New-AzResourceGroupDeployment -ResourceGroupName $rg2.ResourceGroupName -TemplateFile "./az-100-04b_01_azuredeploy.json" -TemplateParameterFile "./az-100-04_azuredeploy.parameters.json" -AsJob

# I want to reference raw github file

$raw_deploy_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_04/Configure_Azure_DNS/az-100-04b_02_azuredeploy.json"
$raw_params_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_04/Configure_Azure_DNS/az-100-04_azuredeploy.parameters.json"

# Use "TemplateUri" and "TemplateParameterUri" when you want to deploy from https
New-AzResourceGroupDeployment -ResourceGroupName $rg2.ResourceGroupName -TemplateUri $raw_deploy_file `
  -TemplateParameterUri $raw_params_file -AsJob
  
# Azure CLI: az group deployment create -g arm-template --template-uri $raw_deploy_file --parameters $raw_params_file
