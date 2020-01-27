# Building Azure IaaS-Based Server Applications.
# Lab Answer Key: Building Azure IaaS-Based Server Applications by using Azure Resource Manager Templates and Azure Building Blocks.

## Before we start

1. Ensure that you are logged in to your Windows 10 lab virtual machine using the following credentials:

    - Username: **Admin**

    - Password: **Pa55w.rd**

1. Review Taskbar located at the bottom of your Windows 10 desktop. The Taskbar contains the icons for the common applications you will use in the labs:

    - Microsoft Edge

    - File Explorer

    - [Visual Studio Code](https://code.visualstudio.com/)

    - [Microsoft Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)

    - Bash on Ubuntu on Windows

    - Windows PowerShell

    > **Note**: You can also find shortcuts to these applications in the **Start Menu**.


## Exercise 1: Deploy an Azure VM by using Azure Resource Manager templates with PowerShell Desired State Configuration (DSC) extension from the Azure portal.

#### Task 1: Open the Azure Portal

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the user account account that has the owner role in the Azure subscription you will be using in this lab.

#### Task 2: Create an Azure VM running Windows Server 2016 Datacenter.

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Windows Server** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Windows Server**.

1. On the **Windows Server** blade, select the **[smalldisk] Windows Server 2016 Datacenter** software plan, then click the **Create** button.

1. On the **Basics** tab, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, click **Create new**, in the text box, type **AADesignLab0301-RG**, and click **OK**.

    - In the **Name** text box, enter the value **lab03vm0**.

    - In the **Region** drop-down list, select an Azure region to which you want to deploy resources in this lab.

    - In the **Availability options** drop-down list, select **Availability set**.

    - In the **Availability set** section, click **Create new**, box, enter the value **lab03avset0**, set **Fault domains** to the maximum value, leave **Update domains** with its default value, and click **OK**.

    - Leave the entry in the **Image** drop-down list set to its default value.

    - Ensure that the size is set to **Standard DS1 v2**

    - In the **Username** text box, enter the value **Student**.

    - In the **Password** and **Confirm password** text boxes, enter the value **Pa55w.rd1234**.

    - In the **Public inbound ports** section, select the **Allow selected port** option and, in the **Select inbound ports** drop-down list, select **HTTP**.

    - Leave the **Already have a Windows license?** option set to **No**.

    - Click **Next: Disks >**

1. On the **Disks** tab, perform the following tasks:

    - Ensure that the **OS disk type** dropdown list entry is set to **Premium SSD**

    - Click **Next: Networking >**

1. On the **Networking** tab, perform the following tasks:

    - In the **Virtual network** section, click **Create new**.

    - On the **Create virtual network** blade, specify the following settings and click **OK**:

        - In the **Name** text box, enter the value **lab03vnet0**.

        - In the **Address range** text box, enter the value **10.3.0.0/16**.

        - In the **Subnet name** text box, enter the value **subnet-0**.

        - In the **Subnet address range** text box, enter the value **10.3.0.0/24**, and click **OK**.

    - Leave the **Public IP** entry set to its default value.

    - Leave the **NIC network security group** option set to **Basic**.

    - Leave the **Public inbound ports** option set to **Allow selected ports**

    - Leave the **Select inbound ports** entry set to **HTTP**

    - Leave the **Accelerated networking** entry set to its default value.

    - Click **Next: Management >**

1. On the **Management** tab, perform the following tasks:

    - Leave the **Boot diagnostics** option set to its default value.

    - Leave the **OS guest diagnostics** option set to its default value.

    - Leave the **Diagnostics storage account** entry set to its default value.

    - Leave the **System assigned managed identity** option set to its default value.

    - Leave the **Enable auto-shutdown** option set to its default value.

    - Leave the **Enable backup** option set to its default value.

    - Click the **Review + create** button.

1. On the **Create a virtual machine** blade, review the settings of your new virtual machine and click the **Create** button.

1. Do not wait for the deployment to complete and proceed to the next task.


#### Task 3: View DSC configuration

1. On the Taskbar, click the **File Explorer** icon.

1. In the **File Explorer** window that appears, navigate to the **\\allfiles\\AZ-301T04\\Module_02\\LabFiles\\Starter\\** folder.

1. Right-click the **IISWebServer.zip** file and select the **Extract All...** option.

1. In the **Extract Compressed (Zipped) Folders** dialog, perform the following tasks:

    - In the **Files will be extracted to this folder:** field, enter the name of the folder into which you want to extract the files.

    - Ensure that the **Show extracted files when complete** checkbox is selected.

    - Click the **Extract** button.

1. In the new **File Explorer** window that appears, right-click the **IISWebServer.ps1** file and select the **Open with Code** option to start the **Visual Studio Code** application.

1. In the **Visual Studio Code** window that appears, review the content of the PowerShell script.

1. At the top of the **Visual Studio Code** window, click the **File** menu and select the **Close Window** option.

1. Close both **File Explorer** windows.

1. Return to the **Microsoft Edge** window with the **Azure Portal** open.


#### Task 4: Create an Azure Storage account

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Storage account** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Storage account**.

1. On the **Storage account** blade, click the **Create** button.

1. On the **Create storage account** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, ensure that the **Use existing** option is selected and, in the drop-down list below, select the resource group you created earlier in this exercise.

    - In the **Name** text box, type a unique name consisting of a combination of between 3 and 24 characters and digits.

    - Leave the **Location** entry set to the same Azure region you selected earlier in this exercise.

    - In the **Performance** section, ensure that the **Standard** option is selected.


    - In the **Account kind** drop-down list, ensure that the **Storage (general purpose v1)** option is selected.

    - In the **Replication** drop-down list, select the **Locally-redundant storage (LRS)** entry.

    - Click the **Review + Create** button, and then click **Create**.

1. Wait for the deployment to complete before you proceed to the next task.

    > **Note**: This operation can take about 2 minutes.


#### Task 5: Upload DSC configuration to Azure Storage

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group into which you deployed the storage account.

1. On the resource group blade, click the entry representing the newly created storage account.

1. With the **Overview** selection active, on the storage account blade, click **Blobs**.

1. Click the **Container** button at the top of the blade.

1. In the **New container** pane that appears, specify the following settings and click **OK**:

    - In the **Name** text box, enter the value **config**.

    - In the **Public access level** list, select the **Blob (anonymous read access for blobs only)** option.

1. Back on the **Blob service** blade, click the entry representing the new **config** container.

1. On the **config** blade, click the **Upload** button at the top of the blade.

1. In the **Upload blob** pane, perform the following tasks:

    - In the **Files** field, click the blue folder button to the right of the field.

    - In the **Open file** dialog that appears, navigate to the **\\allfiles\\AZ-301T04\\Module_02\\LabFiles\\Starter\\** folder.

    - Select the **IISWebServer.zip** file.

    - Click the **Open** button to close the dialog box and return to the **Upload blob** popup.

    - Click the **Upload** button.

1. Navigate to the **config** blade and click the entry representing the **IISWebServer.zip** blob.

1. In the **Blob properties** popup that appears, locate and record the value of the **URL** property. This URL will be used later in this lab.


#### Task 6: Deploy an Azure VM by using an Azure Resource Manager template with PowerShell DSC extension from the Azure portal.

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Template Deployment** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Template deployment**.

1. On the **Template deployment** blade, click the **Create** button.

1. On the **Custom deployment** blade, click the **Build your own template in the editor** link.

1. On the **Edit template** blade, click **Load file**.

1. In the **Choose File to Upload** dialog box, navigate to the **\\allfiles\\AZ-301T04\\Module_02\\LabFiles\\Starter\\** folder, select the **dsc-extension-template.json** file, and click **Open**. This will load the following content into the template editor pane:

    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "virtualMachineName": {
                "type": "string",
                "defaultValue": "lab03vm0"
            },
            "configurationModuleUrl": {
                "type": "string"
            },
            "extensionFunction": {
                "type": "string",
                "defaultValue": "IISWebServer.ps1\\IISWebServer"
            }
        },
        "resources": [
            {
                "apiVersion": "2018-06-01",
                "type": "Microsoft.Compute/virtualMachines/extensions",
                "name": "[concat(parameters('virtualMachineName'), '/dscExtension')]",
                "location": "[resourceGroup().location]",
                "properties": {
                    "publisher": "Microsoft.Powershell",
                    "type": "DSC",
                    "typeHandlerVersion": "2.75",
                    "autoUpgradeMinorVersion": true,
                    "settings": {
                        "ModulesUrl": "[parameters('configurationModuleUrl')]",
                        "ConfigurationFunction": "[parameters('extensionFunction')]",
                        "Properties": {
                            "MachineName": "[parameters('virtualMachineName')]"
                        }
                    },
                    "protectedSettings": null
                }
            }
        ]
    }
    ```

1. Click the **Save** button to persist the template.

1. Back on the **Custom deployment** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, select the **Use existing** option and, in the drop-down list, select the resource group you created earlier in this exercise.

    - Leave the **Location** drop-down list set to its default value.

    - Leave the **Virtual Machine Name** field set to its default value: **lab03vm0**.

    - In the **Configuration Module Url** field, enter the URL value that you recorded in the previous task.

    - Leave the **Extension Function** field set to its default value: **IISWebServer.ps1\\IISWebServer**.

    - In the **Terms and Conditions** section, select the **I agree to the terms and conditions stated above** checkbox.

    - Click the **Purchase** button.

1. Wait for the deployment of the DSC configuration to complete before you proceed to the next task.

    > **Note**: DSC configuration deployment can take up to ten minutes.


#### Task 7: Validate that the Azure VM is serving web content

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group into which you deployed the virtual machine.

1. On the resource group blade, click the entry representing the **Virtual Machine** you deployed.

1. On the **Virtual machine** blade, locate the **Public IP address** entry, and identify its value.

1. Open a new Microsoft Edge tab and navigate to the IP address you identified in the previous step.

1. Verify that you are able to access the default Internet Information Services webpage.

1. Close the new browser tab.

> **Review**: In this exercise, you deployed an **Virtual Machine** from the Azure portal and then used the **PowerShell DSC** extension to apply changes to the virtual machine in an unattended manner.


## Exercise 2: Deploy an Azure Virtual Machine Scale Set (VMSS) by using Azure Resource Manager templates with PowerShell Desired State Configuration (DSC) extension from the Azure portal.

#### Task 1: View an Azure Resource Manager template.

1. On the Taskbar, click the **File Explorer** icon.

1. In the **File Explorer** window that appears, navigate to the **\\allfiles\\AZ-301T04\\Module_02\\LabFiles\\Starter\\** folder.

1. Right-click the **vmss-template.json** file and select the **Open with Code** option to start the **Visual Studio Code** application.

1. In the **Visual Studio Code** window that appears, review the content of the JSON file.

1. At the top of the **Visual Studio Code** window, click the **File** menu and select the **Close Window** option.

1. Close the **File Explorer** window.

1. Return to the **Microsoft Edge** window with the **Azure Portal** open.


#### Task 2: Deploy a VMSS using ARM

1. In the hub menu of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Template Deployment** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Template deployment**.

1. On the **Template deployment** blade, click the **Create** button.

1. On the **Custom deployment** blade, click **Build your own template in the editor**.

1. On the **Edit template** blade, click **Load file**.

1. In the **Open** file dialog that appears, navigate to the **\\allfiles\\AZ-301T04\\Module_02\\LabFiles\\Starter\\*** folder.

1. Select the **vmss-template.json** file.

1. Click the **Open** button.

1. Back on the **Edit template** blade, click the **Save** button to persist the template.

1. Back on the **Custom deployment** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, select the **Create new** option and, in the text box, type **AADesignLab0302-RG**.

    - Leave the **Location** entry set to its default value.

    - In the **Admin User Name** text box, enter the value **Student**.

    - In the **Admin Password** text box, enter the value **Pa55w.rd1234**.

    - In the **Instance Count** text box, enter the value **2**.

    - Leave the **Overprovision** text box set to its default value: **true**.

    - In the **Configuration Module Url** text box, enter the URL that you recorded for the uploaded blob in the previous exercise of this lab.

    - In the **Terms and Conditions** section, select the **I agree to the terms and conditions stated above** checkbox.

    - Click the **Purchase** button.

1. Wait for the deployment to complete before you proceed to the next task.


#### Task 3: Validate that VMSS instances are serving web content

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group into which you deployed the virtual machine scale set.

1. On the resource group blade, click the resource of the **Public IP address** type.

1. On the Public IP address resource blade, in the **Essentials** section, identify the value of **IP address** entry.

1. Open a new Microsoft Edge tab and navigate to the IP address you identified in the previous step.

1. Verify that you are able to access the default Internet Information Services webpage.

1. Close the new browser tab and return to the browser tab with the **Azure Portal** currently active.

> **Review**: In this exercise, you created a Virtual Machine scale set and configured the individual instances using PowerShell DSC.


## Exercise 3: Deploy Azure VMs running Windows Server 2016 and Linux by using Azure Building Blocks with PowerShell Desired State Configuration (DSC) extension from the Azure Cloud Shell.

#### Task 1: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is a symbol that is constructed of the combination of the *greater than* and *underscore* characters.

1. If this is your first time opening the **Cloud Shell** using your subscription, you will see a wizard to configure **Cloud Shell** for first-time usage. When prompted, in the **Welcome to Azure Cloud Shell** pane, click **Bash (Linux)**.

    > **Note**: If you do not see the configuration options for **Cloud Shell**, this is most likely because you are using an existing subscription with this course's labs. If so, proceed directly to the next task.

1. In the **You have no storage mounted** pane, click **Show advanced settings**, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Cloud Shell region** drop-down list, select the Azure region matching or near the location where you intend to deploy resources in this exercise.

    - In the **Resource group** section, ensure that the **Use existing** option is selected and then select **AADesignLab0301-RG**.

    - In the **Storage account** section, ensure that the **Create new** option is selected and then, in the text box below, type a unique name consisting of a combination of between 3 and 24 characters and digits.

    - In the **File share** section, ensure that the **Create new** option is selected and then, in the text box below, type **cloudshell**.

    - Click the **Create storage** button.

1. Wait for the **Cloud Shell** to finish its first-time setup procedures before you proceed to the next task.


#### Task 2: Install the Azure Building Blocks npm package in Azure Cloud Shell

1. At the **Cloud Shell** command prompt at the bottom of the portal, type in the following command and press **Enter** to create a local directory to install the Azure Building Blocks npm package:

    ```sh
    mkdir ~/.npm-global
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to update the npm configuration to include the new local directory:

    ```sh
    npm config set prefix '~/.npm-global'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to open the ~./bashrc configuration file for editing:

    ```sh
    vi ~/.bashrc
    ```

1. At the **Cloud Shell** command prompt, in the vi editor interface, scroll down to the bottom of the file (or type **G**), scroll to the right to the right-most character on the last line (or type **$**), type **a** to enter the **INSERT** mode, press **Enter** to start a new line, and then type the following to add the newly created directory to the system path:

    ```sh
    export PATH="$HOME/.npm-global/bin:$PATH"
    ```

1. At the **Cloud Shell** command prompt, in the vi editor interface, to save your changes and close the file, press **Esc**, press **:**, type **wq!** and press **Enter**.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to install the Azure Building Blocks npm package:

    ```sh
    npm install -g @mspnp/azure-building-blocks
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to exit the shell:

    ```sh
    exit
    ```

