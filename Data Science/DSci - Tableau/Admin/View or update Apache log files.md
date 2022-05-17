## Documentation
- [Where are log files located?](https://help.tableau.com/current/server/en-us/logs_loc.htm)
- [Working with log files (low quality)](https://help.tableau.com/current/server/en-us/logs_working_with.htm)

Note: [Tableau LogShark](https://github.com/tableau/Logshark/releases) can help you read logs 

Most logs are written to `...\Tableau Server\data\tabsvc\logs\`

# Viewing client-facing logs

**Access logs** represent 'clients hitting Tableau' and are the Apache web server logs: `...\Tableau Server\data\tabsvc\logs\httpd\`. Example:

```
my-server-name 172.10.10.10 - 2022-06-23T00:10:41.806 "-0000" 80 "HEAD /favicon.ico HTTP/1.1" "-" 200 - "-" 1000 YmNerfe8_tMrJvNfEXJ5QAAAgc - - - - "-"
```

**VizPortal logs** use the standard Common Log Format:
    - Host
    - IP address
    - RFC 1413 Identity and/or - User ID (or "-" if trusted ticket)
    - Timestamp
    - Request (which is really Method Uri HTTP_Version in one string)
    - Status
    - Object size in bytes
    - Content-Length
    - Response time
    - Unique_ID


There are multiple log files.

The Apache log configuration is in the httpd.conf file which is located at `.../data/tabsvc/config/gateway_{some internal version number{/httpd.conf`.

## Querying Logs

Show all log events containing a 404 error: `where(/HTTP\/1\.1″ “-” (?P\d{3})/ status=404)`

Count how many users are appending “.csv” to specified views: `where((/.csv/i OR /.csv/i OR /.csv/i)) calculate(count)`

Distribute the count of all downloads over 100 data points within a given period of time: `where(/download/i) calculate(count) timeslice(100)`




 
