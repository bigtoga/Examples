# AD Ports and Protocols

https://docs.microsoft.com/en-US/troubleshoot/windows-server/networking/service-overview-and-network-port-requirements

```asa
object-group service AD-PORTS
   service-object tcp-udp destination eq domain 
   service-object tcp-udp destination eq 88 
   service-object udp destination eq ntp 
   service-object tcp destination eq 135 
   service-object tcp-udp destination eq 137 
   service-object udp destination eq netbios-dgm 
   service-object tcp destination eq netbios-ssn 
   service-object tcp-udp destination eq 389 
   service-object tcp-udp destination eq 445 
   service-object tcp-udp destination eq 464 
   service-object tcp destination eq ldaps 
   service-object tcp destination eq 3268 
   service-object tcp destination eq 3269 
   service-object tcp destination eq 5722 
   service-object tcp destination eq 9389 
   service-object tcp-udp destination range 49152 65535 
...

access-list FW-INSIDE extended permit object-group AD-PORTS any object-group AD-SERVERS 
 ```
 
**Common ports**
- "domain" - 53 (DNS)
- "ntp" - 123
- "netbios-dgm" - 138
- "netbios-ssn" - 139
- "ldaps" - tcp-udp 389 for `ldap` but tcp 636 for `ldaps`

**Active Directory common ports**
- RPC - tcp 135
- Global Catalog - tcp 3268, 3268
- SMB - tcp 445
 
**TCP Ports** - 53, 88, 123, 135, 137, 139, 445, 636, 3268, 3269, 5722, 9389, range of 49152:65535

**UDP Ports** - 53, 88, 123, 137, 138, 389, 445, 464, range of 49152:65535

# Port Query v2 is your friend

[GUI version](https://www.microsoft.com/en-us/download/details.aspx?id=24009) - [command line version](https://www.microsoft.com/en-us/download/details.aspx?id=17148)

UI version has Active Directory ports

PortQuery shows FILTERED if port is closed otherwise LISTENING or NOT LISTENING

PortQuery - test open ports on your server before you install software

**Remember** that UDP is not going to "answer back" - it's not TCP. UDP port scanning is based on negative scanning i.e. for a sent packet if no response is received, it is assumed that port is open and the server has accepted the packet (No ACK in UDP). 
- If the port is closed, most servers reply with ICMP 'Destination Port Unreachable' packet (implying port is closed)
- However, this inference is largely affected by factors such as ICMP packet drop in firewall or IDS, Or insufficient UDP protocol buffer in the target system. 

# Command line

DCDIAG /TEST:DNS /V /E /F:"C:\DNS Logs\20210216_0140.txt"

NLTEST /DSGETDC:mydomain.com >> "C:\DNS Logs\nltest_mydomain.txt"
NLTEST /DSGETDC:stg.mydomain.com >> "C:\DNS Logs\nltest_stg.txt"

NLTEST /DSGETDC:mydomain.com /GC >> "C:\DNS Logs\nltest_forest.txt"

# Powershell

Easy, fast:

```powershell
$ports = (53, 88, 123, 135, 137, 139, 445, 636, 3268, 3269, 5722, 9389)
$ports | % { Test-NetConnection 192.168.5.242 -port $_ }
```

Little more detailed: 
```powershell
Clear-Host

# Don't check these - they aren't used in Windows 2012 R2+: ports 123, 137, 5722
$ports = (53, 88, 135, 139, 636, 3268, 3269, 9389)

$destination = "192.168.1.1"

Write-Host "From $($env:COMPUTERNAME) to $($destination) - " -ForegroundColor Cyan

$ports | % { 
   $msg = "   - TCP Port $($_): "
   $result = Test-NetConnection $destination -port $_ -InformationLevel Quiet

   if($result){
        $msg += " - success"
        Write-Host $msg -ForegroundColor Green
   }
   else{
        $msg += " - fail"
        Write-Host $msg -ForegroundColor Red
    }
}
```
