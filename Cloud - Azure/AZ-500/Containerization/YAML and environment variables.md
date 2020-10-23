From [the documentation](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-environment-variables):
- To set environment variables in a container, specify them when you create a container instance
- Visible to portal and from "inside" the container by default
- If you need to pass secure values, two options:
        - Option 1: Use `secureValue` instead of `value` in the YAML declaration
        - Option 2: [Mount a secret volume in the container](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-secret) and access from there
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

# YAML example of secure secrets

```yaml
apiVersion: 2019-12-01
location: eastus
name: securetest
properties:
  containers:
  - name: mycontainer
    properties:
      environmentVariables:
        - name: 'NOTSECRET'
          value: 'my-exposed-value'
        - name: 'SECRET'
          secureValue: 'my-secret-value'
      image: nginx
      ports: []
      resources:
        requests:
          cpu: 1.0
          memoryInGB: 1.5
  osType: Linux
  restartPolicy: Always
tags: null
type: Microsoft.ContainerInstance/containerGroups
```
