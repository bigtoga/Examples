# Documentation

- [New Relic](https://docs.newrelic.com/docs/logs/ui-data/query-syntax-logs#query-attributes)
- [Lucene](https://www.lucenetutorial.com/lucene-query-syntax.html)

# Virtual Machines 
**Find shutdowns, reboots, restarts**

`Channel:System AND (EventID:41 OR EventID:1074 OR EventID:6008) AND hostname:my-server`

## Errors

**Clustering**

`WinEventType:"Error" AND message:"*cluster*"`

**Web Server logs**

`logtype:iis_w3c AND hostname:"*iis*"`
