# https://github.com/MicrosoftLearning/AZ500-AzureSecurityTechnologies/blob/a1787ac7ce3ba524424fd12fa59b40ec0c331e59/Instructions/Labs/LAB_09_ConfiguringandSecuringACRandAKS.MD

az group create --name AZ500LAB09 --location eastus
az group list --query "[?name=='AZ500LAB09']" -o table

az acr create --resource-group AZ500LAB09 --name az500$RANDOM$RANDOM --sku Basic
az acr list --resource-group AZ500LAB09
ACRNAME=$(az acr list --resource-group AZ500LAB09 --query '[].{Name:name}' --output tsv)

# Create a Dockerfile
echo FROM nginx > Dockerfile

az acr build --image sample/nginx:v1 --registry $ACRNAME --file Dockerfile .

# Connect to the Kubernetes cluster:
az aks get-credentials --resource-group AZ500LAB09 --name MyKubernetesCluster

# list nodes of the Kubenetes cluster
kubectl get nodes

###########################

# grant the AKS cluster permission to access the ACR
ACRNAME=$(az acr list --resource-group AZ500LAB09 --query '[].{Name:name}' --output tsv)

# Grant "pull" role assignment to the ACR
az aks update -n MyKubernetesCluster -g AZ500LAB09 --attach-acr $ACRNAME

###########################

echo $ACRNAME

# Edit the yaml file - this is the external yaml file.
code ./nginxexternal.yaml

# Edit the file then apply the changes
kubectl apply -f nginxexternal.yaml

############################

# Verify the public IP
kubectl get service nginxexternal

