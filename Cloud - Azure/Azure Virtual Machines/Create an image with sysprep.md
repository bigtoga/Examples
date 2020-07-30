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
