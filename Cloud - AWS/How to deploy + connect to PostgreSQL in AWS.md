### 1. Create the database
1. Create AWS free account (that comes w 12 months of free services)
2. Create new RDS -> PostgreSQL database. 
    * Make sure to select the option for the Free tier
    * Disable automatic backups and other things that require cost-based storage
    * Write down your instance name
    * Keep up w your Root password

### 2. Allow connectivity
If you want to only be able to connect from your computer:
3. Go to EC2 -> Network & Security -> Security Groups 
4. Click on the security group listed
5. Add an Inbound Rule:
    * Type: PostgreSQL
    * Source: change the drop down to **Anywhere**
    * Click **Save rules** to add the rule
1. Return to the AWS home page, search for **RDS** and click through
1. In the left menu, click <kbd>Databases</kbd>
1. On the Databases page, click on your database
1. In the "Connectivity & security" tab, locate the `Endpoint` and `Port`. Copy the `Endpoint` to the clipboard
1. Test connectivity by opening a new window to https://www.yougetsignal.com/tools/open-ports/
   * Paste in your `Endpoint`
   * Change the port to 5432 (the default PostgreSQL port)
   * Click "Check" - if it fails, you need to return to the Inbound Rule and resolve
1. Once you are able to confirm that port 5432 is open for your `Endpoint`, return to AWS home page
1. Return to your RDS -> database page
1. On your database page, scroll down to <kbd>Security group rules</kbd> tab, and click on the rule of Type **EC2 Security Group - Inbound**
   * This is an alternate way to get the EC2 network security group
1. Click through the security group again 
1. Click <kbd>Edit inbound rules</kbd>
1. Delete the rule you previously created
1. Add a new rule:
   * Type: PostgreSQL
   * Source: drop down and change to **My IP**
   * Click **Save rules**
    
### 3. Connect to your database 
1. Launch pgAdmin in a new tab
2. In pgAdmin, create a new Server
   * Give it a name
   * Go to the <kbd>Connections</kbd> tab
   * Paste in the `Endpoint` from AWS

That's all!
