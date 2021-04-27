# Deploying Resources with Azure Resource Manager
# Lab Answer Key: Getting Started with Azure Resource Manager Templates and Azure Building Blocks

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


## Exercise 1: Deploy core Azure resources by using an Azure Resource Manager Template from the Azure portal

#### Task 1: Open the Azure Portal

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the user account account that has the owner role in the Azure subscription you will be using in this lab.

#### Task 2: Deploy an Azure virtual network from the Azure portal by using an Azure Resource Manager template

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Template Deployment** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Template deployment**.

1. On the **Template deployment** blade, click the **Create** button.

1. On the **Custom deployment** blade, click the **Build your own template in the editor** link.

1. On the **Edit template** blade, click **Load file**.

1. In the **Choose File to Upload** dialog box, navigate to the **\\allfiles\\AZ-301T03\\Module_01\\Labfiles\\Starter\\** folder, select the **vnet-simple-template.json** file, and click **Open**. This will load the following content into the template editor pane:

    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "vnetNamePrefix": {
                "type": "string",
                "defaultValue": "vnet-",
                "metadata": {
                    "description": "Name prefix of the vnet"
                }
            },
            "vnetIPPrefix": {
                "type": "string",
                "defaultValue": "10.2.0.0/16",
                "metadata": {
                    "description": "IP address prefix of the vnet"
                }
            },
            "subnetNamePrefix": {
                "type": "string",
                "defaultValue": "subnet-",
                "metadata": {
                    "description": "Name prefix of the subnets"
                }
            },
            "subnetIPPrefix": {
                "type": "string",
                "defaultValue": "10.2.0.0/24",
                "metadata": {
                    "description": "IP address prefix of the first subnet"
                }
            }
        },
        "variables": {
            "vnetName": "[concat(parameters('vnetNamePrefix'), resourceGroup().name)]",
            "subnetNameSuffix": "0"
        },
        "resources": [
        {
            "apiVersion": "2018-02-01",
            "name": "[variables('vnetName')]",
            "type": "Microsoft.Network/virtualNetworks",
            "location": "[resourceGroup().location]",
            "scale": null,
            "properties": {
                "addressSpace": {
                    "addressPrefixes": [
                        "[parameters('vnetIPPrefix')]"
                    ]
                },
                "subnets": [
                    {
                        "name": "[concat(parameters('subnetNamePrefix'), variables('subnetNameSuffix'))]",
                        "properties": {
                            "addressPrefix": "[parameters('subnetIPPrefix')]"
                        }
                    }
                ],
                "virtualNetworkPeerings": [],
                "enableDdosProtection": false,
                "enableVmProtection": false
            },
            "dependsOn": []
            }
        ]
    }
    ```

1. Click the **Save** button to persist the template.

1. Back on the **Custom deployment** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, select the **Create new** option and, in the text box, type **AADesignLab0201-RG**.

    - In the **Location** drop-down list, select the Azure region to which you want to deploy resources in this lab.

    - Leave the **vnetNamePrefix** text box set to its default value.

    - Leave the **vnetIPPrefix** text box set to its default value.

    - Leave the **subnetNamePrefix** text box set to its default value.

    - Leave the **subnetIPPrefix** text box set to its default value.

    - In the **Terms and Conditions** section, select the **I agree to the terms and conditions stated above** checkbox.

    - Click the **Purchase** button.

1. Wait for the deployment to complete before you proceed to the next task.


#### Task 3: View deployment metadata

1. In the hub menu of the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click the entry representing the resource group to which you deployed the template in the previous task.

1. With the **Overview** selection active, on the resource group blade, click the **Deployments** link.

1. On the resulting blade, click the latest deployment to view its metadata in a new blade.

1. Within the deployment blade, observe the information displayed in the **Operation details** section.

> **Review**: In this exercise, you deployed an Azure virtual network by using an Azure Resource Manager template from the Azure portal



## Exercise 2: Deploy core Azure resources by using Azure Building Blocks from the Azure Cloud Shell

#### Task 1: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is a symbol that is constructed of the combination of the *greater than* and *underscore* characters.

1. If this is your first time opening the **Cloud Shell** using your subscription, you will see a wizard to configure **Cloud Shell** for first-time usage. When prompted, in the **Welcome to Azure Cloud Shell** pane, click **Bash (Linux)**.

    > **Note**: If you do not see the configuration options for **Cloud Shell**, this is most likely because you are using an existing subscription with this course's labs. If so, proceed directly to the next task.

1. In the **You have no storage mounted** pane, click **Show advanced settings**, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Cloud Shell region** drop-down list, select the Azure region matching or near the location where you deployed resources in this lab

    - Resource group: ensure that the **Use Existing** option is selected and select **AADesignLab0201-RG**.

    - In the **Storage account** section, ensure that the **Create new** option is selected and then, in the text box below, type a unique name consisting of a combination of between 3 and 24 characters and digits.

    - In the **File share** section, ensure that the **Create new** option is selected and then, in the text box below, type **cloudshell**.

    - Click the **Create storage** button.

1. Wait for the **Cloud Shell** to finish its first-time setup procedures before you continue to the next task.


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


#### Task 3: Deploy an Azure virtual network from Cloud Shell by using Azure Building Blocks

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to download the GitHub repository containing the Azure Building Blocks templates:

    ```sh
    git clone https://github.com/mspnp/template-building-blocks.git
    ```

1.  At the **Cloud Shell** command prompt, type in the following command and press **Enter** to view the content of the Azure Building Block parameter file you will use for this deployment:

    ```sh
    cat ./template-building-blocks/scenarios/vnet/vnet-simple.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group you created earlier in this exercise:

    ```sh
    RESOURCE_GROUP='AADesignLab0202-RG'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab0201-RG'].location" --output tsv)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create the **AADesignLab0202-RG** resource group.

    ```sh
    az group create --location $LOCATION --name $RESOURCE_GROUP
    ```
1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy a virtual network by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP -s $SUBSCRIPTION_ID -l $LOCATION -p ./template-building-blocks/scenarios/vnet/vnet-simple.json --deploy
    ```

1. Wait for the deployment to complete before you proceed to the next task.


#### Task 4: View deployment metadata

1. On the left side of the portal, click the **Resource groups** link.

1. On the **Resource groups** blade, click the entry representing the resource group you created earlier in this exercise.

1. With the **Overview** selection active, on the resource group blade, click the **Deployments** link.

1. On the resulting blade, click the latest deployment to view its metadata in a new blade.

1. Within the deployment blade, observe the information displayed in the **Operation details** section.

1. Close the **Cloud Shell** pane.

> **Review**: In this exercise, you deployed an Azure virtual network by using Azure Building Blocks templates from the cloud shell.


## Exercise 3: Remove lab resources

#### Task 1: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open the Cloud Shell pane.

1. At the **Cloud Shell** command prompt at the bottom of the portal, type in the following command and press **Enter** to list all resource groups you created in this lab:

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab02')]".name --output tsv
    ```

1. Verify that the output contains only the resource groups you created in this lab. These groups will be deleted in the next task.

#### Task 2: Delete resource groups

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to delete the resource groups you created in this lab

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab02')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
    ```

1. Close the **Cloud Shell** prompt at the bottom of the portal.


> **Review**: In this exercise, you removed the resources used in this lab.
