# Command prompt: 
#        systeminfo|find "Time:"


$wmi = gwmi win32_operatingsystem
$wmi.ConvertToDateTime($wmi.LastBootUpTime)


gwmi win32_operatingsystem | %{ $_.ConvertToDateTime($_.LastBootUpTime) }
