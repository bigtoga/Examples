# Background

# Details

The "type of agent pool" matters: 
1. It can allow you to dynamically create VMs if there are jobs in pool queue. When queue is empty all created machines are deleted. 

When you create VMSS, you can specify startup script that applies to each VM at startup. We use simple PowerShell script as we need to preinstall only simple dependencies but it could anything

# Steps to configure

### Azure:
1. Create and configure your VM
2. Deprovision and generalize the VM
3. Create a new custom VM image
4. Deploy a scale set that uses the image

### Azure DevOps:
1. Create a deployment group
2. Choose the "type of target" (Windows or Linux)
3. Windows => copy the auto-created Powershell script

