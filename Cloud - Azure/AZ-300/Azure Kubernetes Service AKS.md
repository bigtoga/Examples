Step 1 ```az aks install-cli``` to install **kubectl**

Step 2: Get credentials
```az aks get-credentials —resource-group myResourceGroup —name myAKSCluster   ``` 

Step 3 - get the nodes
```kubectl get nodes   ```

Step 4 - build yaml deployment file

Step 5 - Apply yaml config 
```kubectl apply -f myDeployFile.yaml   ```
