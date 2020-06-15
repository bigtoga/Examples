Clear-Host

$username = 'DOMAINNAME\svcMyAccount'
$password = 'you have to put it in here correctly'

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential $username, $securePassword

# Launch Powershell ISE in a new window
Start-Process PowerShell_ISE.exe -Credential $credential
