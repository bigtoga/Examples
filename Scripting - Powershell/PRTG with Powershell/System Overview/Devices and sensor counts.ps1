[string] $ConfigurationFilePath = (
    (Get-ItemProperty -Path "hklm:SOFTWARE\Wow6432Node\Paessler\PRTG Network Monitor\Server\Core" -Name "Datapath").DataPath) `
    + "PRTG Configuration.dat"

[xml] $configuration = New-Object -TypeName XML;

$configuration.Load($ConfigurationFilePath)

$Devices = ($configuration.SelectNodes("//device"))

$DeviceList = foreach ($Device in $Devices) 
{   
    $Sensors = ($configuration.SelectNodes("//device[@id='$($device.id)']/nodes/sensor").Count); 
 
    [pscustomobject]@{
        ObjectID = $Device.id
        Name     = $Device.data.name.Trim();
        Sensors  = $Sensors
        }

}

$DeviceList | Out-GridView
