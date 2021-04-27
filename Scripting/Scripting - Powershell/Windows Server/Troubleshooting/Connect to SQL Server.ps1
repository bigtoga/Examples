Clear-Host

# If you are unable to test/verify with ODBC
# Note you might want to use a run as window to log on as a service account to check this

Write-Host ""

$server = "sqlclust\myInstance"
$database = "MyDb"

# Windows authentication:
$conn = New-Object System.Data.SqlClient.SqlConnection
$conn.ConnectionString = "Server=$server;Database=$database; Integrated Security=True;"
$conn.Open()

if($conn.State -eq "Open"){
    Write-Host "Able to connect to $server - $database database using Windows authentication - as $env:USERNAME" -ForegroundColor Green
    $conn.Close()
}
else {
    Write-Host "Unable to connect to $server - $database database using Windows authentication - as $env:USERNAME" -ForegroundColor Yellow
}
