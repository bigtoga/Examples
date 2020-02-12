# the lab says to upload .json file and run New-AzResourceGroupDeployment -ResourceGroupName $rg2.ResourceGroupName -TemplateFile "./az-100-04b_01_azuredeploy.json" -TemplateParameterFile "./az-100-04_azuredeploy.parameters.json" -AsJob

# I want to reference raw github file
$location = "eastus"
$rg1 = New-AzResourceGroup -Name 'az1010301b-RG' -Location $location

$raw_deploy_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_06/Network_Watcher/az-101-03b_01_azuredeploy.json"
$raw_params_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_06/Network_Watcher/az-101-03b_01_azuredeploy.json"

# Use "TemplateUri" and "TemplateParameterUri" when you want to deploy from https
New-AzResourceGroupDeployment -ResourceGroupName $rg1.ResourceGroupName -TemplateUri $raw_deploy_file `
  -TemplateParameterUri $raw_params_file -AsJob

# 2nd deployment
$raw_deploy_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_06/Network_Watcher/az-101-03b_02_azuredeploy.json"
$raw_params_file = "https://raw.githubusercontent.com/MicrosoftLearning/AZ-103-MicrosoftAzureAdministrator/master/Allfiles/Labfiles/Module_06/Network_Watcher/az-101-03b_02_azuredeploy.parameters.json"

$rg2 = New-AzResourceGroup -Name 'az1010302b-RG' -Location $location
New-AzResourceGroupDeployment -ResourceGroupName $rg2.ResourceGroupName -TemplateUri $raw_deploy_file `
  -TemplateParameterUri $raw_params_file -AsJob
