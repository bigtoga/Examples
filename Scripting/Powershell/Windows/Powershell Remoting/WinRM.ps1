<#
  WinRM is required to be running for Powershell Remoting
#>

# Symptom: You cannot run a remote powershell 
<#
Set-ClusterQuorum : ERROR CODE : 0x80131500; 
NATIVE ERROR CODE : 1.
 WinRM cannot process the request. The following error with errorcode 0x8009030e occurred while using Kerberos authentication: A specified logon session does not exist. It may already have been terminated.  
 
First - make sure you are logged on w a domain account!

#>
Invoke-Command –ComputerName sql1 -ScriptBlock {Hostname}

# 5.0 or above 
$PSVersionTable

Get-Service WinRm
Start-Service WinRm
Stop-Service WinRm
Set-Service WinRM -StartMode Automatic

Enable-PSRemoting

# Shows Windows Firewall changes needed
winrm quickconfig 
winrm help config

<#
https://docs.microsoft.com/en-us/powershell/module/microsoft.wsman.management/test-wsman?view=powershell-7#examples

Basic. Basic is a scheme in which the user name and password are sent in clear text to the server or proxy.
Default. Use the authentication method implemented by the WS-Management protocol
Digest. Digest is a challenge-response scheme that uses a server-specified data string for the challenge
Kerberos. The client computer and the server mutually authenticate by using Kerberos certificates.
Negotiate. Negotiate is a challenge-response scheme that negotiates with the server or proxy to determine the scheme to use for authentication. For example, this parameter value allows for negotiation to determine whether the Kerberos protocol or NTLM is used.
CredSSP. Use Credential Security Support Provider (CredSSP) authentication, which lets the user delegate credentials. This option is designed for commands that run on one remote computer but collect data from or run additional commands on other remote computers.

#>
Test-Connection -WsmanAuthentication Basic -Credential $Credentials -ComputerName sql1.mydomain.com

Test-WSMan -ComputerName sql1

<#
  Trusted hosts only
#>

# What hosts are trusted? 
Get-Item WSMan:\localhost\Client\TrustedHosts

# Trust just one host
Set-Item WSMan:\localhost\Client\TrustedHosts -Concatenate sql2.mydomain.com -Force
Set-Item WSMan:\localhost\Client\TrustedHosts -Value $ip -Force

# Trust all hosts (don't do this - unsafe)
Set-Item WSMan:localhost\client\trustedhosts -value *


$username = “mydomain\Student”
$Credentials = Get-Credential -UserName $username -Message "What is your password?"


# Use an interactive session
Enter-PsSession –ComputerName sql1.mydomain.com -Credential mydomain\Student

Exit-PSSession

# Use a background session
New-PsSession –ComputerName sql1.mydomain.com -Credential mydomain\Student

Exit-PSSession
