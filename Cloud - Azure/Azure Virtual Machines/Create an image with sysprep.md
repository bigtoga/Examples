# Create an image of a VM in Azure
1. Create local admin account, place password in password manager
1. If VM is encrypted (Bitlocker), stop the VM, disable encryption, and wait for it to complete decryption process
2. Start the VM
3. Log on using local admin
4. Run `sysprep /generalize`
    - Not in path - have to cd C:\Windows\system32\Sysprep
    - Choose "Enter System Out-of-Box Experience (OOBE)"
    - Check the box for "Generalize"
    - Select "Shutdown" 
    - https://docs.microsoft.com/en-us/azure/virtual-machines/windows/capture-image-resource
    - https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation
5. Stop / Deallocate the VM
1. Mark the image as Generalized
    - `Set-AzVm -ResourceGroupName $rgName -Name $vmName -Generalized`
6. Create the image
    - Portal: Capture
    - Powershell: `New-AzImageConfig` and `New-AzImage`
    
https://docs.microsoft.com/en-us/azure/virtual-machines/windows/capture-image-resource    

```powershell

Clear-Host 

Connect-AzAccount
$non_prod_subscriptionId = "1234"
$context = Get-AzSubscription -SubscriptionId $non_prod_subscriptionId
Set-AzContext $context
Get-AzContext

#region Setup
    Set-StrictMode -Version 5.0 

#endregion

#region Naming
    $generalized_vmName = "myVM"
    $generalized_rgName = "rg-MyStuff"
    $generalized_location = "eastus2"

    # https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging
    $new_rgName = "rg-VMImages"
    $imageName = "Windows-2016-Image"
#endregion

#region Tagging    
    $tag_AppOrPlatform = "MyApp"
    $tag_Environment = "(All)"
    $tag_Function = "Windows 2016 Server Datacenter Edition"
    $tag_CreatedBy = "Scott Whigham"
    $tag_CreateDate = Get-Date
#endregion

#region 1. Get the VM
    $sourceVM = Get-AzVM `
       -Name $generalized_vmName `
       -ResourceGroupName $generalized_rgName 
#endregion

#region 2. Create or re-use resource group
    $exists = $true
    if(!(Get-AzResourceGroup -Name $new_rgName -Location $generalized_location -ErrorAction SilentlyContinue))
        {$exists = $false}

    if(!$exists){
        $resourceGroup = New-AzResourceGroup `
           -Name $new_rgName `
           -Location $generalized_location `
           -Tag @{App_or_Platform=$tag_AppOrPlatform; Environment=$tag_Environment; Function=$tag_Function; CreatedBy=$tag_CreatedBy; CreateDate=$tag_CreateDate} 
    }
            
#endregion

#region 3. Mark the VM as generalized
    Set-AzVm -ResourceGroupName $generalized_rgName -Name $generalized_vmName -Generalized

#endregion

#region 4. Create the image
    $image = New-AzImageConfig -Location $generalized_location -SourceVirtualMachineId $sourceVM.Id

    New-AzImage -Image $image -ImageName $imageName -ResourceGroupName $new_rgName
#endregion

```
