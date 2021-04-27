1. Create resource group, app service plan, and a function app
2. In the function app, go to "Platform Features" -> "Code Deployment" -> "Container settings"
3. You are now in the "Deployment Center" tab. Click on whichever you want - Azure DevOps, Github, etc
	3. Azure Repos and Github - use these when you need to log in to download the source code
	3. External - use these to use a public repo (one that doesn't require login to view the source/repo)
4. Choose the App Service build service (the Kudu engine)
5. Copy/paste your repo, branch and other info
6. 
