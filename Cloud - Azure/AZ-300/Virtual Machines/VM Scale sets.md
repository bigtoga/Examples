# Automate

1. Create a new scale set `az group create --name myResourceGroup --location eastus`
1. Use the **extensionProfile** section for a Resource Manager template

```shell
az group deployment create \
  --resource-group myResourceGroup \
  --template-uri https://raw.githubusercontent.com/Azure-Samples/compute-automation-configurations/master/scale_sets/azuredeploy.json
```  

https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/tutorial-install-apps-template
