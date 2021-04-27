# Networking Azure Application Components

# Lab Answer Key: Deploying Network Infrastructure for Use in Azure Solutions

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

## Exercise 1: Configure the lab environment

#### Task 1: Open the Azure Portal

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. When prompted, authenticate with the user account account that has the owner role in the Azure subscription you will be using in this lab.

#### Task 2: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is a symbol that is constructed of the combination of the *greater than* and *underscore* characters.

1. If this is your first time opening the **Cloud Shell** using your subscription, you will see a wizard to configure **Cloud Shell** for first-time usage. When prompted, in the **Welcome to Azure Cloud Shell** pane, click **Bash (Linux)**.

    > **Note**: If you do not see the configuration options for **Cloud Shell**, this is most likely because you are using an existing subscription with this course's labs. If so, proceed directly to the next task.

1. In the **You have no storage mounted** pane, click **Show advanced settings**, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Cloud Shell region** drop-down list, select the Azure region matching or near the location where you intend to deploy resources in this lab

    - In the **Resource group** section, select the **Use existing** option and then, in the drop-down list, select **AADesignLab0901-RG**.

    - In the **Storage account** section, ensure that the **Create new** option is selected and then, in the text box below, type a unique name consisting of a combination of between 3 and 24 characters and digits.

    - In the **File share** section, ensure that the **Create new** option is selected and then, in the text box below, type **cloudshell**.

    - Click the **Create storage** button.

1. Wait for the **Cloud Shell** to finish its first-time setup procedures before you proceed to the next task.

#### Task 3: Install the Azure Building Blocks npm package in Azure Cloud Shell

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

1. At the **Cloud Shell** command prompt, in the vi editor interface, scroll down to the bottom of the file (or type **G**), scroll to the right to the right-most character on the last line (or type **$**), type **a** to initiate the **INSERT** mode, press **Enter** to start a new line, and then type the following to add the newly created directory to the system path:

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


#### Task 4: Prepare Building Blocks Hub and Spoke parameter files

1. In the **Cloud Shell** pane, click the **Upload/Download files** icon and, in the drop-down menu, click **Upload**.

1. In the **Open** dialog box, navigate to the **\\allfiles\\AZ-301T04\\Module_03\\LabFiles\\Starter\\** folder, select **hub-nva.json** and click **Open**. Repeat the same step to upload the files **hub-vnet.json**, **hub-vnet-peering.json**, **spoke1.json**, and **spoke2.json**.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the **hub-vnet.json** Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ~/hub-vnet.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminPassword** parameter with the value **Pa55w.rd1234** in the **hub-vnet.json** Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"adminPassword": ""/"adminPassword": "Pa55w.rd1234"/' ~/hub-vnet.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the **hub-vnet.json** Building Blocks parameter file:

    ```sh
    cat ~/hub-vnet.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the **hub-nva.json** Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ~/hub-nva.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminPassword** parameter with the value **Pa55w.rd1234** in the **hub-nva.json** Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"adminPassword": ""/"adminPassword": "Pa55w.rd1234"/' ~/hub-nva.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the **hub-nva.json** Building Blocks parameter file:

    ```sh
    cat ~/hub-nva.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the **spoke1.json** Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ~/spoke1.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminPassword** parameter with the value **Pa55w.rd1234** in **spoke1.json** the Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"adminPassword": ""/"adminPassword": "Pa55w.rd1234"/' ~/spoke1.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the **spoke1.json** Building Blocks parameter file:

    ```sh
    cat ~/spoke1.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminUsername** parameter with the value **Student** in the **spoke2.json** Building Blocks parameter file:

    ```sh
    sed -i.bak1 's/"adminUsername": ""/"adminUsername": "Student"/' ~/spoke2.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to replace the placeholder for the **adminPassword** parameter with the value **Pa55w.rd1234** in the **spoke2.json** Building Blocks parameter file:

    ```sh
    sed -i.bak2 's/"adminPassword": ""/"adminPassword": "Pa55w.rd1234"/' ~/spoke2.json
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to verify that the parameter values were successfully changed in the **spoke2.json** Building Blocks parameter file:

    ```sh
    cat ~/spoke2.json
    ```

#### Task 5: Implement the hub component of the Hub and Spoke design

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that will contain the hub virtual network:

    ```sh
    RESOURCE_GROUP_HUB_VNET='AADesignLab08-hub-vnet-rg'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment (replace the placeholder `<Azure region>` with the name of the Azure region to which you intend to deploy resources in this lab):

    ```sh
    LOCATION='<Azure region>'
    ```
1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create the resource group for the deployment.

    ```sh
    az group create --name $RESOURCE_GROUP_HUB_VNET --location $LOCATION
    ```


