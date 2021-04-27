# Add new K8S cluster w 2 nodes, SSH, with monitoring enabled 

```bash
az group create -name rg-Demo -location eastus

az aks create --resource-group rg-Demo --name aks-Cluster1 --node-count 2 --enable-addons monitoring --generate-ssh-keys
```
