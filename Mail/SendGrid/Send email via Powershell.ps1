# Multiple options

# Option 2
$Username ="myuser"
$Password = ConvertTo-SecureString "908753uhgkjn8hvi4" -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential $Username, $Password

$SMTPServer = "smtp.sendgrid.net"
$EmailFrom = "me@name.com"
$EmailTo = "you@name.com"
$Subject = "SendGrid test from $env:COMPUTERNAME"
$Body = "SendGrid testing successful"

Send-MailMessage -smtpServer $SMTPServer -Credential $credential -Usessl -Port 587 -from $EmailFrom -to $EmailTo -subject $Subject -Body $Body
