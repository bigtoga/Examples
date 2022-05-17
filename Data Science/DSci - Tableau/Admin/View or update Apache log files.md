## Documentation
- [Where are log files located?](https://help.tableau.com/current/server/en-us/logs_loc.htm)
- [Working with log files (low quality)](https://help.tableau.com/current/server/en-us/logs_working_with.htm)

# How to query / view Tableau log files

You can look by hand or you can use:
1. [Tableau Log Viewer](https://github.com/tableau/tableau-log-viewer) - good for reviewing individual log files
2. [Tableau LogShark](https://github.com/tableau/Logshark/releases) - can use all log files at once to give you full picture

Most logs are written to `...\Tableau Server\data\tabsvc\logs\`

# Viewing client-facing logs

**Access logs** represent 'clients hitting Tableau' and are the Apache web server logs: `...\Tableau Server\data\tabsvc\logs\httpd\`. Example:

```
my-server-name 172.10.10.10 - 2022-06-23T00:10:41.806 "-0000" 80 "HEAD /favicon.ico HTTP/1.1" "-" 200 - "-" 1000 YmNerfe8_tMrJvNfEXJ5QAAAgc - - - - "-"
```
    - Host
    - Server IP
    - Username / login (or "-" if using Trusted Ticket)
    - Timestamp 
    - UTC offset ("-0000" for UTC time)
    - Port
    - Combination of Method, Uri, HTTP version
    - X-Forwarded-For IP ("-" if missing)
    - HTTP status
    - ???
    - ???
    - Content length in bytes
    - Unique_ID
    - ???
    - ???
    - ???
    - ???

**VizPortal logs** use the standard Common Log Format and are at `...\Tableau Server\data\tabsvc\logs\vizportal\`:
    - Host
    - IP address
    - RFC 1413 Identity 
    - User ID 
    - Timestamp
    - Request 
    - Status
    - Object size in bytes
    - Content-Length
    - Response time
    - Unique_ID - a 24-digit alphumeric unique string 

## Relationship between Apache's 'Access logs' and VizPortal logs

The `Unique_ID` field is a lookup - you can see initial requests coming in via the Access logs, then look up in the VizPortal logs using the `Unique_ID` to see more details
