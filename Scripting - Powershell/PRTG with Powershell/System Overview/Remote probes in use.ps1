[string] $ConfigurationFilePath = (
    (Get-ItemProperty -Path "hklm:SOFTWARE\Wow6432Node\Paessler\PRTG Network Monitor\Server\Core" -Name "Datapath").DataPath) `
    + "PRTG Configuration.dat"

[xml] $configuration = New-Object -TypeName XML;

$configuration.Load($ConfigurationFilePath)

$Probes = $configuration.SelectNodes("//probenode")

$ProbeList = foreach($Probe in $Probes){
    [pscustomobject]@{
        ID   = $probe.ID
        GID  = $probe.data.probegid.Trim()
        Name = $probe.data.name.Trim()
        IP   = $probe.data.probeip.Trim()
    }
}

$ProbeList
