
$scriptUrlBase = 'https://raw.githubusercontent.com/Microsoft/sql-server-samples/master/samples/manage/azure-sql-db-managed-instance/attach-jumpbox'

$parameters = @{
    subscriptionId = 'cd50637f-7488-4e4d-9cf6-6a19d84ba7ab'
    environmentName = 'AzureCloud'
    resourceGroupName = 'devuse2netrg'
    virtualMachineName = 'Jumpbox'
    virtualNetworkName = 'devuse2vnet01'
    subnetName = 'Management'
    administratorLogin  = 'ISNAdmin'
    administratorLoginPassword  = '<password>'
}

Invoke-Command -ScriptBlock ([Scriptblock]::Create((iwr ($scriptUrlBase+'/attachJumpbox.ps1?t='+ [DateTime]::Now.Ticks)).Content)) -ArgumentList $parameters, $scriptUrlBase
