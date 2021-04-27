Import-Module ServerManager; 

Function Post-Checks { 
  ipconfig /all | ft -AutoSize | Out-String; "list volume","list disk" | diskpart | Out-String;
  
  Get-Service | ft -auto | Out-String; Get-WindowsFeature | where-object {$_.Installed -eq $True}; Get-WmiObject Win32_Share | ft -AutoSize | Out-String } Post-Checks | `
  Out-File C:\Ticket_Number\post-checks.txt
