https://docs.microsoft.com/en-us/azure/key-vault/general/backup

From the documentation:
- ack up secrets only if you have a critical business justification. Backing up secrets in your key vault may introduce operational challenges...
- Key Vault doesn't currently provide a way to back up an entire key vault in a single operation
- If you exceed key vault service limits for requests per second, your key vault will be throttled...
- When you back up a key vault object, such as a secret, key, or certificate, the backup operation will download the object as an encrypted blob. This blob can't be decrypted outside of Azure. To get usable data from this blob, you must restore the blob into a key vault within the same Azure subscription and Azure geography.
- Can restore only within another Azure Key Vault in the same subscription *and* the same geography

# How to backup and restore a key vault object

To back up a key vault object, you must have:
- Contributor-level or higher permissions on an Azure subscription
- A "primary" key vault that contains the secrets you want to back up
- A "secondary" key vault where secrets will be restored

- Step 1: Log into the portal and go to the secret you want to backup
- Step 2: Click **Download Backup** to download the encrypted blob
- Step 3: Change to the other Azure Key Vault you want
- Step 4: Keys -> Restore Backup

# Azure CLI
```shell
## Log in to Azure
az login

## Set your subscription
az account set --subscription {AZURE SUBSCRIPTION ID}

## Register Key Vault as a provider
az provider register -n Microsoft.KeyVault

## Back up a certificate in Key Vault
az keyvault certificate backup --file {File Path} --name {Certificate Name} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}

## Back up a key in Key Vault
az keyvault key backup --file {File Path} --name {Key Name} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}

## Back up a secret in Key Vault
az keyvault secret backup --file {File Path} --name {Secret Name} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}

## Restore a certificate in Key Vault
az keyvault certificate restore --file {File Path} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}

## Restore a key in Key Vault
az keyvault key restore --file {File Path} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}

## Restore a secret in Key Vault
az keyvault secret restore --file {File Path} --vault-name {Key Vault Name} --subscription {SUBSCRIPTION ID}
```
