Little tricky...

https://docs.microsoft.com/en-us/azure/container-instances/container-instances-environment-variables

From the documentation:
- To set environment variables in a container, specify them when you create a container instance
- 
- 
- 
- 
- 
- 
- 
- 

Examples:

```shell
az container create \
    --resource-group myResourceGroup \
    --name mycontainer1 \
    --image mcr.microsoft.com/azuredocs/aci-wordcount:latest \
    --restart-policy OnFailure \
    --environment-variables 'NumWords'='5' 'MinLength'='8'
    
az container logs --resource-group myResourceGroup --name mycontainer1
```

```powershell
$envVars = @{'NumWords'='5';'MinLength'='8'}
New-AzContainerGroup `
    -ResourceGroupName myResourceGroup `
    -Name mycontainer2 `
    -Image mcr.microsoft.com/azuredocs/aci-wordcount:latest `
    -RestartPolicy OnFailure `
    -EnvironmentVariable $envVars
    
Get-AzContainerInstanceLog -ResourceGroupName myResourceGroup -ContainerGroupName mycontainer2
    

```
