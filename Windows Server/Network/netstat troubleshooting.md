https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat

|Command   | Details  |
|---|---|
|`netstat -n`   | List active TCP connections  |
|`netstat -na \| find "80"` | Find all active connections on port 80  |
|`netstat -o`   | Active TCP connections and process ID  |
|`netstat -P <protocol>`   | Use `tcp`, `tcpv6`  |
|`netstat -b`   | Display the executable (admin req'd)  |
|`netstat -n \| find "80"`   | List action TCP connections with "80" in either the IP address or port  |
|`netstat \| find "172.16.1.24"`   | List any connections to 172.16.1.24  |

Combine for more fun
`netstat -n -b` - List active TCP connections with executable


