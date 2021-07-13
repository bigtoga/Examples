<#
   Step 1: Create a storage account
   Step 2: Create a folder
   Step 3: Upload a Powershell script
   Step 4: Set-AzVMCustomScriptExtension

#>

#region Connect
    $context = (Get-AzContext | Select -ExpandProperty Account)

    if($context -eq $null){
        Connect-AzAccount    

        $subscription = (Get-AzSubscription | Where {$_.Name -eq "ISN NonProduction"}).Id

        Set-AzContext -SubscriptionId $subscription

        $context = (Get-AzContext | Select -ExpandProperty Account)

        WriteMessage -Message "Connected!" -Level 3;
    }
#endregion


$storage_acct_key = "my_key"
	
Set-AzVMCustomScriptExtension -ResourceGroupName "rg-my-stuff" -Location "East US 2" `
	-VMName "myvm" -Name "Install custom agents" `
	-TypeHandlerVersion "1.1" `
    -StorageAccountName "my-storage-acct" `
	  -StorageAccountKey $storage_acct_key `
    -ContainerName "vm-custom-extensions" `
    -FileName "VMExtensions\Powershell\Install-Agents.ps1"
