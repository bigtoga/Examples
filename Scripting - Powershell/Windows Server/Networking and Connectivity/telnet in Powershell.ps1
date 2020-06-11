# If you do not have telnet, multiple Powershell alternatives
# Useful also for verifying connectivity to Azure PaaS services that do not respond to ICMP ping (like Azure SQL Database)

# Option 1: Use "Echo"
Echo ((new-object Net.Sockets.TcpClient).Client.Connect('my_azure_sql_server_db_url', 1433)) 'success'

# Option 2: Use .NET 
$remote_host = 'my_azure_sql_server_db_url'
$port = 1433

$telnet = new-object Net.Sockets.TcpClient

try{
    $telnet.Client.Connect($remote_host, $port)

    if($telnet.Connected){
        Write-Host "Connected to $remote_host on port $port successfully!" -ForegroundColor Green
        $telnet.Close()
    }
    else{
        Write-Host "Unable to connect to $remote_host on port $port" -ForegroundColor Yellow
    }
}
catch{
    Write-Host "Error!" -ForegroundColor Red
}
finally{
    $telnet.Dispose()
}
