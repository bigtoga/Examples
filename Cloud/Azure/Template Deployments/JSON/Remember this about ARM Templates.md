1. ARM template functions do not work in parameters (nor parameters file)
2. The **Deploy a Custom Template** page in the portal will auto-populate any parameters. If you have dynamic settings, be careful...
     - If you use something like `resourceId()` function as a parameter, then the portal page may mess it up
     - Move it to a variable instead of a parameter
