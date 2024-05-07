$IpAddress = (Get-NetIPConfiguration |
  Where-Object {
    $_.IPv4DefaultGateway -ne $null -and 
    $_.NetAdapter.status -ne 'Disconnected'
  }
).IPv4Address.IPAddress
