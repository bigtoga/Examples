More examples - https://michlstechblog.info/blog/windows-show-and-configure-network-settings-using-netsh/

# Interfaces

```shell

# Idx column is the interface to pass to route.add IF
netsh interface ipv4 show interfaces

netsh interface ipv4 show address

route add 0.0.0.0 MASK 255.255.255.255 10.10.11.1 METRIC 11 IF 6

netsh interface ipv4 show config


netsh interface ipv4 show global

# Reset network adapter
netsh winsock reset

# Disable / enable an adapter
netsh int set int name="ethernet" admin=disabled
netsh int set int name="ethernet" admin=enabled

# Is TCP chimney offloading enabled?
netsh int tcp show global

# Show routing table
netsh interface ipv4 show route

# All tcp connections
netsh interface ipv4 show tcpconnections


```

# IIS 
```shell
# Immediately flush the HTTP logs for all sites:
netsh http flush logbuffer

# https://weblogs.asp.net/owscott/flush-http-and-ftp-logs-in-iis
```

# DHCP
```shell
# Dump the DHCP server configuration into a text file
netsh dhcp server dump > dump-filename.txt

# Import onto a new DHCP server 
netsh -f dump-filename.txt
```

# Misc
```shell

# Show list of reserved URLs
netsh http show urlacl

# Flush arp cache
netsh interface ip delete arpcache

# Verify
arp -a 192.168.5.210
```

# Certificates

```shell
# Requires elevated shell. Shows you the certificate thumbprint *but*, if you want to use `netsh http add sslcert`

# Show all SSL certs for all websites
netsh http show sslcert

# Filter to only show the cert binding(s) for one website
netsh http show sslcert ipport=0.0.0.0:443
netsh http show sslcert hostnameport=my.url.com:443
```

# Windows Firewall management

```shell
netsh advfirewall consec /?
netsh advfirewall firewal set rule /?
netsh advfirewall firewall show rule name -all
netsh advfirewall show allprofiles
netsh.exe

# Windows Firewall - enable ICMP 
netsh advfirewall firewall add rule name="ICMP incoming V4 echo request" dir=in action=allow enable=yes protocol=icmpv4:8,any


```
