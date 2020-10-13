# Option 1: Use Powershell
Display all routes: `Get-NetRoute | Format-List -Property *`

# Option 2: Use netstat.exe
Command prompt --> `netstate.exe`

Display all routes: `netstat -rn`

# Option 3: Use route.exe
Command prompt --> `route.exe`

Display all routes - IPv4: `route print -4`

Five columns:
- Network Destination - lists all of the network segments that the router is attached to
- Netmask - provides the subnet mask of the segment. This basically allows the router to determine the address class for the destination network
- Gateway - where should the computer send the request?
- Interface - which NIC from `ipconfig /all` is using this route
- Metric - complex way that Windows/networks use to calculate shortest/best route

Use `netsh interface ipv4 show interfaces` to find the Idx for the "IF" 

Use `netsh interface ipv4 show address' to make sure you have the right one
`route add 0.0.0.0 MASK 0.0.0.0 10.10.11.1 METRIC 11 IF 7`

`route delete 0.0.0.0 MASK 255.255.255.255`

`route delete 0.0.0.0 MASK 0.0.0.0 IF 6`
