For Azure VMs to use AKV, set the **Key Vault Advanced Access Policy**

https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disk-encryption-key-vault

> If you did not enable your key vault for disk encryption, deployment, or template deployment at the time of creation (as demonstrated in the previous step), you must update its advanced access policies.

`az keyvault update --name "<your-unique-keyvault-name>" --resource-group "MyResourceGroup" --enabled-for-disk-encryption "true"`
