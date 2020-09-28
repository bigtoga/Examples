# Use Azure Cloud Shell

$passwordProfile = New-Object -TypeName Microsoft.Open.AzureAD.Model.PasswordProfile
$passwordProfile.Password = 'Pa55w.rd1234'

Connect-AzureAD
$domainName = ((Get-AzureAdTenantDetail).VerifiedDomains)[0].Name

###################################################################################
# Create the new user

New-AzureADUser -DisplayName 'Isabel Garcia' -PasswordProfile $passwordProfile -UserPrincipalName "Isabel@$domainName" -AccountEnabled $true -MailNickName 'Isabel'

Get-AzureADUser 

###################################################################################
# Create the new group

New-AzureADGroup -DisplayName 'Junior Admins' -MailEnabled $false -SecurityEnabled $true -MailNickName JuniorAdmins

Get-AzureADGroup

$user = Get-AzureADUser -Filter "MailNickName eq 'Isabel'"

Add-AzADGroupMember -MemberUserPrincipalName $user.userPrincipalName -TargetGroupDisplayName "Junior Admins" 

Get-AzADGroupMember -GroupDisplayName "Junior Admins"

# Clean up everything
Remove-AzResourceGroup -Name "AZ500LAB01" -Force -AsJob
