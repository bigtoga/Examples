The [Azure Bastion FAQ](https://docs.microsoft.com/en-us/azure/bastion/bastion-faq) says there are 3 steps:
1. Grant `Reader` to the particular Bastion
2. Grant `Reader` to the VM
3. `Reader` to the VM's NIC

In theory, you should be able to just do this with 2 steps *as long as* the Bastion is in the same vnet as the VM
1. Grant `Reader` to the particular Bastion to the user
2. Grant `Virtual Machine User Login` RBAC role to the VM to the user

If the Bastion is in a peered vnet, you need:
3. Grant `Reader` to the peered vnet
