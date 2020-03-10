# Create A Linux Custom Image Managed Disk

Steps:

1. Create the Linux VM using the [portal](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-portal) or [Azure CLI](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-cli) or [PowerShell](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-powershell).

2. [Connect](https://docs.microsoft.com/azure/virtual-machines/linux/tutorial-manage-vm#connect-to-vm) to the machine via SSH and install the software that you want available on your image.

3. To create an image, you need to remove personal account information which makes it safer to deploy multiple times. Use the waagent command with the -deprovision+user parameter on your source Linux VM, that will delete machine specific files and data. Then create an image VM resource by running *az image create* in Azure CLI.
See [deprovisioning and creating an image](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image).

    Note: be sure to install the desired software on your VM prior to this step. Once you deprovision you won't be able to login with admin rights to the VM anymore.

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
                                "startingIPAddress": "10.1.1.44",
                                "subnetName": "subnet-name"
                            }
                        ],
                        "imageReference": {
                            "id": "/subscriptions/00000000-0000-000-0000-000000000000/resourceGroups/resource-group-name/providers/Microsoft.Compute/images/linux-img-name"
                        },
                        "osType": "linux",
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
- [Create a Linux VM video](https://azure.microsoft.com/resources/videos/create-a-linux-virtual-machine/)
- [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image)
- [Capture a Linux virtual machine running on Azure](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image-nodejs)