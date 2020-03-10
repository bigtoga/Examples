# Create A Windows Custom Image Managed Disk

Steps:

1. Create the Windows VM using the [Azure Portal](https://docs.microsoft.com/azure/virtual-machines/windows/quick-create-portal) or [PowerShell](https://docs.microsoft.com/azure/virtual-machines/windows/quick-create-powershell) or [Azure CLI](https://docs.microsoft.com/azure/virtual-machines/windows/quick-create-cli).

2. [Connect](https://docs.microsoft.com/azure/virtual-machines/windows/quick-create-portal#connect-to-virtual-machine) to the VM using RDP and install the software that you want available on your image.

3. Generalize the VM using sysprep. That will remove all your personal account information, among other things, and prepare the machine to be used as an image. Then create an image using the [Azure Portal](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource#create-a-managed-image-in-the-portal) or using [PowerShell](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource#create-a-managed-image-of-a-vm-using-powershell).
For more info see [generalizing and creating a windows image](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource).

    Note: be sure to install the desired software on your VM prior to this step. Once you generalize the VM you won't be able to login with admin rights to the VM anymore.

4. Create VMs using template building blocks version 2
    - Create a *VirtualMachine* parameters file setting all the necessary values. Check the wiki on how to [Create a Template Building Blocks Parameter File](https://github.com/mspnp/template-building-blocks/wiki/create-a-template-building-blocks-parameter-file) and the [Virtual Machines](https://github.com/mspnp/template-building-blocks/wiki/Virtual-Machines) reference.
    - In *osDisk* set "createOption" to "fromImage".
    - In *imageReference* set "id" to the full resource id of the image. This can be copied from the portal on the image overview page.

    This sample creates 2 VMs from a custom image:

```JSON
{
    "$schema": "https://raw.githubusercontent.com/mspnp/template-building-blocks/master/schemas/buildingBlocks.json",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "buildingBlocks": {
            "value": [
                {
                    "type": "VirtualMachine",
                    "settings": {
                        "vmCount": 2,
                        "namePrefix": "vm-prefix",
                        "size": "Standard_DS1_v2",
                        "adminUsername": "testadminuser",
                        "adminPassword": "test$!Passw0rd111",
                        "virtualNetwork": {
                            "name": "vnet-name"
                        },
                        "nics": [
                            {
                                "isPublic": false,
                                "privateIPAllocationMethod": "Static",
                                "startingIPAddress": "10.1.1.14",
                                "subnetName": "subnet-name"
                            }
                        ],
                        "imageReference": {
                            "id": "/subscriptions/00000000-0000-0000-0000-00000000/resourceGroups/resource-group-name/providers/Microsoft.Compute/images/image-name"
                        },
                        "osType": "windows",
                        "osDisk": {
                            "createOption": "fromImage"
                        }
                    }
                }
            ]
        }
    }
}
```

## More Info
- [Install Azure Building Blocks](https://github.com/mspnp/template-building-blocks/wiki/Install-Azure-Building-Blocks)
- [Create a Template Building Blocks Parameter File](https://github.com/mspnp/template-building-blocks/wiki/create-a-template-building-blocks-parameter-file)
- [Virtual Machines](https://github.com/mspnp/template-building-blocks/wiki/Virtual-Machines) reference
- [Command Line Reference](https://github.com/mspnp/template-building-blocks/wiki/command-line-reference)