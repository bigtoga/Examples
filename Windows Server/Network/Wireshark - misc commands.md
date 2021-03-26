Wireshark has **capture filters** and **display filters**
- Capture filters remove traffic so that the trace is small
     - Same syntax as things like `tcpDump`, `WinDump` and any using libcap/WinPCap
     - https://wiki.wireshark.org/CaptureFilters
- Display filters filter the traced traffic
     - Different syntax
     - https://wiki.wireshark.org/DisplayFilters 

# Capture Filter Syntax

Examples below from https://wiki.wireshark.org/CaptureFilters

Any traffic to/from: 
- `host 172.18.5.4`
- `net 192.168.0.0/24` or `net 192.168.0.0 mask 255.255.255.0`
- `port 53`
- `port not 53 and not arp`
- `(tcp[0:2] > 1500 and tcp[0:2] < 1550) or (tcp[2:2] > 1500 and tcp[2:2] < 1550)`

Any traffic from: - `src net 192.168.0.0/24`

Any traffic to: `dst net 192.168.0.0/24`

# Display filters

Examples below from https://wiki.wireshark.org/DisplayFilters

- Filter for source IP: `ip.src == 192.168.1.199`
- Filter for any IP: `ip.addr == 192.168.1.199` 
- Filter for destination IP: `ip.dst == 192.168.1.199`
- Query for `http` traffic 
- Specific TCP port: `tcp.port == 80`
- ` tcp.port eq 25 or icmp`

## More complex Display Filters
* OR filter: `(ip.src == 192.168.1.199) || (ip.dst == 192.168.1.1)`
* AND filter: `(ip.src == 192.168.1.199) && (ip.dst == 192.168.1.1)`
- Filter out noise - only look at Windows Client -> DC: ` smb || nbns || dcerpc || nbss || dns`
-`  http.request.uri matches "gl=se$"`
