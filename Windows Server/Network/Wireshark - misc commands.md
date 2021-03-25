Wireshark has **capture filters** and **display filters**

# Display filters

- Filter for source IP: `ip.src == 192.168.1.199`
- Filter for any IP: `ip.addr == 192.168.1.199` 
- Filter for destination IP: `ip.dst == 192.168.1.199`
- Query for `http` traffic 
- Specific TCP port: `tcp.port == 80`

## More complex Display Filters
* OR filter: `(ip.src == 192.168.1.199) || (ip.dst == 192.168.1.1)`
* AND filter: `(ip.src == 192.168.1.199) && (ip.dst == 192.168.1.1)`
