
<details> 
  <summary>Deploy AKS and allow AAD users to authenticate?</summary>

# Deploy AKS and allow AAD users to authenticate?

1. Create a server application
2. Create a client application
3. Deploy the AKS cluster
4. Create an RBAC binding

https://docs.microsoft.com/en-us/azure/aks/azure-ad-integration-cli

```shell
aksname="myakscluster"

# Step 1: Server app. This is the endpoint for the identity requests
serverApplicationId=$(az ad app create \
    --display-name "${aksname}Server" \
    --identifier-uris "https://${aksname}Server" \
    --query appId -o tsv)

# Update the application group membership claims
az ad app update --id $serverApplicationId --set groupMembershipClaims=All

# Create a service principal for the Azure AD application
az ad sp create --id $serverApplicationId

# Get the service principal secret
serverApplicationSecret=$(az ad sp credential reset \
    --name $serverApplicationId \
    --credential-description "AKSPassword" \
    --query password -o tsv)
```

</details>

<details> 
  <summary>How to ensure the auto-generated service principal is able to auth. to ACR?</summary>
  
  # How to ensure the auto-generated service principal is able to auth. to ACR?

- https://thorsten-hans.com/3-ways-to-integrate-acr-with-aks

### Option 1: Use a Kubernetes Secret

You can create such a Secret either using yaml or using the `kubectl create` command. The secret contains all required information to authenticate against ACR during Pod initialization. Developers have to reference the secret as part of their `PodSpec`

```shell
ACR_NAME=youruniquename.azurecr.io

# assumes ACR Admin Account is enabled

ACR_UNAME=$(az acr credential show -n $ACR_NAME --query="username" -o tsv)
ACR_PASSWD=$(az acr credential show -n $ACR_NAME --query="passwords[0].value" -o tsv)

# Step 1: Create the secret
kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_NAME \
  --docker-username=$ACR_UNAME \
  --docker-password=$ACR_PASSWD \
  --docker-email=ignorethis@email.com
```

PodSpec:
```
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
  - name: sample-pod-container
    image: youruniquename.azurecr.io/sample-container:0.0.1
  imagePullSecrets:
  - name: acr-secret

```

### Option 2: Service Account

A ServiceAccount in Kubernetes can provide custom configuration for pulling images.

```shell
ACR_NAME=youracrname.azurecr.io
ACR_UNAME=$()
ACR_PASSWD=$()

kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_NAME \
  --docker-username=$ACR_UNAME \
  --docker-password=$ACR_PASSWD \
  --docker-email=ignorethis@email.com
```

Reference it in your `ServiceAccountSpec`:
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: SampleAccount
  namespace: default
imagePullSecrets:
- name: acr-secret

`
At this point, developers have to remember setting podspec.serviceAccountName.

However, you can also edit the default ServiceAccount and attach the imagePullSecrets. Having that in place, every Pod in the targeting Namespace can pull images from ACR and will still be executed using the default ServiceAccount.

### Option 3. Azure Active Directory Service Principal

 When using this strategy, integration happens outside of Kubernetes itself. Azure will assign required access policies to the underlying Service Principal (SP) to pull images from the specified instance of Azure Container Registry.

Although this is the easiest strategy (because no modifications inside of Kubernetes are required), any artifact deployed to the cluster can pull images from your ACR instance.

```shell
AKS_NAME=youraksname
ACR_NAME=youracrname
RG_NAME=your_resource_group_name

az aks update -n $AKS_NAME -g $RG_NAME \
   --attach-acr $(az acr show -n $ACR_NAME --query "id" -o tsv)

```
</details>