1. In the **Cloud Shell timed out** pane, click **Reconnect**.

    > **Note**: You need to restart Cloud Shell for the installation of the Buliding Blocks npm package to take effect.


#### Task 3: Deploy a Windows Server 2016 Azure VM from Cloud Shell by using Azure Building Blocks

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to download the GitHub repository containing the Azure Building Blocks reference architecture files:

    ```
    git clone https://github.com/mspnp/reference-architectures.git
    ```

1.  At the **Cloud Shell** command prompt, type in the following command and press **Enter** to view the content of the Azure Building Block parameter file you will use for this deployment:

    ```sh
    cat ./reference-architectures/virtual-machines/single-vm/parameters/windows/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group you created earlier in this exercise:

    ```sh
    RESOURCE_GROUP='AADesignLab0303-RG'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab0301-RG'].location" --output tsv)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a resource group that you will use for the deployment:

    ```sh
    az group create --name $RESOURCE_GROUP --location $LOCATION
    ```
1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ./reference-architectures/virtual-machines/single-vm/parameters/windows/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminPassword** parameter with the value **Pa55w.rd1234** in the Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"adminPassword": ""/"adminPassword": "Pa55w.rd1234"/' ./reference-architectures/virtual-machines/single-vm/parameters/windows/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the Building Blocks parameter file:

    ```sh
    cat ./reference-architectures/virtual-machines/single-vm/parameters/windows/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy a Windows Server 2016 Azure VM by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP -s $SUBSCRIPTION_ID -l $LOCATION -p ./reference-architectures/virtual-machines/single-vm/parameters/windows/single-vm.json --deploy
    ```

