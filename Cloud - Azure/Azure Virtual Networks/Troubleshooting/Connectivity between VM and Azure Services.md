1. Identify the region of the "from" resource (i.e. the VM trying to reach an Azure service)
1. Identify the region of the "to" resource (i.e. the Azure PaaS global/cloud service)
1. Get an IP address for the "to" 
   - Tip: Azure PaaS doesn't respond to ping but you will be able to get DNS to tell you the IP by issing a `ping my_azure_url`
1. Network Watcher 
   - Make sure it is enabled for the regions
   - Click on **IP Flow Verify**
   - Enter the VM info for the "from"
   - Enter the IP of the "to"
   - Enter your port
   - Click Start to test
   
You should see something like:
```shell
Access allowed

Security rule
AllowVnetOutBound
```

If you want to view that security rule, two options:
1. Go to the "from" VM and look at it's network settings
2. Stay in Network Watcher, and go to **Effective security rules**

## Effective security rules
Used to be called "Security group view" - you can pick the "from" VM and it will show all rules in effect for that VM
