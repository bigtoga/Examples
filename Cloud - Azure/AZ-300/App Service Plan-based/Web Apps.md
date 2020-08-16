# Plan types
- Free
- Shared
- Basic
- Standard
- Premium
- Isolated
- App Service Linux
- Consumption Plan

https://azure.microsoft.com/en-us/pricing/details/app-service/windows/

### Supports auto scale?
Standard+

### vnet connectivity?
Standard+

### Compute type
Shared - free, shared

Dedicated - Basic+

```bash

# Step 1:
az appservice plan create \
    --name keyvault-exercise-plan \
    --sku FREE \
    --location centralus \
    --resource-group [sandbox resource group name]

# Step 2:
az webapp create \
    --plan keyvault-exercise-plan \
    --resource-group [sandbox resource group name] \
    --name <your-unique-app-name>

# Step 3: Configure the app
az webapp config appsettings set \
    --resource-group [sandbox resource group name] \
    --name <your-unique-app-name> \
    --settings 'VaultName=<your-unique-vault-name>'
    
# Step 4: Enable managed identity
az webapp identity assign \
    --resource-group [sandbox resource group name] \
    --name <your-unique-app-name>
    
# Step 5: Grant access to the vault
az keyvault set-policy \
    --secret-permissions get list \
    --name <your-unique-vault-name> \
    --object-id <your-managed-identity-principleid>
    
# Step 6: Deploy
dotnet publish -o pub
zip -j site.zip pub/*

az webapp deployment source config-zip \
    --src site.zip \
    --resource-group [sandbox resource group name] \
    --name <your-unique-app-name>

```    
