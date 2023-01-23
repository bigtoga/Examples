Get-ADUser -filter {Enabled -eq $True -and PasswordNeverExpires -eq $False} `
    –Properties DisplayName, msDS-UserPasswordExpiryTimeComputed | `
    Select-Object -Property Displayname, @{Name=ExpiryDate;Expression={[datetime]::FromFileTime($_."msDS-UserPasswordExpiryTimeComputed")}} | `
    Sort-Object displayname # | export-csv h:\passwords_list.csv
