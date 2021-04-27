# Redeploy is somewhat of a misnomer
It could be called "Move VM" since that's what you can do with it

https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/redeploy-to-new-node-windows
> When you redeploy a VM, Azure will shut down the VM, move the VM to a new node within the Azure infrastructure (i.e. a different hardware cluster), 
and then power it back on, retaining all your configuration options and associated resources

# Troubleshooting
Use redeploy if:
- You cannot RDP to the box
- Your apps cannot use services on the box
- You get a notication about maintenance affecting your VM and want to minimize downtime

**After you redeploy a VM**:
1. The temporary disk is lost (and all data on it) 
1. If you used a dynamic IP address, a new one will be created and assigned once the VM starts up

