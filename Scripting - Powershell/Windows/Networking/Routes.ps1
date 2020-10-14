1. Set internet NIC as NIC #1
2. Delete route for the load balancer from NIC #1
2. Add route for the load balancer to NIC #2

# Get the indexes
Get-NetAdapter | Where {$_.Status -eq "Up"}

# This is the interface determining what gets routed to the internet
Get-NetRoute | Sort-Object -Property RouteMetric, ifMetric | ft -auto | Select -First 3


Get-NetRoute | Sort-Object -Property RouteMetric, ifMetric | ft -auto

Get-NetRoute -InterfaceIndex 4 | Sort-Object -Property RouteMetric, ifMetric | ft -auto

Get-NetRoute -InterfaceIndex 4 | Sort-Object -Property RouteMetric, ifMetric | ft -auto

Get-NetRoute -InterfaceIndex 7 | Sort-Object -Property RouteMetric, ifMetric | ft -auto


# What routes exist for 10.10.10.0/24 that are not on .11?
New-NetRoute -DestinationPrefix "10.10.11.0/24" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 0
New-NetRoute -DestinationPrefix "169.254.169.254/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1
New-NetRoute -DestinationPrefix "168.63.129.16/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1
New-NetRoute -DestinationPrefix "168.63.129.16/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1

Remove-NetRoute -NextHop "192.168.0.1"

Remove-NetRoute -DestinationPrefix "10.10.11.0/24" -InterfaceIndex 7

Find-NetRoute -RemoteIPAddress 168.63.129.16

Find-NetRoute -InterfaceIndex 7 -RemoteIPAddress "209.4.5.5"

Find-NetRoute -RemoteIPAddress "209.4.5.5"


# What routes exist for 10.10.10.0/24 that are not on .11?
New-NetRoute -DestinationPrefix "0.0.0.0/0" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 0
New-NetRoute -DestinationPrefix "169.254.169.254/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1
New-NetRoute -DestinationPrefix "168.63.129.16/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1
New-NetRoute -DestinationPrefix "168.63.129.16/32" -InterfaceIndex 7 -NextHop 10.10.11.1 -RouteMetric 1

Remove-NetRoute -DestinationPrefix "10.10.11.0/24" -InterfaceIndex 7


New-NetRoute -DestinationPrefix "10.10.11.255/32" -InterfaceIndex 7 -NextHop 0.0.0.0 -RouteMetric 256 
New-NetRoute -DestinationPrefix "10.10.11.0/24" -InterfaceIndex 7 -NextHop 0.0.0.0 -RouteMetric 256 
