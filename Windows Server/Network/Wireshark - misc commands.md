Wireshark has **capture filters** and **display filters**
- Capture filters remove traffic so that the trace is small
     - Same syntax as things like `tcpDump`, `WinDump` and any using libcap/WinPCap
     - https://wiki.wireshark.org/CaptureFilters
- Display filters filter the traced traffic
     - Different syntax

# Capture Filter Syntax
- `host 172.18.5.4`

# Display filters

- Filter for source IP: `ip.src == 192.168.1.199`
- Filter for any IP: `ip.addr == 192.168.1.199` 
- Filter for destination IP: `ip.dst == 192.168.1.199`
- Query for `http` traffic 
- Specific TCP port: `tcp.port == 80`

## More complex Display Filters
* OR filter: `(ip.src == 192.168.1.199) || (ip.dst == 192.168.1.1)`
* AND filter: `(ip.src == 192.168.1.199) && (ip.dst == 192.168.1.1)`
