https://docs.microsoft.com/en-us/azure/app-service/webjobs-create

# Misc Notes
- Not available for Linux

# Types of Web Jobs

1. **Continuous**
- Starts immediately when the WebJob is created
- Endless loop keeps it running. If the job does end, you can restart it.
- Runs on all instances that the web app runs on. You can optionally restrict the WebJob to a single instance.
- **Supports remote debugging**

2. **Triggered**
- Starts only when triggered 
- Runs on a single instance that Azure selects for load balancing 
- Does not support remote debugging
