# Create A Linux VM with SSH key stored in a Key Vault - Template Builduing Blocks 2

- Create an SSH key pair [on Linux](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys) or on [Windows](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows)

- Add the RSA public key as a secret in your key vault [using PowerShell](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-get-started#add) or the [Azure CLI](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-manage-with-cli#add-a-key-or-secret-to-the-key-vault)
or using the portal.

- Create your virtual machine parameter file, add the following JSON to retrieve the SSH key from the key vault:

```JSON
    "sshPublicKey": {
        "reference": {
            "keyVault": {
                "id": "/subscriptions/[00000000-0000-0000-0000-000000000000]/resourcegroups/[resource-group-name]/providers/Microsoft.KeyVault/vaults/[kv-name]"
            },
            "secretName": "sshKey"
        }
    }
```

- Replace your subscription ID, resource group name and the key valut name accordingly. Also, it is assuming the name of the secret is "sshKey", if you used a different name also update the value of "secretName".

## More info 
- [Get started with Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/key-vault-get-started)