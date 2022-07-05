ASE's console is a debugger of sorts that can help you identify:
- DNS issues
- Virtual Network integration issues

# How to Access

In the ASE's App page, scroll to the `Console` blade and click

Note: this is NOT Kudu. Azure's Kudu implementation is part of the SCM site and is based on Powershell

# Commands

## General Troubleshooting 

- `help` to list available Kudu commands
- `echo` to list environment or local variables / values
- `set` to set environment or local variables
     - `set PATH` to see paths available to the web app

## Network

- `tcpping 192.168.0.1:1443` (include port after colon)

## DNS

- `nslookup myresource.mydomain.com`

## File System

- `dir` 
- `ren` or `rename`
- `cd` to change directory
- `mkdir` to create a directory
- `rd` to remove a directory


# Networking 

[Network troubleshooting ASE basics](https://docs.microsoft.com/en-us/azure/app-service/overview-vnet-integration#troubleshooting)

- vnet integration requires Basic+ pricing tier
- TCP, UDP
- No mounting drives
- No Windows AD join
- No NetBIOS
