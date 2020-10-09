Expect 2-3 questions on the exam
- How to rotate keys: manually, REST API, or Azure Automation script
- RBAC usage

## Rotating Keys

https://docs.microsoft.com/en-us/azure/key-vault/secrets/tutorial-rotation-dual#key-rotation-using-azure-automation

1. Create an Azure Automation Account 
2. Get the `client ID` for the connection 
  - Open the new Automation Account
  - Go to **Assets** -> **Connections**
  - Select the `AzureRunAsConnection` service principal
  - Copy the `ApplicationId`
1. 

![x](https://i.imgur.com/tNjGYwr.png)
