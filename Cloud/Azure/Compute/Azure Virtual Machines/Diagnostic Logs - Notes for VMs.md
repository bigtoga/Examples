For all servers, the "Disk quota (MB)" setting for the Azure Diagnostics logs determines how much data **on the VM disk itself** will be used for logging.
- If you have an IIS server and use the default of 5120 (5GB), then IIS logs will be physically deleted from your OS / disk after "all logs on the server that are uploaded via Diagnostics" reach 5GB!!!!
