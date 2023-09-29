ASE's console is a **very** limited debugger of sorts that can help you identify:
- DNS issues
- Virtual Network integration issues

# How to Access

In the ASE's App page, scroll to the `Console` blade and click

Note: this is NOT Kudu. Azure's Kudu implementation is part of the SCM site and is based on Powershell

# Commands

## Files / Directories

- `dir` and `ls`

## DNS

- `nslookup myresource.mydomain.com` # uses the Azure magic IP address only
- `nslookup myresource.mydomain.com 8.8.8.8`
- `nslookup myresource.mydomain.com 172.29.1.4` # uses a specific private DNS server

To view the current DNS servers that the vnet / app is using: `set WEBSITE_DNS_SERVER_FROM_VNET`

## Ping
- `tcpping 172.29.2.4`

# Update from 2022-07

That's really all I've been able to find as of 2022-07. Everything else fails with "Failed to execute the command" error

It appears that the ASE Console runs inside a custom Windows container. That's why things like `nameresolver.exe` and `tcpping` do not work ([source](https://docs.microsoft.com/en-us/azure/app-service/overview-vnet-integration#troubleshooting))

# Update for 2023-09

Still not a lot out there. I even see `nslookup` failing with "Failed to execute the command" error sometimes

