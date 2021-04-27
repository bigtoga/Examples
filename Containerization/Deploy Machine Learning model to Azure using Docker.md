Note - this assumes you have already:
1. Built a front end
1. Built API(s) that perform app layer integrations for end users and consumers 
1. Identified data sources
1. Done your EDA
1. Feature engineering 
1. Feature selection
1. Model selection
1. Model training 
1. Model validation

You now want to deploy the model for use by a Production application 

# Step 1: Install Docker Desktop for Windows

# Step 2: Install Kitematic
Kitematic is a friendly GUI for managing containers. You can see which containers are currently running and manage them easily 

# Step 3: Create your dockerfile
Just a recipe - easy peasy:
- dockerfiles have **no file extension**
- dockerfiles are **case sensitive** 

Note below that have an app that runs on port 5000:

```python   
FROM python:3.7

RUN pip install virtualenv
ENV VIRTUAL_ENV=/venv
RUN virtualenv venv -p python3
ENV PATH=“VIRTUAL_ENV/bin:$PATH”

WORKDIR /app
ADD . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 
EXPOSE 5000

# Run the application:
CMD [“python”, “app.py”]
``` 

# Step 4: Create your Azure Container Registry
This will be where your organization deploys containers. Most pegs have multiple including DEV, STG, PROD, etc per application team

To define your ACR, use a globally unique URL that identifies your ACR. Example would be `my.azure_container_registry_url.io/`

Note: we are not deploying anything yet; this step simply creates the namespace and resource that we will deploy the Docker image to in a future step

# Step 5: Build your Docker image
Fairly straightforward - on your laptop, run:

```python   
docker build -t my.azure_container_registry_url.io/docker_image_name:my_tag_I_want_to_apply .
```
You don’t have to use tags but these will make it easier later for other developers to identify which images to use for what need. 

It’s a little weird that we reference the ACR despite not having deployed the image 

# Step 6: Run container locally from your image to verify everything is working 

```python   
docker run -d -p 5000:5000 my.azure_container_registry_url.io/docker_image_name
``` 
For a successful execution, you will get back a processID GUID 

# Step 7: Test your container locally
This is where Kitematic comes into play 
- Launch Kitematic
- Locate your running container (i.e. find the GUID from the previous step)
- Open your browser to `http://localhost:5000` and test
- **Important**: when you have finished testing, stop your container by using Kitematic -> Stop

Congratulations! You are running your app on a local container. 

# Step 8: Authenticate to Azure Container Registry
There are many opportunities to do much more complex deployments than the below - I’m just using the absolute simplest method:
- Log into the Azure Portal
- Browse to the Container Registry for your newly created ACR
- Go to **Access Keys** 
- Enable an admin user, create the user, and provide a password 
- Store this in Azure Key Vault so your apps later can use
- On your local laptop, authenticate to Azure ACR for this URL:
```python   
docker login my.azure_container_registry_url.io
``` 
- Enter the username and password you previously created

# Step 9: Push your container to tHe Azure Container Registry
```python   
docker push my.azure_container_registry_url.io/docker_image_name:my_tag_I_want_to_apply
```

# Step 10: Create a new Web App to run your new container
1. Log onto the Azure Portal
1. Create a new Web App
1. **Basics** tab configuration
   - **Publish**: Docker Container
   - **Operating System**: Linux
1. **Docker** tab configuration 
   - **Options**: Single Container (for now)
   - **Image Source**: Azure Container Registry
   - Enter your container details in the remaining text boxes/drop downs
1. Create your resource

You are now running a Docker container in the cloud

# Additional Resources 
- The above was originally listed amazingly well by Moez Ali in his article on [how to publish PyCaret machine learning models to Azure using containers](https://link.medium.com/r4pC23VX56) article
- Linked repo for the article: https://github.com/pycaret/pycaret-deployment-azure






