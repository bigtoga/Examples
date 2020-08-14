https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview

Functions:
- C#, Java, JavaScript, Python, and PowerShell
- Support NuGet and NPM
- Include OAuth providers such as Azure Active Directory, Facebook, Google, Twitter, and Microsoft Account
- Stateless (default) or stateful (a.k.a. [durable functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp))
- An instance of the host is the entire function app, meaning all functions within a function app share resource within an instance and scale at the same time.

# Use Cases
- HTTP: Run code based on HTTP requests
- Timer: Schedule code to run at predefined times
- Azure Cosmos DB: Process new and modified Azure Cosmos DB documents
- Blob storage: Process new and modified Azure Storage blobs
- Queue storage: Respond to Azure Storage queue messages
- Event Grid: Respond to Azure Event Grid events via subscriptions and filters
- Event Hub: Respond to high- volumes of Azure Event Hub events
- Service Bus Queue: Connect to other Azure or on- premises services by responding Service Bus queue messages
- Service Bus Topic: Connect other Azure services or on- premises services by responding to Service Bus topic messages

# Hosting Plans / Pricing
The hosting plan you choose dictates the following behaviors:
- How your function app is scaled.
- The resources available to each function app instance.
- Support for advanced features, such as Azure Virtual Network connectivity

- **Consumption plans**: Azure provides all of the necessary computational resources. You don't have to worry about resource management, and only pay for the time that your code runs.
- Auto-scales
- Auto-scale back
- host are dynamically added and removed based on the number of incoming events. This serverless plan scales automatically, and you're charged for compute resources only when your functions are running. On a Consumption plan, a function execution times out after a configurable period of time.
- Billing is based on number of executions, execution time, and memory used
- Default hosting plan
- Function apps in the same region can be assigned to the same Consumption plan.
- Executions time out after 10 minutes
- Each instance is Limited to 1.5 GB of memory and one CPU

**Premium plans**: You specify a number of pre-warmed instances that are always online and ready to immediately respond. When your function runs, Azure provides any additional computational resources that are needed. You pay for the pre-warmed instances running continuously and any additional instances you use as Azure scales your app in and out.
- Same as consumption but more
- Perpetually warm instances to avoid any cold start
- VNet connectivity
- Unlimited execution duration 
- Premium instance sizes (one core, two core, and four core instances)
- More predictable pricing
- High-density app allocation for plans with multiple function apps
- billing for the Premium plan is based on the number of core seconds and memory used across needed and pre-warmed instances.
- At least one instance must be warm at all times per plan. This means that there's a minimum monthly cost per active plan, regardless of the number of executions.

**(Dedicated) App Service plans**: Run your functions just like your web apps. If you use App Service for your other applications, your functions can run on the same plan at no additional cost.
- Runs on an App Service plan so you get to choose how many/how much
- Always On available - by default, funtions runtime goes idel after a few minutes of inactivity
- Consider an App Service plan in the following situations: You have existing, underutilized VMs that are already running other App Service instances, or You want to provide a custom image on which to run your functions.
- 
