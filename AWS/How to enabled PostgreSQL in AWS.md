1. Create AWS free account (that comes w 12 months of free services)
2. Create new RDS -> PostgreSQL database. 
    * Make sure to select the option for the Free tier
    * Disable automatic backups and other things that require cost-based storage
    * Write down your instance name
    * Keep up w your Root password

If you want to be able to connect to the database "from the internet", you can follow these steps.
**Note - this is a terrible idea so do NOT do it**
3. Go to EC2 -> Network & Security -> Security Groups 
4. Click on the security group listed
5. Add an Inbound Rule:
    * Type: PostgreSQL
    * Click **Save rules** to add the rule
    
If you want to only be able to connect from your computer (much better!):
3. Go to EC2 -> Network & Security -> Security Groups 
4. Click on the security group listed
5. Add an Inbound Rule:
    * Type: PostgreSQL
    * Source: My IP
    * Click **Save rules** to add the rule
1. Delete the previous "All internet traffic" rule if you created it    
    
