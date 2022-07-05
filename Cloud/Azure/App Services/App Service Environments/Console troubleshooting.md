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

That's really all I've been able to find as of 2022-07. Everything else fails with "Failed to execute the command" error
