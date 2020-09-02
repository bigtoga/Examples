<#
  Get-InstalledPrograms code snippet is from https://blogs.technet.microsoft.com/heyscriptingguy/2011/11/13/use-powershell-to-quickly-find-installed-software/ 

  Returns an array
#>
Function Get-InstalledPrograms()
{
    $UninstallKey="SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall" 

    #Create an instance of the Registry Object and open the HKLM base key
    $reg=[microsoft.win32.registrykey]::OpenRemoteBaseKey('LocalMachine', $env:COMPUTERNAME) 

    #Drill down into the Uninstall key using the OpenSubKey Method
    $regkey=$reg.OpenSubKey($UninstallKey) 

    #Retrieve an array of string that contain all the subkey names
    $subkeys=$regkey.GetSubKeyNames()

    #Open each Subkey and use GetValue Method to return the required values for each
    $array = @()
        
    foreach ($key in $subkeys)
    {
        $thisKey = $UninstallKey+"\\"+$key 
        $thisSubKey=$reg.OpenSubKey($thisKey) 

        if($thisSubKey.GetValue("DisplayName") -ne ""){
            $obj = New-Object PSObject
            $obj | Add-Member -MemberType NoteProperty -Name "ComputerName" -Value $env:COMPUTERNAME
            $obj | Add-Member -MemberType NoteProperty -Name "DisplayName" -Value $($thisSubKey.GetValue("DisplayName"))
            $obj | Add-Member -MemberType NoteProperty -Name "Installed" -Value $($thisSubKey.GetValue("InstallDate"))
            $obj | Add-Member -MemberType NoteProperty -Name "DisplayVersion" -Value $($thisSubKey.GetValue("DisplayVersion"))
            $obj | Add-Member -MemberType NoteProperty -Name "InstallLocation" -Value $($thisSubKey.GetValue("InstallLocation"))
            $obj | Add-Member -MemberType NoteProperty -Name "Publisher" -Value $($thisSubKey.GetValue("Publisher"))
            $array += $obj
        }
    } 
    return $array
   
}

$sw = Get-InstalledPrograms

$sw | Sort -Property DisplayName | ft -AutoSize