1. Wait for the deployment to complete before you proceed to the next task.


#### Task 4: Validate that the Windows Server 2016 Azure VM is serving web content

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group into which you deployed the Windows Server 2016 Datacenter virtual machine earlier in this exercise.

1. On the resource group blade, click the entry representing the virtual machine you deployed.

1. On the **Virtual machine** blade, locate the **Public IP address** entry, and identify its value.

1. Open a new Microsoft Edge tab and navigate to the IP address you identified in the previous step.

1. Verify that you are able to access the default Internet Information Services webpage.

1. Close the new browser tab.


#### Task 5: Deploy a Linux Azure VM from Cloud Shell by using Azure Building Blocks

1.  At the **Cloud Shell** command prompt, type in the following command and press **Enter** to view the content of the Azure Building Block parameter file you will use for this deployment:

    ```sh
    cat ./reference-architectures/virtual-machines/single-vm/parameters/linux/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to generate the SSH key pair that you will use to authenticate when accessing the Linux VM:

    ```sh
    ssh-keygen -t rsa -b 2048
    ```

    - When prompted to enter the file in which to save the key, press **Enter** to accept the default value **(~/.ssh/id_rsa)**.

    - When prompted to enter passphrase, press **Enter** twice.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the public key of the newly generated key pair:

    ```sh
    PUBLIC_KEY=$(cat ~/.ssh/id_rsa.pub)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the public key of the newly generated key pair and which takes into account any special character the public key might include:

    ```sh
    PUBLIC_KEY_REGEX="$(echo $PUBLIC_KEY | sed -e 's/\\/\\\\/g; s/\//\\\//g; s/&/\\\&/g')"
    ```

    > **Note**: This is necessary because you will use the **sed** utility to insert this string into the Azure Building Blocks parameter file. Alternatively, you could simply open the file and enter the public key string directly into the file.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group you will use for the deployment:

    ```sh
    RESOURCE_GROUP='AADesignLab0304-RG'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab0301-RG'].location" --output tsv)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ./reference-architectures/virtual-machines/single-vm/parameters/linux/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **sshPublicKey** parameter with the value of the **$PUBLIC_KEY_REGEX** variable in the Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"sshPublicKey": ""/"sshPublicKey": "'"$PUBLIC_KEY_REGEX"'"/' ./reference-architectures/virtual-machines/single-vm/parameters/linux/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the Building Blocks parameter file:

    ```sh
    cat ./reference-architectures/virtual-machines/single-vm/parameters/linux/single-vm.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a new resource group:

    ```sh
    az group create --name $RESOURCE_GROUP --location $LOCATION
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy a Linux Azure VM by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP -s $SUBSCRIPTION_ID -l $LOCATION -p ./reference-architectures/virtual-machines/single-vm/parameters/linux/single-vm.json --deploy
    ```

1. Wait for the deployment to complete before you proceed to the next task.


#### Task 7: Validate that the Linux Azure VM is serving web content

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group into which you deployed the virtual machine.

1. On the resource group blade, click the entry representing the virtual machine you deployed.

1. On the **Virtual machine** blade, locate the **Public IP address** entry, and identify its value.

1. Open a new Microsoft Edge tab and navigate to the IP address you identified in the previous step.

1. Verify that you are able to access the default Apache2 Ubuntu webpage.

1. Close the new browser tab.

1. Close the **Cloud Shell** pane.

> **Review**: In this exercise, you deployed Azure VMs running Windows Server 2016 Datacenter and Linux from Cloud Shell by using Azure Building Blocks.


## Exercise 4: Remove lab resources

#### Task 1: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open the Cloud Shell pane.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to list all resource groups you created in this lab:

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab03')]".name --output tsv
    ```

1. Verify that the output contains only the resource groups you created in this lab. These groups will be deleted in the next task.

#### Task 2: Delete resource groups

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to delete the resource groups you created in this lab

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab03')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
    ```

1. Close the **Cloud Shell** prompt at the bottom of the portal.


> **Review**: In this exercise, you removed the resources used in this lab.
