1. Identify the region of the "from" resource (i.e. the VM trying to reach an Azure service)
1. Identify the region of the "to" resource (i.e. the Azure PaaS global/cloud service)
1. Get an IP address for the "to" 
   - Tip: Azure PaaS doesn't respond to ping but you will be able to get DNS to tell you the IP by issing a `ping my_azure_url`
1. Network Watcher 
   - Make sure it is enabled for the regions
   - Click on **IP Flow**
   - Enter the VM info for the "from"
   - Enter the IP of the "to"
   - Enter your port
   - Click Start to test
