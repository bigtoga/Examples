<#
    3 Steps
    
    1. Get the original password
    2. Save an "secure" copy of it to a file (not quite encoded; more like encoded since anyone with .NET or Powershell can reverse engineer it)
    3. Reference the file in your script

#>

# Step 1
$user_name = "myUserName"
$plaintext_pw = "My p@S5w0rd#"
$encodedFile = "EncodedPassword.txt"

# Step 2
$encoded_pw = $plaintext_pw | ConvertTo-SecureString -AsPlainText -Force
$encoded_pw | ConvertFrom-SecureString | Out-File $encodedFile -Force

# Step 3
$secure_pw = Get-Content $encodedFile | ConvertTo-SecureString
$my_credential = (New-Object PSCredential $user_name, $secure_pw)

# Bonus Step - how to decode it using .NET:
$decoded_password = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($encoded_pw))
$decoded_password
