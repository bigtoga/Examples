ASE's console is a **very** limited debugger of sorts that can help you identify:
- DNS issues
- Virtual Network integration issues

# How to Access

In the ASE's App page, scroll to the `Console` blade and click

Note: this is NOT Kudu. Azure's Kudu implementation is part of the SCM site and is based on Powershell

# Commands

## DNS

- `nslookup myresource.mydomain.com`
- `nslookup myresource.mydomain.com 8.8.8.8`

## File System

- `dir` 
- `ren` or `rename`
- `cd` to change directory
- `mkdir` to create a directory
- `rd` to remove a directory

https://www.thomas-krenn.com/en/wiki/Cmd_commands_under_Windows 

# Networking 

[Network troubleshooting ASE basics](https://docs.microsoft.com/en-us/azure/app-service/overview-vnet-integration#troubleshooting)

- vnet integration requires Basic+ pricing tier
- TCP, UDP
- No mounting drives
- No Windows AD join
- No NetBIOS
