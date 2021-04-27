# Comparing Database Options in Azure

# Lab Answer Key: Deploying Database Instances in Azure

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

## Exercise 1: Deploy a Cosmos DB database

#### Task 1: Open the Azure Portal

1. On the Taskbar, click the **Microsoft Edge** icon.

1. In the open browser window, navigate to the **Azure Portal** (<https://portal.azure.com>).

1. If prompted, authenticate with the user account account that has the owner role in the Azure subscription you will be using in this lab.

#### Task 2: Create a Cosmos DB database and collection

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Cosmos DB** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Azure Cosmos DB**.

1. On the **Azure Cosmos DB** blade, click the **Create** button.

1. On the new **Azure Cosmos DB** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - Resource group: ensure that the **Create new** option is selected and then, in the text box, type **AADesignLab0701-RG**.

    - In the **Account Name** text box, type a globally unique value.

    - In the **API** drop-down list, select the **Core (SQL)** option.

    - In the **Location** drop-down list, select the Azure region in which you want to deploy resources in this lab.

    - Leave all remaining settings with their default values.

    - Click the **Create** button.

1. Wait for the provisioning to complete before you proceed to the next step.

    > **Note**: The deployment should take less than 5 minutes.

1. Navigate to the blade of the newly created Cosmos DB account and click **Keys**.

1. On the Cosmos DB account Keys blade, note the value of the **PRIMARY CONNECTION STRING**. You will need it in the third exercise of this lab.

1. At the top of the portal, click the **Cloud Shell** icon to open a new shell instance.

    > **Note**: The **Cloud Shell** icon is a symbol that is constructed of the combination of the *greater than* and *underscore* characters.

1. If this is your first time opening the **Cloud Shell** using your subscription, you will see a wizard to configure **Cloud Shell** for first-time usage. When prompted, in the **Welcome to Azure Cloud Shell** pane, click **Bash (Linux)**.

    > **Note**: If you do not see the configuration options for **Cloud Shell**, this is most likely because you are using an existing subscription with this course's labs. If so, proceed directly to the next task.

1. In the **You have no storage mounted** pane, click **Show advanced settings**, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Cloud Shell region** drop-down list, select the Azure region matching or near the location that you selected earlier in this task.

    - In the **Resource group** section, select the **Use existing** option and then, in the drop-down list, select **AADesignLab0701-RG**.

    - In the **Storage account** section, ensure that the **Create new** option is selected and then, in the text box below, type a unique name consisting of a combination of between 3 and 24 characters and digits.

    - In the **File share** section, ensure that the **Create new** option is selected and then, in the text box below, type **cloudshell**.

    - Click the **Create storage** button.

1. Wait for the **Cloud Shell** to finish its first-time setup procedures before you proceed to the next task.

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the resource group that contains the Azure Cosmos DB account you deployed earlier in this task:

    ```
    RESOURCE_GROUP='AADesignLab0701-RG'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the name of the CosmosDB account you created earlier in this task:

    ```sh
    COSMOSDB_NAME=$(az cosmosdb list --resource-group $RESOURCE_GROUP --query "[0].name" --output tsv)
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the primary key of the CosmosDB account you created earlier in this task:

    ```sh
    PRIMARY_KEY=$(az cosmosdb keys list --resource-group $RESOURCE_GROUP --name $COSMOSDB_NAME --output json | jq -r '.primaryMasterKey')
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a variable which value designates the URI of the CosmosDB account you created earlier in this task:

    ```sh
    URI="https://$COSMOSDB_NAME.documents.azure.com:443/"
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a new CosmosDB database named **FinancialClubDatabase**:

    ```sh
    az cosmosdb database create --url-connection $URI --key $PRIMARY_KEY --db-name 'FinancialClubDatabase'
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to create a fixed collection named **MemberCollection** in the newly created database:

    ```sh
    az cosmosdb collection create --url-connection $URI --key $PRIMARY_KEY --db-name 'FinancialClubDatabase' --collection-name 'MemberCollection' --throughput 400
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to display the value of the PRIMARY_KEY variable:

    ```sh
    echo $PRIMARY_KEY
    ```

1. At the **Cloud Shell** command prompt, type in the following command and press **Enter** to display the value of the URI variable:

    ```sh
    echo $URI
    ```

    > **Note**: Take a note of these values - you will need them in the third exercise of this lab.

#### Task 3: Create and query documents in Cosmos DB

1. On the left side of the Azure Cosmos DB account blade, click **Data Explorer**.

1. In the **Data Explorer** pane, click the **MemberCollection** child node of the **FinancialClubDatabase** node.

1. Click the **New SQL Query** button at the top of the **Data Explorer** pane.

1. In the **Query 1** tab that opened, view the default query:

    ```sql
    SELECT * FROM c
    ```

1. Click the **Execute Query** button at the top of the query editor.

1. In the left pane of the Data Explorer, expand the **MemberCollection** node.

1. Click the **Items** child node within the **MemberCollection** node.

1. In the new **Items** tab that opened, click the **New Item** button at the top of the tab.

1. In the **Items** tab, replace the existing document with the following document:

    ```json
    {
        "firstName": "Pennington",
        "lastName": "Oneal",
        "age": 26,
        "salary": 90000.00,
        "company": "Veraq",
        "isVested": false
    }
    ```

1. Click the **Save** button at the top of the **Items** tab.

1. In the **Items** tab, click the **New Item** button at the top of the tab.

1. In the **Items** tab, replace the existing document with the following document:

    ```json
    {
        "firstName": "Suzanne",
        "lastName": "Oneal",
        "company": "Veraq"
    }
    ```

1. Click the **Save** button at the top of the **Items** tab.

1. Switch back to the **Query 1** tab, re-run the default query `SELECT * FROM c` by clicking the **Execute Query** button at the top of the query editor, and review the results.

1. In the query editor, replace the default query with the following query:

    ```sql
    SELECT
        c.id,
        c.firstName,
        c.lastName,
        c.isVested,
        c.company
    FROM
        c
    WHERE
        IS_DEFINED(c.isVested)
    ```

1. Click the **Execute Query** button at the top of the query editor and review the results.

1. In the query editor, replace the existing query with the following query:

    ```sql
    SELECT
        c.id,
        c.firstName,
        c.lastName,
        c.age
    FROM
        c
    WHERE
        c.age > 20
    ```

1. Click the **Execute Query** button at the top of the query editor and review the results.

1. In the query editor, replace the existing query with the following query:

    ```sql
    SELECT VALUE
        c.id
    FROM
        c
    ```

1. Click the **Execute Query** button at the top of the query editor and review the results.

1. In the query editor, replace the existing query with the following query:

    ```sql
    SELECT VALUE {
        "badgeNumber": SUBSTRING(c.id, 0, 8),
        "company": c.company,
        "fullName": CONCAT(c.firstName, " ", c.lastName)
    } FROM c
    ```

1. Click the **Execute Query** button at the top of the query editor and review the results.

> **Review**: In this exercise, you created a new Cosmos DB account, database, and collection, added sample items to the collection, and run sample queries targeting these items.

## Exercise 2: Deploy Application using Cosmos DB

#### Task 1: Deploy API App code using Azure Resource Manager templates and GitHub

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Template Deployment** and press **Enter**.

1. On the **Everything** blade, in the search results, click **Template Deployment**.

1. On the **Template deployment** blade, click the **Create** button.

1. On the **Custom deployment** blade, click the **Build your own template in the editor** link.

1. On the **Edit template** blade, click the **Load file** link.

1. In the **Open** file dialog that appears, navigate to the **\\allfiles\\AZ-301T02\\Module_02\\LabFiles\\Starter\\** folder.

1. Select the **api.json** file.

1. Click the **Open** button.

1. Back on the **Edit template** blade, click the **Save** button to persist the template.

1. Back on the **Custom deployment** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, select the **Use existing** option and then, in the drop-down list, select **AADesignLab0701-RG**.

    - In the **Terms and Conditions** section, click the **I agree to the terms and conditions stated above** checkbox.

    - Click the **Purchase** button.

1. Wait for the deployment to complete before you proceed to the next task.

    > **Note**: Deployment from source control can take up to 10 minutes.

#### Task 2: Validate API App

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click **AADesignLab0701-RG**.

1. On the **AADesignLab0701-RG** blade, click the entry representing the newly created App Service API app.

1. On the API app blade, under **Settings**, click **Configuration**.

1. On the Application Settings blade, scroll down to the **Application settings** section and perform the following tasks:

    - Set the value of the **CosmosDB:AuthorizationKey** setting to the value of the **PRIMARY KEY** setting of the **Cosmos DB** account you created earlier in this lab.

    - Update the value of the **CosmosDB:EndpointUrl** setting to the value of the **URI** setting of the **Cosmos DB** instance you created earlier in this lab.

    - Click the **Save** button at the top of the pane.

1. On the left-side of the API app blade, click **Overview**.

1. Click the **Restart** button at the top of the blade and, when prompted to confirm, click **Yes**.

1. Click the **Browse** button at the top of the blade. This will open a new browser tab displaying the **Swagger UI** homepage.

    > **Note**: If you click the **Browse** button before the API app has fully restarted, you may not be able to follow the remaining steps in this task. If this happens, refresh your browser until the API app is running again.

1. On the **Swagger UI** homepage, click **GET/Documents**.

1. Click the **Try it out!** button.

1. Review the results of the request.

1. Back on the **Swagger UI** homepage, click **POST/Populate**.

1. In the **Parameters** section, in the **Value** field for the **options** parameter, paste in the following JSON content:

    ```json
    {
        "quantity": 50
    }
    ```

1. In the **Response Messages** section, click the **Try it out!** button.

1. Review the results of the request.

1. Back on the **Swagger UI** homepage, click **GET/Documents**.

1. Locate the **Response Messages** section. Click the **Try it out!** button.

1. Review the results of the request.

1. Close the new browser tab and return to the browser tab displaying the Azure portal.

> **Review**: In this exercise, you created a new API App that uses the .NET Core DocumentDB SDK to connect to Azure Cosmos DB collection and manage its documents.


## Exercise 3: Connect Cosmos DB to Azure Search

#### Task 1: Create Azure Cognitive Search Instance

1. In the upper left corner of the Azure portal, click **Create a resource**.

1. At the top of the **New** blade, in the **Search the Marketplace** text box, type **Search** and press **Enter**.

1. On the **Showing All Results** blade, in the search results, click **Azure Cognitive Search**.

1. On the **Azure Cognitive Search** blade, click the **Create** button.

1. On the **New Search Service** blade, perform the following tasks:

    - Leave the **Subscription** drop-down list entry set to its default value.

    - In the **Resource group** section, select the **Use existing** option and then, in the drop-down list, select **AADesignLab0701-RG**.

    - In the **URL** text box, enter a globally unique name. Record its value. You will use it later in this lab.

    - In the **Location** drop-down list, select the Azure region matching or near the location where you deployed Cosmos DB resource earlier in this labb

    - Click **Change Pricing Tier**.

    - On the **Select Pricing Tier** blade, click **Free** and then click the **Select** button.

    - Click the **Review + Create** button, review the settings then click **Create**.

1. Wait for the provisioning to complete before you proceed to the next step.

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click **AADesignLab0701-RG**.

1. On the **AADesignLab0701-RG** blade, click the entry representing the newly created Azure Search instance.

1. On the Search service blade, click **Keys**.

1. In the **Keys** pane, record the value of **QUERY KEY**. You will use it later in this lab.
    > **Note:** The query key is located below the primary and secondary keys, and does not have a name by default.

#### Task 2: Index Cosmos DB Data in Azure Search

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click **AADesignLab0701-RG**.

1. On the **AADesignLab0701-RG** blade, click the entry representing the Azure Search instance you created earlier in this lab.

1. On the **Overview** blade of Azure Search service, click **Import data** and then click **Next: Connect to your data**.

1. On the **Connect to your data** tab, perform the following tasks:

    - In the **Data Source** drop down list, select **Cosmos DB**.

    - In the **Name** text box, type **cosmosdata**.

    - In the **Cosmos DB account** text box, type the Cosmos DB account connection string you identfied earlier in this lab.

    - In the **Database** drop-down list, select the **FinancialClubDatabase** entry.

    - in the **Collection** drop-down list, select the **MemberCollection** entry.

    - In the **Query** field, enter the following SQL query:

        ```sql
        SELECT
            c.id,
            c.firstName,
            c.lastName,
            c.age,
            c.salary,
            c.company,
            c.isVested,
            c._ts
        FROM
            c
        WHERE
            c._ts >= @HighWaterMark
        ORDER BY c._ts
        ```

    - Ensure that the **Query results ordered by _ts** checkbox is selected.

    - Click the **Next: Add cognitive search (optional)** button.

1. On the **Cognitive Search** blade, click the **Skip to: Customize target index** button.

1. On the **Index** blade, perform the following tasks:

    - In the **Index name** text box, type **memberindex**.

    - In the **Key** drop-down list, ensure that the **id** entry is selected.

    - For the **id** field in the table, ensure that the **RETRIEVABLE**, **FILTERABLE**, and **SORTABLE** checkboxes are selected.

    - For the **firstName** field in the table, ensure that the **RETRIEVABLE**, **SORTABLE**, and **SEARCHABLE** options are selected.

    - For the **lastName** field in the table, ensure that the **RETRIEVABLE**, **SORTABLE**, and **SEARCHABLE** checkboxes are selected.

    - For the **age** field in the table, ensure that the **RETRIEVABLE**, **FILTERABLE**, **SORTABLE**, and **FACETABLE** checkboxes are selected.

    - For the **salary** field in the table, ensure that the **RETRIEVABLE**, **FILTERABLE**, **SORTABLE**, and **FACETABLE** checkboxes are selected.

    - For the **company** field in the table, ensure that the **RETRIEVABLE**, **FACETABLE**, and **SEARCHABLE** checkboxes are selected.

    - For the **isVested** field in the table, ensure that the **RETRIEVABLE**, **FILTERABLE**, **SORTABLE**, **FACETABLE** checkboxes are selected.

    - Click the **Next: Create an indexer** button.

1. On the **Create an Indexer** blade, perform the following tasks:

    - In the **Name** text box, type **cosmosmemberindexer**.

    - In the **Schedule** section, select the **Custom** option.

    - In the **Interval (minutes)** text box, type **5**.

    - In the **Start time (UTC)** field, specify the current date and accept the default value of the time entry.

    - Ensure that the **Track deletions** checkbox is clear and click the **Submit** button.

#### Task 3: Validate API App

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click **AADesignLab0701-RG**.

1. On the **AADesignLab0701-RG** blade, click the entry representing the App Service API app you created earlier in this lab.

1. On the API app blade, click **Configuration**.

1. On the Application settings blade, scroll down to the **Application settings** section and perform the following tasks:

    - Set the value of the **Search:AccountName** setting to the name of the Azure Search instance you created earlier in this lab.

    - Set the value of the **Search:QueryKey** setting to the value of the **QUERY KEY** of the Azure Search instance you created earlier in this lab.

    - Set the value of the **Search:IndexId** setting to the value **memberindex**.

    - Click the **Save** button at the top of the blade.

1. On the API app blade, click **Overview**.

1. Click the **Restart** button at the top of the blade and, when prompted to confirm, click **Yes**.

1. Click the **Browse** button at the top of the blade. This will open a new browser tab displaying the **Swagger UI** homepage.

    > **Note**: If you click the **Browse** button before the API app has fully restarted, you may not be able to follow the remaining steps in this task. If this happens, refresh your browser until the API app is running again.

1. On the **Swagger UI** homepage, click **Cosmos DB API v.1.0.0** at the top of the page and select the **Cosmos DB API v.2.0.0** option from the drop-down list.

1. Click **GET/Documents/search**.

1. In the **Parameters** section, in the **Value** text box of the **query** parameter, type the following text:

    ```
    Oneal
    ```

1. In the **Response Messages** section, click the **Try it out!** button.

1. Review the results of the request.

1. In the **Parameters** section, in the **Value** text box of the **query** parameter, type the following text:

    ```
    penn*
    ```

1. In the **Response Messages** section, click the **Try it out!** button.

1. Review the results of the request.

1. Close the new browser tab and return to the browser tab displaying the Azure portal.

> **Review**: In this exercise, you created an Azure Search instance that uses an indexer to index the documents in Azure Cosmos DB.

## Exercise 4: Remove lab resources

#### Task 1: Delete the resource group

1. In the hub menu in the Azure portal, click **Resource groups**.

1. On the **Resource groups** blade, click **AADesignLab0701-RG**.

1. On the **AADesignLab0701-RG** blade, click **Delete resource group**.

1. In the **Are you sure you want to delete "AADesignLab0701-RG"?** pane, in the **TYPE THE RESOURCE GROUP NAME** text box, type **AADesignLab0701-RG** and click **Delete**.


> **Review**: In this exercise, you removed the resources used in this lab.
