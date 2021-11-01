Function TestTCPPort { 
    Param(
        $address
        , $port 
        , $timeout = 1000
    )

    $socket=New-Object System.Net.Sockets.TcpClient
    try {
        $result = $socket.BeginConnect($address, $port, $NULL, $NULL)

        if (!$result.AsyncWaitHandle.WaitOne($timeout, $False)) {
            Write-Host "Unable to connect to $address on port $port" -ForegroundColor Red
        }
        else{
            Write-Host "Successfully connected to $address on port $port" -ForegroundColor Green
        }
        $socket.EndConnect($result) | Out-Null
        # $socket.Connected
    }
    catch{}
    finally {
        $socket.Close()
    }
}

TestTCPPort -address 172.21.7.4 -port 22
