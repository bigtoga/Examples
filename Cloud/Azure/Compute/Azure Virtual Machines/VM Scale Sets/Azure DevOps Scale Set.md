# Background

# Details

The "type of agent pool" matters: 
1. It can allow you to dynamically create VMs if there are jobs in pool queue. When queue is empty all created machines are deleted. 

When you create VMSS, you can specify startup script that applies to each VM at startup. We use simple PowerShell script as we need to preinstall only simple dependencies but it could anything