1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy the hub component of the Hub-and-Spoke topology by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP_HUB_VNET -s $SUBSCRIPTION_ID -l $LOCATION -p ~/hub-vnet.json --deploy
    ```

1. Do not wait for the deployment to complete but proceed to the next task.


#### Task 6: Implement the spoke components of the Hub and Spoke design

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the same user account account that you used earlier in this lab.

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that will contain the first spoke virtual network:

    ```sh
    RESOURCE_GROUP_SPOKE1_VNET='AADesignLab08-spoke1-vnet-rg'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab08-hub-vnet-rg'].location" --output tsv)
    ```
1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create the resource group for the deployment:

    ```sh
    az group create --name $RESOURCE_GROUP_SPOKE1_VNET --location $LOCATION
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy the first spoke component of the Hub-and-Spoke topology by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP_SPOKE1_VNET -s $SUBSCRIPTION_ID -l $LOCATION -p ~/spoke1.json --deploy
    ```

1. Do not wait for the deployment to complete but proceed to the next step.

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the same user account account that you used earlier in this lab.

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that will contain the second spoke virtual network:

    ```sh
    RESOURCE_GROUP_SPOKE2_VNET='AADesignLab08-spoke2-vnet-rg'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab08-hub-vnet-rg'].location" --output tsv)
    ```
1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create the resource group for the deployment:

    ```sh
    az group create --name $RESOURCE_GROUP_SPOKE2_VNET --location $LOCATION
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy the second spoke component of the Hub-and-Spoke topology by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP_SPOKE2_VNET -s $SUBSCRIPTION_ID -l $LOCATION -p ~/spoke2.json --deploy
    ```

1. Do not wait for the deployment to complete but proceed to the next task.

#### Task 7: Configure the VNet peering of the Hub and Spoke design

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the same user account account that you used earlier in this lab.

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that contains the hub virtual network:

    ```sh
    RESOURCE_GROUP_HUB_VNET='AADesignLab08-hub-vnet-rg'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab08-hub-vnet-rg'].location" --output tsv)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to provision peering of the virtual networks in the Hub-and-Spoke topology by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP_HUB_VNET -s $SUBSCRIPTION_ID -l $LOCATION -p ~/hub-vnet-peering.json --deploy
    ```

1. Do not wait for the deployment to complete but proceed to the next task.


#### Task 8: Configure routing of the Hub and Spoke design

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the same user account account that you used earlier in this lab.

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of your Azure subscription:

    ```sh
    SUBSCRIPTION_ID=$(az account list --query "[0].id" --output tsv | tr -d '"')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that will contain the hub Network Virtual Appliance (NVA) functioning as a router:

    ```sh
    RESOURCE_GROUP_HUB_NVA='AADesignLab08-hub-nva-rg'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the Azure region you will use for the deployment:

    ```sh
    LOCATION=$(az group list --query "[?name == 'AADesignLab08-hub-vnet-rg'].location" --output tsv)
    ```
1. At the **Cloud Shell** command prompt, type in the following command to create the resource group that will be used in the deployment.

    ```sh
    az group create --name $RESOURCE_GROUP_HUB_NVA --location $LOCATION
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to deploy the NVA component of the Hub-and-Spoke topology by using the Azure Building Blocks:

    ```sh
    azbb -g $RESOURCE_GROUP_HUB_NVA -s $SUBSCRIPTION_ID -l $LOCATION -p ~/hub-nva.json --deploy
    ```

1. Wait for the deployment to complete before you proceed to the next task.

    > **Note**: The deployment can take about 10 minutes.


## Exercise 2: Review the Hub-spoke topology

#### Task 1: Examine the peering configuration

1. In the hub menu in the Azure portal, click **All services**.

1. In the **All services** menu, in the **Filter** text box, type **Virtual networks** and press **Enter**.

1. In the list of results, click **Virtual networks**.

1. On the **Virtual networks** blade, click **hub-vnet**.

1. On the **hub-vnet** blade, click **Peerings**.

1. On the **hub-vnet - Peerings** blade, review the list of peerings and their status.

1. Navigate back to the **Virtual Networks** blade and click **spoke1-vnet**.

1. On the **spoke1-vnet** blade, click **Peerings**.

1. On the **spoke1-vnet - Peerings** blade, review the existing peering and its status.

1. Navigate back to the **Virtual Networks** blade and click **spoke2-vnet**.

1. On the **spoke2-vnet** blade, click **Peerings**.

1. On the **spoke2-vnet - Peerings** blade, review the existing peering and its status.

#### Task 2: Examine the routing configuration

1. In the **All services** menu, in the **Filter** text box, type **Route tables** and press **Enter**.

1. In the list of results, click **Route tables**.

1. On the **Route tables** blade, click **spoke1-rt**.

1. On the **spoke1-rt** blade, review the list of routes. Note the **NEXT HOP** entry for the route **toSpoke2**.

1. Navigate back to the **Route tables** blade and click **spoke2-rt**.

1. On the **spoke2-rt** blade, review the list of routes. Note the **NEXT HOP** entry for the route **toSpoke1**.

#### Task 3: Verify connectivity between spokes

1. In the hub menu in the Azure portal, click **All services**.

1. In the **All services** menu, in the **Filter** text box, type **Network Watcher** and press **Enter**.

1. In the list of results, click **Network Watcher**.

1. On the **Network Watcher** blade, in the **NETWORK DIAGNOSTIC TOOLS** section, click **Connection troubleshoot**.

1. On the **Network Watcher - Connection troubleshoot** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** drop-down list, select the **AADesignLab08-spoke1-vnet-rg** entry.

    - In the **Virtual machine** drop-down list, leave the default entry.

    - Ensure that the **Destination** option is set to **Specify manually**.

    - In the **URI, FQDN, or IPv4** text box, type **10.2.0.68** entry.

    - In the **Destination Port** text, type 3389.

    - Click the **Check** button.

1. Wait until results of the connectivity check are returned and verify that the status is **Reachable**.

    > **Note**: If this is the first time you are using Network Watcher, the check can take up to 5 minutes.


## Exercise 3: Remove lab resources

#### Task 1: Open Cloud Shell

1. At the top of the portal, click the **Cloud Shell** icon to open the Cloud Shell pane.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to list all resource groups you created in this lab:

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab08')]".name --output tsv
    ```

1. Verify that the output contains only the resource groups you created in this lab. These groups will be deleted in the next task.

#### Task 2: Delete resource groups

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to delete the resource groups you created in this lab

    ```sh
    az group list --query "[?starts_with(name,'AADesignLab08')]".name --output tsv | xargs -L1 bash -c 'az group delete --name $0 --no-wait --yes'
    ```

1. Close the **Cloud Shell** prompt at the bottom of the portal.

> **Review**: In this exercise, you removed the resources used in this lab.
